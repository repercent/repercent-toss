import { useEffect, useState } from 'react';

import { PurchaseItem } from '../type/purchase';
import { purchaseApi } from '../utils/api';
import { floorToThousand, getRandomInRange } from '../utils/price';

export interface CompetitorPrices {
  A: number;
  B: number;
}

export interface PurchaseHero {
  product: PurchaseItem;
  competitorPrices: CompetitorPrices;
}

/** 이 세션에서 시세 비교 카드에 보여 준 기록 */
interface ShownHeroes {
  lastModel: string | null;
  pricesByModel: Record<string, { price: number; competitorPrices: CompetitorPrices }>;
}

const STORAGE_KEY = 'purchase:shownHeroes';
const EMPTY_SHOWN: ShownHeroes = { lastModel: null, pricesByModel: {} };

/** 서버가 20개 안팎의 모델 중 하나를 무작위로 주므로 세 번이면 거의 항상 직전과 다른 모델이 나온다. */
const MAX_FETCH = 3;

/**
 * 값의 주인은 이 모듈의 메모리이고 세션 저장소는 새로고침을 넘기 위한 거울이다
 * (저장소가 막힌 환경에서도 앱 안 뒤로가기는 동작해야 한다).
 */
let shownHeroes: ShownHeroes | null = null;

const restoreShownHeroes = (): ShownHeroes => {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? 'null');
    return saved?.pricesByModel ? saved : EMPTY_SHOWN;
  } catch {
    return EMPTY_SHOWN;
  }
};

const readShownHeroes = (): ShownHeroes => {
  shownHeroes ??= restoreShownHeroes();
  return shownHeroes;
};

const rememberShownHero = ({ product, competitorPrices }: PurchaseHero) => {
  const shown = readShownHeroes();
  shownHeroes = {
    lastModel: product.model,
    pricesByModel: {
      ...shown.pricesByModel,
      [product.model]: { price: product.price, competitorPrices },
    },
  };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(shownHeroes));
  } catch {
    // 저장에 실패해도 메모리에는 남아 있어 앱 안 뒤로가기는 그대로 동작한다.
  }
};

const requestBestProduct = async () => {
  const { data } = await purchaseApi.get<PurchaseItem>('/purchases/product/best');
  return data;
};

/**
 * 직전에 보여 준 모델이 아닌 모델을 받는다. 세 번 모두 직전 모델이면 그 모델을 그대로 쓴다
 * (같은 모델이면 기억해 둔 시세를 쓰므로 숫자는 바뀌지 않는다). 네트워크 오류는 그대로 던진다.
 */
const fetchHeroProduct = async (lastModel: string | null) => {
  let product = await requestBestProduct();
  for (let attempt = 1; attempt < MAX_FETCH && product.model === lastModel; attempt++) {
    product = await requestBestProduct();
  }
  return product;
};

/** A사·B사 중 한 곳을 무작위로 더 낮게 두고, 리퍼센트 가격의 80~95% 사이에서 뽑는다. */
const drawCompetitorPrices = (price: number): CompetitorPrices => {
  const isACompanyLow = Math.random() < 0.5;

  const rangeA = isACompanyLow ? [0.8, 0.9] : [0.85, 0.95];
  const rangeB = isACompanyLow ? [0.85, 0.95] : [0.8, 0.9];

  return {
    A: floorToThousand(price * getRandomInRange(rangeA[0], rangeA[1])),
    B: floorToThousand(price * getRandomInRange(rangeB[0], rangeB[1])),
  };
};

/** 리퍼센트 가격과 A사·B사 중 낮은 쪽의 차이 */
export const getPriceDiff = ({ product, competitorPrices }: PurchaseHero) =>
  Math.max(product.price - Math.min(competitorPrices.A, competitorPrices.B), 0);

/**
 * usePurchaseHero
 *
 * @description
 * 서비스 알아보기 첫 블록의 시세 비교 카드에 보여 줄 모델과 경쟁사 시세를 정한다.
 * repercent-client 판매하기 화면(usePurchaseHero)과 같은 규칙이다.
 * - 화면에 붙을 때마다 모델을 새로 받되, 직전에 보여 준 모델은 뺀다.
 * - 한 번 보여 준 모델은 다시 나와도 같은 경쟁사 시세를 쓴다 (뒤로가기 때 숫자만 바뀌면 조작처럼 보인다).
 *
 * 모델을 받기 전에는 hero가 null이고, 받지 못하면 hasFailed가 true가 된다.
 */
const usePurchaseHero = () => {
  const [hero, setHero] = useState<PurchaseHero | null>(null);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    let ignore = false;
    const shown = readShownHeroes();

    fetchHeroProduct(shown.lastModel)
      .then((product) => {
        if (ignore) return;

        const remembered = shown.pricesByModel[product.model];
        const next = {
          product,
          competitorPrices:
            remembered?.price === product.price
              ? remembered.competitorPrices
              : drawCompetitorPrices(product.price),
        };

        rememberShownHero(next);
        setHero(next);
      })
      .catch(() => {
        if (!ignore) setHasFailed(true);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { hero, hasFailed };
};

export default usePurchaseHero;
