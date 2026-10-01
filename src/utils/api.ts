import axios from 'axios';

import { PURCHASE_API_URL } from '../constant/env';

/** 매입 API 클라이언트 */
export const purchaseApi = axios.create({ baseURL: PURCHASE_API_URL });

let accessToken: string | null = null;
let onUnauthorized: (() => void) | null = null;

/** 로그인 세션의 토큰을 요청 헤더에 싣는다 (AuthProvider에서 설정) */
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

/** 토큰이 만료·무효일 때(401) 로그아웃 처리 */
export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  onUnauthorized = handler;
};

purchaseApi.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

purchaseApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) onUnauthorized?.();
    return Promise.reject(err);
  }
);
