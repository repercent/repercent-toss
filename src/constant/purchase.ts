import { PurchaseType } from '../type/purchase';

/** 고를 수 있는 브랜드 */
export const CATEGORIES = ['갤럭시', '아이폰', '기타'] as const;
export type Category = (typeof CATEGORIES)[number];

/** 목록에 없는 기종. 시리즈·모델·용량을 고르지 않고 바로 수거 단계로 넘어간다. */
export const ETC: Category = '기타';

/**
 * 시리즈·모델 목록 맨 끝에 붙는 '기타' 칩. 슈퍼리스트에서 꺼 둔 기종처럼 목록에 없는 폰을
 * 뒤로 가지 않고 그 자리에서 받는다. 고르면 브랜드 기타처럼 용량을 건너뛰고 모델명을 직접
 * 적어 수거 단계로 간다. 위에서 고른 브랜드·시리즈는 그대로 남는다. (repercent-client와 같음)
 */
export const ETC_SERIES: Partial<Record<Category, string>> = {
  갤럭시: '기타 갤럭시',
  아이폰: '기타 아이폰',
};

/** 시리즈별 모델 기타. 키는 API가 내려 주는 시리즈 값이다. Z폴드·Z플립에는 두지 않는다. */
export const ETC_MODELS: Partial<Record<string, string>> = {
  갤럭시S: '기타 S 시리즈',
  갤럭시노트: '기타 노트 시리즈',
  갤럭시A: '기타 A 시리즈',
  갤럭시M: '기타 M 시리즈',
};

/**
 * 기타 칩 바로 앞에 두는 시리즈. 서버는 시리즈를 이름순으로 줘서 갤럭시M이 갤럭시A와
 * 갤럭시S 사이에 온다. 기획은 기타갤럭시에서 옮겨 온 갤럭시M을 기타 갤럭시 바로 앞에 둔다.
 */
export const SERIES_BEFORE_ETC: Partial<Record<Category, string[]>> = {
  갤럭시: ['갤럭시M'],
};

/** 어느 단계의 기타를 골랐는지. 브랜드 기타, 시리즈 기타, 모델 기타 */
export type EtcType = 'brand' | 'series' | 'model';

/** purchases.status (repercent-common-api PurchaseService 기준) */
export const PURCHASE_STATUS = {
  APPLIED: 100,
  KIT_SHIPPING: 111,
  KIT_DELIVERED: 112,
  CANCELED: 120,
  PICKUP_REJECTED: 121,
  RETURN_REQUESTED: 130,
  REPICKUP_REQUESTED: 140,
  PICKUP_CANCELED: 150,
  PICKING_UP: 160,
  ARRIVED: 200,
  INSPECTED: 300,
  PAYMENT_READY: 500,
  RETURN_READY: 550,
  PICKUP_FAILED: 600,
  AUTO_CONFIRMED: 800,
  PAID: 900,
  RETURNED: 990,
} as const;

const S = PURCHASE_STATUS;

export const PURCHASE_STATUS_LABEL: Record<number, string> = {
  [S.APPLIED]: '접수 완료',
  [S.KIT_SHIPPING]: '수거 키트 배송중',
  [S.KIT_DELIVERED]: '수거 키트 배송 완료',
  [S.CANCELED]: '내 폰 팔기 취소',
  [S.PICKUP_REJECTED]: '수거 거부',
  [S.RETURN_REQUESTED]: '반송 요청',
  [S.REPICKUP_REQUESTED]: '수거 대기',
  [S.PICKUP_CANCELED]: '수거 취소',
  [S.PICKING_UP]: '수거 대기',
  [S.ARRIVED]: 'AI 검수센터 입고',
  [S.INSPECTED]: 'AI 검수 완료',
  [S.PAYMENT_READY]: '입금 준비중',
  [S.RETURN_READY]: '반송 준비중',
  [S.PICKUP_FAILED]: '수거 미완료',
  [S.AUTO_CONFIRMED]: '판매 확정',
  [S.PAID]: '판매 완료',
  [S.RETURNED]: '반송 완료',
};

/** 더 이상 진행되지 않는 상태 (홈의 "진행 중인 판매" 집계에서 제외) */
const FINISHED_STATUSES: number[] = [
  S.CANCELED,
  S.PICKUP_REJECTED,
  S.PICKUP_CANCELED,
  S.PAID,
  S.RETURNED,
];

export const isInProgress = (status: number) => !FINISHED_STATUSES.includes(status);

/** 진행 단계 표시줄 */
export const PROGRESS_STEPS = ['수거대기', 'AI 검수중', '판매확정 대기', '입금 대기'];

export type PurchaseAction =
  | 'CANCEL_PURCHASE' // 내 폰 팔기 취소
  | 'CANCEL_SALE' // 판매 취소
  | 'CONFIRM_SALE' // 판매 확정
  | 'ACCOUNT_SAVE' // 계좌번호 입력
  | 'INQUIRY' // 문의하기
  | 'REQUEST_PICKUP'; // 수거 재신청

export interface PurchaseStatusView {
  title: string;
  description: string;
  /** 진행 단계 (0~3), null이면 단계 표시줄을 숨김 */
  step: number | null;
  /** 마지막 단계까지 끝난 상태 */
  completed?: boolean;
  actions: PurchaseAction[];
}

const PACK_AND_WAIT =
  '제품을 안전하게 포장해 문 앞에 놓아주세요\n2일 내 기사님께서 수거할 예정이에요';

const APPLIED_DESCRIPTION: Record<PurchaseType, string> = {
  KIT: '수거 키트가 곧 발송될 예정이에요',
  NONE_KIT: PACK_AND_WAIT,
  CSV: '제품을 안전하게 포장해 3일 이내\n편의점 택배를 발송해 주세요',
  VISIT: '예약한 시간에 리퍼센트를 방문해 주세요',
};

export const getPurchaseStatusView = (
  status: number,
  purchaseType: PurchaseType
): PurchaseStatusView => {
  switch (status) {
    case S.APPLIED:
      return {
        title: '접수 완료',
        description: APPLIED_DESCRIPTION[purchaseType] ?? '',
        step: 0,
        actions: ['CANCEL_PURCHASE'],
      };
    case S.KIT_SHIPPING:
      return {
        title: '수거 키트 배송중',
        description: '수거 키트가 곧 도착할 예정이에요',
        step: 0,
        actions: ['CANCEL_PURCHASE'],
      };
    case S.KIT_DELIVERED:
      return {
        title: '수거 키트 배송 완료',
        description: PACK_AND_WAIT,
        step: 0,
        actions: ['CANCEL_PURCHASE'],
      };
    case S.REPICKUP_REQUESTED:
    case S.PICKING_UP:
      return {
        title: '수거 대기',
        description: PACK_AND_WAIT,
        step: 0,
        actions: ['CANCEL_PURCHASE'],
      };
    case S.PICKUP_FAILED:
      return {
        title: '수거 미완료',
        description:
          '상품이 준비되지 않아 수거가 미완료 되었어요\n지금 다시 신청하시면 가장 높은 금액을\n받을 수 있어요',
        step: 0,
        actions: ['INQUIRY', 'REQUEST_PICKUP'],
      };
    case S.ARRIVED:
      return {
        title: 'AI 검수센터 입고',
        description: '자동화 검수 후 최종 견적을 알림톡으로\n보내드릴게요',
        step: 1,
        actions: [],
      };
    case S.INSPECTED:
      return {
        title: 'AI 검수 완료',
        description: '견적가를 확인하고 판매를 확정해 주세요',
        step: 2,
        actions: ['CANCEL_SALE', 'CONFIRM_SALE'],
      };
    case S.RETURN_READY:
      return {
        title: '반송 준비중',
        description: '제품은 아래 주소로 반송될 예정이에요',
        step: 2,
        actions: [],
      };
    case S.RETURNED:
      return {
        title: '반송 완료',
        description: '제품이 아래 주소로 반송되었어요',
        step: 2,
        actions: [],
      };
    case S.PAYMENT_READY:
      return {
        title: '입금 준비중',
        description: '영업일 기준 1일 이내에 입금될 예정이에요',
        step: 3,
        actions: [],
      };
    case S.AUTO_CONFIRMED:
      return {
        title: '판매 확정',
        description: '입금 받으실 계좌번호를 입력해주세요',
        step: 3,
        actions: ['ACCOUNT_SAVE'],
      };
    case S.PAID:
      return {
        title: '판매 완료',
        description: '입금이 완료되었어요',
        step: 3,
        completed: true,
        actions: [],
      };
    case S.CANCELED:
    case S.RETURN_REQUESTED:
      return {
        title: '내 폰 팔기 취소',
        description:
          '중고폰은 매일 매입가가 하락해요\n지금 다시 신청하시면 가장 높은 금액을\n받을 수 있어요',
        step: null,
        actions: [],
      };
    default:
      return {
        title: PURCHASE_STATUS_LABEL[status] ?? '',
        description: '',
        step: null,
        actions: [],
      };
  }
};

export const CSV_COMPANY_LABEL: Record<string, string> = {
  CU: 'CU 편의점',
  EMART: '이마트24 편의점',
};

export interface CancelReasonGroup {
  category: string;
  reasons: { reason: string; isEtc?: boolean }[];
}

/** 입고(200) 전 취소 사유 */
export const CANCEL_REASONS_BEFORE: CancelReasonGroup[] = [
  {
    category: '다른 곳에 판매',
    reasons: [
      { reason: '다른 곳에서 더 높은 견적을 제시받았어요' },
      { reason: '다른 곳이 더 믿음이 가요' },
    ],
  },
  {
    category: '판매 의향 변경',
    reasons: [{ reason: '조금 더 쓰다가 나중에 팔게요' }, { reason: '판매하지 않기로 했어요' }],
  },
  {
    category: '프로세스 불편',
    reasons: [
      { reason: '수거 키트 도착이 너무 오래 걸려요' },
      { reason: '택배를 보내는 게 너무 번거로워요' },
    ],
  },
  { category: '입력 오류', reasons: [{ reason: '기기/배송 정보를 잘못 입력했어요' }] },
  { category: '기타', reasons: [{ reason: '직접 입력', isEtc: true }] },
];

/** 검수 완료(300) 후 판매 취소 사유 */
export const CANCEL_REASONS_AFTER: CancelReasonGroup[] = [
  {
    category: '견적 불만족',
    reasons: [
      { reason: '최종 견적이 예상보다 낮게 나왔어요' },
      { reason: '다른 곳에서 더 높은 견적을 받을 수 있을 것 같아요' },
    ],
  },
  {
    category: '검수 결과 불신',
    reasons: [{ reason: '검수 결과(등급 및 상태)에 동의하기 어려워요' }],
  },
  { category: '판매 의향 변경', reasons: [{ reason: '판매하지 않고 계속 사용하기로 했어요' }] },
  { category: '기타', reasons: [{ reason: '직접 입력', isEtc: true }] },
];

export const BANK_LIST = [
  { code: '004', name: 'KB국민은행' },
  { code: '088', name: '신한은행' },
  { code: '020', name: '우리은행' },
  { code: '081', name: '하나은행' },
  { code: '011', name: 'NH농협은행' },
  { code: '090', name: '카카오뱅크' },
  { code: '092', name: '토스뱅크' },
  { code: '089', name: '케이뱅크' },
  { code: '003', name: 'IBK기업은행' },
  { code: '012', name: '지역농축협' },
  { code: '045', name: 'MG새마을금고' },
  { code: '048', name: '신협' },
  { code: '071', name: '우체국' },
  { code: '023', name: 'SC제일은행' },
  { code: '031', name: 'IM뱅크' },
  { code: '032', name: '부산은행' },
  { code: '039', name: '경남은행' },
  { code: '034', name: '광주은행' },
  { code: '037', name: '전북은행' },
  { code: '035', name: '제주은행' },
  { code: '007', name: '수협은행' },
  { code: '002', name: 'KDB산업은행' },
  { code: '050', name: '저축은행' },
  { code: '064', name: '산림조합' },
  { code: '027', name: '한국씨티은행' },
  { code: '271', name: '토스증권' },
  { code: '264', name: '키움증권' },
  { code: '230', name: '미래에셋증권' },
  { code: '240', name: '삼성증권' },
  { code: '243', name: '한국투자증권' },
  { code: '247', name: 'NH투자증권' },
  { code: '218', name: 'KB증권' },
  { code: '270', name: '하나증권' },
  { code: '278', name: '신한투자증권' },
  { code: '267', name: '대신증권' },
  { code: '287', name: '메리츠증권' },
  { code: '209', name: '유안타증권' },
  { code: '269', name: '한화투자증권' },
  { code: '261', name: '교보증권' },
];
