/** 하단 safe area 높이(CSS 값). 토스 앱 값(`--safe-area-bottom`)을 우선 쓰고, 없으면 env()로 대신한다. */
export const SAFE_AREA_BOTTOM = 'var(--safe-area-bottom, env(safe-area-inset-bottom, 0px))';
