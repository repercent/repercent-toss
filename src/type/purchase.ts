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
  /** 예상 시세 단계에서 채워져 매입 신청 본문으로 함께 전송된다 (서버가 상품 이미지로 저장). */
  image?: string;
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

/** 판매 내역 목록 (GET /purchases/product/user/{userId}) */
export interface PurchaseHistoryItem {
  purchaseId: number;
  purchaseProductId: number;
  category: string | null;
  subcategory: string | null;
  model: string | null;
  storage: string | null;
  image: string | null;
  /** 검수 완료(300) 전에는 null */
  price: number | null;
  status: number;
}

/** 판매 상세 (GET /purchases/{purchaseId}) */
export interface PurchaseDetailData {
  purchaseId: number;
  purchaseUid: string;
  purchaseType: PurchaseType;
  status: number;
  price: number | null;

  category: string | null;
  subcategory: string | null;
  model: string | null;
  storage: string | null;
  image: string | null;

  name: string | null;
  phone: string | null;
  zipcode: string | null;
  address1: string | null;
  address2: string | null;

  csvCompany: 'CU' | 'EMART' | null;
  csvCode: string | null;
  reservationDay: string | null;
  reservationTime: string | null;

  kitTrackingNumber: string | null;
  pickupTrackingNumber: string | null;
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
}

/** 수거 신청 화면 간에 전달되는 신청 정보 */
export type PurchaseApplyState = PurchaseSelectState &
  Partial<ShippingInfo> & {
    purchaseType?: PurchaseType;
    csvCompany?: string;
  };
