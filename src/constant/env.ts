/** 상품 이미지 CDN (.env 미설정 시 운영 CDN 사용) */
export const IMAGE_URL: string = import.meta.env.VITE_IMAGE_URL ?? 'https://image.21market.kr';

/** 행정안전부 도로명주소 검색 API 승인키 (business.juso.go.kr에서 발급) */
export const JUSO_API_KEY: string = import.meta.env.VITE_JUSO_API_KEY ?? '';

/** 고객센터(채널톡) */
export const CS_URL = 'https://repercent.channel.io/';

/** CJ대한통운 배송조회 */
export const getTrackingUrl = (trackingNumber: string) =>
  `https://trace.cjlogistics.com/next/tracking.html?wblNo=${trackingNumber}`;
