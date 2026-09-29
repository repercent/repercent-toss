import axios from 'axios';
import { appLogin } from '@apps-in-toss/web-framework';

import { AUTH_API_URL } from '../constant/env';
import { getErrorMessage } from '../utils/format';
import { Session } from './session';

interface TossLoginResponse {
  userId: number;
  accessToken: string;
  /** accessToken 유효 시간(초) */
  expiresIn: number;
}

/** 만료 직전 요청이 실패하지 않도록 여유를 둔다 */
const EXPIRY_MARGIN_MS = 60 * 1000;

export class LoginError extends Error {}

/**
 * 토스 로그인: appLogin()으로 받은 인가 코드를 auth 서버에서 리퍼센트 토큰으로 바꾼다.
 * 처음 로그인하면 토스 약관 동의 화면이 뜨고, 이후에는 화면 없이 바로 끝난다.
 */
export const loginWithToss = async (): Promise<Session> => {
  let authorization: Awaited<ReturnType<typeof appLogin>>;
  try {
    authorization = await appLogin();
  } catch {
    throw new LoginError('토스 로그인을 완료하지 못했어요');
  }

  try {
    const res = await axios.post<TossLoginResponse>(`${AUTH_API_URL}/auth/toss-sign`, {
      authorizationCode: authorization.authorizationCode,
      referrer: authorization.referrer,
    });
    return {
      userId: res.data.userId,
      accessToken: res.data.accessToken,
      expiresAt: Date.now() + res.data.expiresIn * 1000 - EXPIRY_MARGIN_MS,
    };
  } catch (err) {
    throw new LoginError(getErrorMessage(err, '로그인에 실패했어요. 잠시 후 다시 시도해 주세요'));
  }
};
