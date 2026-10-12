import { useEffect } from 'react';
import { graniteEvent, Screen } from '@apps-in-toss/web-framework';

import useAuth from '../hooks/useAuth';

import Intro from '../components/Intro/Intro';

/**
 * 로그인 전 첫 화면. '시작하기'를 눌렀을 때만 토스 로그인을 시작한다
 * (진입하자마자 토스 로그인 화면을 띄우지 않는다는 검수 기준).
 * 로그인되면 IntroGate가 원래 가려던 화면을 보여 준다.
 * 인트로보다 앞 화면은 없으므로 뒤로가기는 미니앱을 닫는다.
 */
const IntroContainer = () => {
  const { login } = useAuth();

  useEffect(() => {
    let unsubscribe = () => {};
    try {
      unsubscribe = graniteEvent.addEventListener('backEvent', {
        onEvent: () => {
          Screen.close().catch(() => {});
        },
        onError: () => {},
      });
    } catch {
      // 이벤트 브리지가 없는 환경
    }
    return () => unsubscribe();
  }, []);

  return <Intro onStart={login} />;
};

export default IntroContainer;
