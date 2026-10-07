import { useEffect, useRef } from 'react';
import { graniteEvent, NavigationBar } from '@apps-in-toss/web-framework';

/** 지원하지 않는 토스 앱 버전이나 브라우저에서 실패해도 화면은 계속 동작하게 한다. */
const setBackButtonVisible = (visible: boolean) => {
  try {
    NavigationBar.setOptions({ withBackButton: visible }).catch(() => {});
  } catch {
    // 내비게이션 바 브리지가 없는 환경
  }
};

/**
 * 이 화면에서는 내비게이션 바의 뒤로 버튼을 숨기고, 시스템 뒤로가기(안드로이드 물리 버튼 등)는 onBack으로 처리한다.
 * backEvent를 구독하면 기본 뒤로가기는 막힌다. 화면을 떠나면 구독을 해제하고 뒤로 버튼을 다시 보인다.
 */
const useHideBackButton = (onBack: () => void) => {
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    setBackButtonVisible(false);

    let unsubscribe = () => {};
    try {
      unsubscribe = graniteEvent.addEventListener('backEvent', {
        onEvent: () => onBackRef.current(),
        onError: () => {},
      });
    } catch {
      // 이벤트 브리지가 없는 환경
    }

    return () => {
      unsubscribe();
      setBackButtonVisible(true);
    };
  }, []);
};

export default useHideBackButton;
