import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ChildrenProps } from '../../type/common';
import { AuthContext, AuthStatus } from '../../context/AuthContext';
import { clearSession, loadSession, saveSession, Session } from '../../auth/session';
import { LoginError, loginWithToss } from '../../auth/login';
import { setAccessToken, setUnauthorizedHandler } from '../../utils/api';
import useToast from '../../hooks/useToast';

const AuthProvider = ({ children }: ChildrenProps) => {
  const showToast = useToast();

  const [status, setStatus] = useState<AuthStatus>('loading');
  const [userId, setUserId] = useState<number | null>(null);
  const sessionRef = useRef<Session | null>(null);
  const pendingLogin = useRef<Promise<number | null> | null>(null);

  const applySession = useCallback((next: Session | null) => {
    sessionRef.current = next;
    setAccessToken(next?.accessToken ?? null);
    setUserId(next?.userId ?? null);
    setStatus(next ? 'member' : 'guest');
  }, []);

  const logout = useCallback(async () => {
    applySession(null);
    await clearSession();
  }, [applySession]);

  // 앱 시작 시 저장된 세션 복원 (로그인 창은 띄우지 않음)
  useEffect(() => {
    let active = true;
    loadSession().then((saved) => {
      if (active) applySession(saved);
    });
    return () => {
      active = false;
    };
  }, [applySession]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      if (!sessionRef.current) return;
      logout();
      showToast('로그인이 만료됐어요. 다시 로그인해 주세요');
    });
    return () => setUnauthorizedHandler(null);
  }, [logout, showToast]);

  const login = useCallback(async () => {
    const current = sessionRef.current;
    if (current && current.expiresAt > Date.now()) return current.userId;

    if (!pendingLogin.current) {
      pendingLogin.current = (async () => {
        try {
          const next = await loginWithToss();
          applySession(next);
          await saveSession(next);
          return next.userId;
        } catch (err) {
          showToast(err instanceof LoginError ? err.message : '로그인에 실패했어요');
          return null;
        } finally {
          pendingLogin.current = null;
        }
      })();
    }
    return pendingLogin.current;
  }, [applySession, showToast]);

  const value = useMemo(() => ({ status, userId, login, logout }), [status, userId, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
