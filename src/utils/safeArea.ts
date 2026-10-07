import { SafeArea } from '@apps-in-toss/web-framework';

/**
 * 토스 앱이 알려 주는 하단 safe area(아이폰 홈 인디케이터, 안드로이드 내비게이션 바)를 CSS 변수
 * `--safe-area-bottom`으로 둔다. CSS `env(safe-area-inset-bottom)`은 viewport-fit=cover가 없으면 0이고
 * 안드로이드에서도 0인 경우가 많아 기기마다 하단 버튼이 내용을 가렸다.
 * 위쪽(top)은 헤더 높이가 섞일 수 있어 다루지 않는다.
 * @returns 구독 해제 함수. 브리지가 없는 환경에서는 아무것도 하지 않는다.
 */
export const syncSafeAreaToCss = () => {
  const apply = ({ bottom }: { bottom: number }) =>
    document.documentElement.style.setProperty('--safe-area-bottom', `${bottom}px`);

  try {
    apply(SafeArea.get());
    return SafeArea.subscribe({ onEvent: apply });
  } catch {
    return () => {};
  }
};
