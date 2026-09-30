export interface ServiceReview {
  title: string;
  content: string;
  grade: string;
  model: string;
  storage: string;
  color: string;
  author: string;
  date: string;
}

// Figma 시안 문구 그대로. 실제 후기 데이터로 교체 전 기획 확인 필요.
export const SERVICE_REVIEWS: ServiceReview[] = [
  {
    title: '다른 곳과 다르게 제값 쳐줘서 너무 좋아요',
    content:
      '딴데도 알아봤는데 여기가 제일 가격을 잘 쳐주더라고요. 제값 받고 판매한 것 같아 만족합니다.',
    grade: '상급',
    model: '갤럭시S23',
    storage: '124GB',
    color: '블랙',
    author: '박진*',
    date: '2025.11.13',
  },
  {
    title: '견적 기준이 명확해서 신뢰가 가는 업체',
    content:
      '그동안은 주는 대로 팔았는데 여기는 기준 금액을 먼저 보여줘서 좋았어요. 실제 판매 금액도 거의 비슷해 좋아요.',
    grade: '상급',
    model: '갤럭시S23',
    storage: '124GB',
    color: '블랙',
    author: '박진*',
    date: '2025.11.13',
  },
  {
    title: '응답 빠르고 견적도 객관적이네요',
    content:
      '처음 판매해봤는데 문의 답변도 빠르고 견적도 납득이 갔어요. 고민 중이라면 추천드립니다.',
    grade: '상급',
    model: '갤럭시S23',
    storage: '124GB',
    color: '블랙',
    author: '박진*',
    date: '2025.11.13',
  },
  {
    title: '신청부터 수거까지 깔끔하고 금액도 딴데보다 높아요',
    content:
      '중고폰 어디에 팔까 고민하다 이용했는데 수거까지 깔끔했어요. 가격도 생각보다 잘 쳐주더라고요.',
    grade: '상급',
    model: '갤럭시S23',
    storage: '124GB',
    color: '블랙',
    author: '박진*',
    date: '2025.11.13',
  },
  {
    title: '박스 구하고 배송접수하고 그런 귀찮은거 없어서 만족',
    content:
      '박스 구하고 택배 보내는 번거로움이 없어서 정말 편했어요. 다음에도 이용할 것 같네요 :)',
    grade: '상급',
    model: '갤럭시S23',
    storage: '124GB',
    color: '블랙',
    author: '박진*',
    date: '2025.11.13',
  },
];
