export interface PurchaseProps {
  purchaseData: PurchaseItem;
}

export interface PurchaseItem {
  image: string;
  model: string;
  price: number;
  storage: string;
}

export type PurchaseSelectState = {
  category?: string;
  subcategory?: string;
  model?: string;
  storage?: string;
  customModel?: string;
};

export interface PurchaseGradeProps {
  gradeDetail: PurchaseGrade[];
}

export type PurchaseGrade = {
  description: string;
  grade: string;
  prePrice: number;
  price: number;
  image: string;
};

export interface RecentlyAddr {
  address1: string | null;
  address2: string | null;
  phone: string;
  zipcode: string;
}

export type ApplyPurchaseData = {
  purchaseType?: string;
  csvCompany?: string;

  name?: string;
  phone?: string;

  zipcode?: string;
  address1?: string;
  address2?: string;

  reservationDay?: string;
  reservationTime?: string;
};

export interface VisitProps {
  startDate: string;
  endDate: string;
  disabledDate: {
    day: string;
    time: string;
    userId: number;
  }[];
}

// type/purchase.ts
export interface PurchaseIdProps {
  purchaseId: number;
  userId?: number;
  memberId?: number;
}

export interface CancelContainerProps extends PurchaseIdProps {
  status: number;
}

export type PurchaseType = 'KIT' | 'NONE_KIT' | 'CSV' | 'VISIT';
export type ActionButtonType =
  | 'CANCEL_PURCHASE' // 내 폰 팔기 취소
  | 'CANCEL_SALE' // 판매 취소
  | 'CONFIRM_SALE' // 판매 확정
  | 'ACCOUNT_SAVE' // 계좌 번호 입력
  | 'REQUEST_PICKUP' // 수거 신청
  | 'REVIEW';

export interface PurchaseDetailProps {
  purchaseDetailData: PurchaseDetailData;
}

export interface PurchaseDetailData {
  address1: string | null;
  address2: string | null;

  category: string;
  subcategory: string | null;
  csvCode: string | null;
  csvCompany: string | null;
  image: string | null;
  model: string | null;
  name: string | null;
  phone: string | null;
  grade: number | null;
  price: string | null;

  purchaseId: number;
  purchaseType: PurchaseType;
  purchaseUid: string;

  reservationDay: string | null;
  reservationTime: string | null;

  status: number;
  storage: string | null;
  zipcode: string | null;

  kitTrackingNumber: string | null;
  kitDeliveredAt: string | null;
  kitArrivedAt: string | null;

  returnTrackingNumber: string | null;

  userId: number;
  createdAt: string;
}

export interface ShippingInfo {
  name: string;
  phone: string;

  zipcode: string;
  address1: string; // 기본주소
  address2: string; // 상세주소

  memo: string;
  memoText: string;
}
