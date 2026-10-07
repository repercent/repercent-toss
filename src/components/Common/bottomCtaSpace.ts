/** 하단 CTA 높이(그라데이션 36 + 버튼 56 + 아래 여백 20 + 위 여유 20). 홈 인디케이터 영역은 따로 더한다. */
const BOTTOM_CTA_SPACE = 132;

/**
 * 하단 CTA에 가려지지 않도록 본문 끝에 두는 여백(CSS 값).
 * CTA는 아래 여백에 safe-area-inset-bottom을 더하므로, 본문 여백에도 같은 만큼 더해야 아이폰에서 마지막 내용이 가려지지 않는다.
 * @param extra 버튼 위 영역(동의 체크박스 등)처럼 추가로 띄울 높이(px)
 */
export const bottomCtaSpace = (extra = 0) =>
  `calc(${BOTTOM_CTA_SPACE + extra}px + env(safe-area-inset-bottom))`;
