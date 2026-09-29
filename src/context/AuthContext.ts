import { createContext } from 'react';

export type AuthStatus = 'loading' | 'guest' | 'member';

export interface AuthState {
  status: AuthStatus;
  userId: number | null;
  /**
   * 로그인돼 있으면 회원 ID를 바로 돌려주고, 아니면 토스 로그인을 진행한다.
   * 앱인토스 검수 기준상 사용자 동작(버튼 등)에서만 호출해야 한다. 실패하면 null.
   */
  login: () => Promise<number | null>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthState>({
  status: 'loading',
  userId: null,
  login: async () => null,
  logout: async () => {},
});
