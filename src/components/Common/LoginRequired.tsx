import { useState } from 'react';
import styled from 'styled-components';

import useAuth from '../../hooks/useAuth';

interface LoginRequiredProps {
  message?: string;
}

/** 로그인이 필요한 화면의 안내. 로그인은 버튼을 눌렀을 때만 시작한다. */
const LoginRequired = ({
  message = '토스로 로그인하면\n판매 내역을 확인할 수 있어요',
}: LoginRequiredProps) => {
  const { login } = useAuth();
  const [pending, setPending] = useState(false);

  const handleLogin = async () => {
    setPending(true);
    await login();
    setPending(false);
  };

  return (
    <LoginRequiredBase>
      <Message>{message}</Message>
      <LoginButton type="button" disabled={pending} onClick={handleLogin}>
        토스로 로그인
      </LoginButton>
    </LoginRequiredBase>
  );
};

export default LoginRequired;

const LoginRequiredBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 120px 24px 0;
  text-align: center;
`;

const Message = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #6b7380;
  white-space: pre-line;
`;

const LoginButton = styled.button`
  padding: 10px 18px;
  border-radius: 12px;
  background-color: #3182f6;
  font-size: 15px;
  font-weight: 600;
  color: #fff;

  &:disabled {
    opacity: 0.5;
  }
`;
