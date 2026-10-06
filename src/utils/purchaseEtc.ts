import {
  Category,
  ETC,
  ETC_MODELS,
  ETC_SERIES,
  EtcType,
  SERIES_BEFORE_ETC,
} from '../constant/purchase';

type Selected = {
  category?: string | null;
  subcategory?: string | null;
  model?: string | null;
};

/** 고른 값이 어느 단계의 기타인지 찾는다. 기타가 아니면 null */
export const getEtcType = ({ category, subcategory, model }: Selected): EtcType | null => {
  if (category === ETC) return 'brand';
  if (subcategory && subcategory === ETC_SERIES[category as Category]) return 'series';
  if (subcategory && model && model === ETC_MODELS[subcategory]) return 'model';
  return null;
};

const withoutSpaces = (value: string) => value.replace(/\s/g, '');

/**
 * 목록 맨 끝에 기타 칩을 붙인다. 목록을 못 받았으면 그 단계를 열지 않던 동작을 지키려고
 * 빈 목록에는 붙이지 않는다.
 *
 * 서버 목록에 띄어쓰기만 다른 같은 이름이 있으면 붙이지 않는다. 서버에 '기타갤럭시' 시리즈가
 * 남아 있는 환경이면 그 목록을 그대로 보여 준다.
 */
export const withEtcOption = (options: string[], etc?: string) => {
  if (!etc || options.length === 0) return options;
  if (options.some((option) => withoutSpaces(option) === withoutSpaces(etc))) return options;
  return [...options, etc];
};

/** 기타 칩 바로 앞에 둘 시리즈(SERIES_BEFORE_ETC)를 목록 끝으로 옮긴다. 나머지 순서는 서버 그대로다. */
export const orderSeries = (options: string[], category?: string | null) => {
  const last = (category && SERIES_BEFORE_ETC[category as Category]) || [];
  return [
    ...options.filter((option) => !last.includes(option)),
    ...last.filter((option) => options.includes(option)),
  ];
};
