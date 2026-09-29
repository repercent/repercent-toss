export const formatPrice = (price: number) => `${price.toLocaleString('ko-KR')}원`;

export const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return phone;
};

/** "갤럭시 S23 256GB" 형태의 상품명 (기타 기종은 입력한 모델명만) */
export const getProductName = ({
  category,
  model,
  storage,
}: {
  category?: string | null;
  model?: string | null;
  storage?: string | null;
}) => {
  const brand = category && category !== '기타' && !model?.startsWith(category) ? category : null;
  return [brand, model, storage].filter(Boolean).join(' ') || category || '';
};

/** axios 에러에서 서버 메시지 추출 */
export const getErrorMessage = (err: unknown, fallback: string) => {
  const message = (err as { response?: { data?: { message?: unknown } } })?.response?.data?.message;
  return typeof message === 'string' && message ? message : fallback;
};
