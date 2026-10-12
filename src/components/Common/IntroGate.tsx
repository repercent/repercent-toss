import { ChildrenProps } from '../../type/common';
import useAuth from '../../hooks/useAuth';

import IntroContainer from '../../container/IntroContainer';

/**
 * 로그인 세션이 없으면(처음 진입, 토큰 만료, 401) 어느 주소든 인트로를 보여 준다.
 * 저장된 세션을 읽는 동안에는 아무것도 그리지 않는다.
 */
const IntroGate = ({ children }: ChildrenProps) => {
  const { status } = useAuth();

  if (status === 'loading') return null;
  if (status === 'guest') return <IntroContainer />;
  return <>{children}</>;
};

export default IntroGate;
