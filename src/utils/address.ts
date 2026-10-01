import axios from 'axios';

import { JUSO_API_KEY } from '../constant/env';

/** 행정안전부 도로명주소 검색 API (https://business.juso.go.kr) */
const JUSO_API_URL = 'https://business.juso.go.kr/addrlink/addrLinkApi.do';
const COUNT_PER_PAGE = 20;

export interface AddressResult {
  zipNo: string;
  /** 도로명주소 (참고항목 제외) */
  roadAddrPart1: string;
  /** 참고항목 (법정동, 건물명) */
  roadAddrPart2: string;
  jibunAddr: string;
  bdMgtSn: string;
}

interface JusoResponse {
  results: {
    common: {
      errorCode: string;
      errorMessage: string;
      totalCount: string;
      currentPage: string;
    };
    juso: AddressResult[] | null;
  };
}

export interface AddressSearchPage {
  items: AddressResult[];
  totalCount: number;
  page: number;
  hasMore: boolean;
}

export class AddressSearchError extends Error {}

/** API가 거부하는 특수문자 제거 */
export const sanitizeKeyword = (keyword: string) => keyword.replace(/[%=><[\]]/g, '').trim();

export const searchAddress = async (keyword: string, page = 1): Promise<AddressSearchPage> => {
  if (!JUSO_API_KEY) {
    throw new AddressSearchError('주소 검색 설정이 필요해요. 잠시 후 다시 시도해 주세요');
  }

  // 사전 요청(preflight)을 허용하지 않는 API라 커스텀 헤더 없는 단순 GET으로 호출
  const res = await axios.get<JusoResponse>(JUSO_API_URL, {
    params: {
      confmKey: JUSO_API_KEY,
      currentPage: page,
      countPerPage: COUNT_PER_PAGE,
      keyword,
      resultType: 'json',
    },
  });

  const { common, juso } = res.data.results;
  if (common.errorCode !== '0') {
    throw new AddressSearchError(common.errorMessage);
  }

  const totalCount = Number(common.totalCount);
  return {
    items: juso ?? [],
    totalCount,
    page,
    hasMore: page * COUNT_PER_PAGE < totalCount,
  };
};
