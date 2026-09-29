const USER_ID_KEY = 'repercent:userId';

/**
 * 리퍼센트 회원 ID.
 * 토스 로그인 연동(appLogin → auth 서버 교환) 완료 시 setUserId로 저장한다.
 * 로컬 개발에서는 VITE_DEV_USER_ID로 지정할 수 있다.
 */
export const getUserId = (): number | null => {
  try {
    const saved = localStorage.getItem(USER_ID_KEY);
    if (saved) return Number(saved);
  } catch {
    // 스토리지 접근 불가 환경
  }
  const devUserId = import.meta.env.VITE_DEV_USER_ID;
  return devUserId ? Number(devUserId) : null;
};

export const setUserId = (userId: number) => {
  try {
    localStorage.setItem(USER_ID_KEY, String(userId));
  } catch {
    // 스토리지 접근 불가 환경
  }
};
