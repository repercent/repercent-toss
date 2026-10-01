import { Storage } from '@apps-in-toss/web-framework';

export interface Session {
  userId: number;
  accessToken: string;
  /** 만료 시각 (ms) */
  expiresAt: number;
}

const SESSION_KEY = 'repercent:session';

/**
 * 로그인 세션은 SDK Storage(토스 앱 저장소)에 보관한다.
 * 토스 앱 밖이거나 저장소를 쓸 수 없으면 로그인 전 상태로 취급한다.
 */
export const loadSession = async (): Promise<Session | null> => {
  try {
    const raw = await Storage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Session;
    return session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
};

export const saveSession = async (session: Session) => {
  try {
    await Storage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // 저장에 실패해도 이번 실행 동안은 메모리 세션으로 동작
  }
};

export const clearSession = async () => {
  try {
    await Storage.removeItem(SESSION_KEY);
  } catch {
    // 저장소를 쓸 수 없는 환경
  }
};
