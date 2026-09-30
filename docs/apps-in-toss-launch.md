# 앱인토스 출시 준비 현황

2026-09-29 기준. Figma `App-in-Toss` 파일의 `앱인토스` 섹션을 기준으로 구현했고, 출시까지 남은 일을 담당별로 정리했어요.

## 한눈에 보기

| 구분                                            | 상태                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ |
| Figma 플로우 화면 구현                          | 완료                                                         |
| SDK 3.x 마이그레이션 (2.6.1 → 3.6.0)            | 완료                                                         |
| 우편번호 iframe 위젯 제거 → 도로명주소 API 검색 | 완료 (승인키 발급 필요)                                      |
| API 주소를 빌드용 HTTPS 주소로 전환             | 완료                                                         |
| purchase 서버 CORS에 미니앱 Origin 추가         | PR 올림 (repercent-common-api#825), 배포 필요                |
| 토스 로그인 연동                                | 설계 완료, **auth 서버 작업 필요** ([설계](./toss-login.md)) |
| 콘솔 앱 등록 · 검수 · 출시                      | 시작 전                                                      |

## 완료한 작업

### 화면

- 신규: 서비스 알아보기(`/service`), 로그아웃 방법(`/logout-guide`), 신청 완료(`/complete`), 판매 내역(`/history`), 판매 상세(`/history/:id`), 취소 사유(`/history/:id/cancel`), 계좌 입력(`/history/:id/account`)
- 시안 반영: 메인, 수거 방식 선택, 키트 선택, 편의점 선택, 주소 입력(`/address`로 분리), 유의사항
- 상세 화면은 `purchases.status` 값에 맞춰 제목·진행 단계·버튼이 바뀌어요. 규칙은 `src/constant/purchase.ts`의 `getPurchaseStatusView` 한 곳에 있어요.

| Figma 프레임       | status                | 화면 제목                      | 버튼                      |
| ------------------ | --------------------- | ------------------------------ | ------------------------- |
| 1046 · 1061 · 1062 | 100                   | 접수 완료                      | 내 폰 팔기 취소하기       |
| 1059 / 1060        | 111 / 112             | 수거 키트 배송중 / 배송 완료   | 내 폰 팔기 취소하기       |
| 1074               | 140 · 160             | 수거 대기                      | 내 폰 팔기 취소하기       |
| 1063 · 1064 · 1065 | 200                   | AI 검수센터 입고               | 없음                      |
| 1066 · 1068 · 1069 | 300                   | AI 검수 완료                   | 판매 취소하기 · 판매 확정 |
| 1070               | 500                   | 입금 준비중                    | 없음                      |
| 1071               | 800                   | 판매 확정                      | 계좌번호 입력             |
| 1072               | 900                   | 판매 완료                      | 없음                      |
| 1073               | 600                   | 수거 미완료                    | 문의하기 · 수거 재신청    |
| 시안 없음          | 120 · 130 · 550 · 990 | 취소 / 반송 준비중 / 반송 완료 | 없음                      |

### 고친 기존 버그

- 수거 방식 선택에서 다음 화면으로 넘어갈 때 기기 정보가 사라져 신청에 모델·용량이 빠지던 문제
- 편의점 신청이 `purchaseType`에 `CU`/`EMART`를 보내던 문제 → `CSV` + `csvCompany`
- 신청 요청에 `userId`가 없어 서버에서 항상 실패하던 구조
- 신청 후 이동하는 완료 화면 경로가 없던 문제
- 견적 화면 상품 이미지 주소가 `undefined/…`로 깨지던 문제

### 기술 작업

- **SDK 3.x**: `granite.config.ts` → `apps-in-toss.config.ts`, 로컬 개발은 AIT Devtools 목업으로 브라우저에서 바로 확인
- **주소 검색**: `react-daum-postcode`(iframe) 제거, `src/components/Pickup/AddressSearch.tsx`에서 도로명주소 API 직접 호출
- **API 주소**: `/api` 상대경로 11곳을 `src/utils/api.ts`의 `purchaseApi`로 교체. 빌드 기본값 `https://purchase.repercent.com`
- 환경변수는 [README](../README.md#환경변수) 참고

## 남은 일

### 1. 토스 로그인 연동 — 출시 필수, 가장 먼저

회원 ID가 없으면 신청·판매 내역이 동작하지 않아요. 지금은 로그인 안내 문구만 보여요.
흐름, 결정할 것(토큰 발급 방식), 담당별 할 일은 **[토스 로그인 연동 설계](./toss-login.md)**에 정리했어요.

- auth 서버: `/auth/toss-sign`은 `origin/dev`에 있고 main에는 없어요. 토큰 발급 방식 결정, TOSS 가입 경로, 응답 본문 토큰 반환, CORS, 연결 끊기 콜백, mTLS·복호화 키 설정이 필요해요.
- 미니앱: 로그인 모듈, `Authorization` 헤더, 로그인 시작 위치(사용자 동작에서만), SDK `Storage` 전환
- 콘솔 · 운영: 사업자 등록, 토스 로그인 약관·동의 항목·연결 끊기 콜백 설정

### 2. purchase 서버 CORS 반영 — 출시 필수

지금 운영·개발 purchase 서버 모두 미니앱 Origin 요청을 403으로 거부해요.

- [x] `app/purchase` `CorsConfig`에 아래 Origin 추가 + `CorsConfigTest` 추가 → repercent/repercent-common-api#825 (dev 대상)
  - `https://repercent-toss.apps.tossmini.com`, `https://repercent-toss.private-apps.tossmini.com`
  - `https://repercent-toss.web.tossmini.com`, `https://repercent-toss.private-web.tossmini.com`
- [ ] #825 머지 → dev 배포 → QR 테스트 → main 대상 PR · 배포
- 콘솔 appName이 `repercent-toss`가 아니면 Origin과 `apps-in-toss.config.ts`를 같이 바꿔야 해요. appName은 등록 후 바꿀 수 없어요.

### 3. 도로명주소 API 승인키 — 출시 필수

- [ ] [business.juso.go.kr](https://business.juso.go.kr)에서 검색 API 승인키 발급 (운영키는 서비스 URL 입력)
- [ ] 빌드 환경 `.env`에 `VITE_JUSO_API_KEY` 설정. 키는 빌드 시점에 들어가므로 키 없이 빌드하면 주소 검색이 안내 문구만 보여요.
- [ ] 토스 앱에서 실제 검색 확인 (지금까지는 목업 응답으로만 검증)

### 4. 서버 인증 적용 — 출시 전 권장

- [ ] 토스 로그인 연동 후 매입 API 요청에 토큰 인증 적용 (세부 점검 항목은 백엔드 내부 문서에서 관리)

### 5. 기획 · 디자인 확인

- [x] 서비스 알아보기 후기를 웹 판매하기 화면과 같은 5건으로 교체. 이름은 가운데 글자를 가려요 (`src/constant/service.ts`)
- [x] 서비스 알아보기 가격 비교를 웹과 같은 방식으로 계산: 추천 모델 시세와 A사·B사 시세(80~95%) (`src/hooks/usePurchaseHero.ts`)
- [ ] 입고(200) 상태 취소 버튼: 시안엔 있지만 서버가 막아서 뺐어요. 정책 확인
- [ ] 111·112·140 상태 취소: 운영 서버는 허용, dev 서버 정책은 차단. 배포되면 앱 버튼도 맞춰야 해요.
- [ ] 로그아웃 방법 단계 번호를 전체에 붙였어요(시안은 1~3만). 확인
- [ ] 계좌 입력·취소 사유·확인 창은 시안이 없어 웹과 같은 문구로 구현했어요. 필요하면 시안 추가

### 6. 콘솔 등록 · 검수 · 출시

- [ ] 앱 등록: 앱 이름, 영문명, appName `repercent-toss`, 로고 600×600 PNG, 카테고리
- [ ] 중고폰 매입이 어떤 카테고리·정책에 해당하는지 채널톡으로 사전 문의 (중고거래는 별도 서류 대상)
- [ ] `npm run build` → 콘솔 업로드(또는 `npm run deploy`) → QR로 토스 앱 테스트 → 검토 요청 → 출시
- [ ] 검수 체크: 외부 링크(채널톡 문의, CJ 배송조회)가 "서비스에 꼭 필요한 링크"로 인정되는지 확인
- SDK 3.x 번들은 출시 후 2.x로 되돌릴 수 없어요.

### 7. 기술 부채 — 출시 후 가능

- [ ] 로컬 개발 프록시(`vite.config.ts`)가 **운영** purchase 서버를 가리켜요. 로컬에서 신청하면 운영 DB에 기록돼요. `VITE_PURCHASE_API_URL`로 dev 서버를 쓰거나 프록시 대상을 바꾸는 것 검토
- [ ] `npm audit` 취약점 6건 (axios, react-router 등, SDK 업그레이드 전부터 존재)
- [ ] `tsc` 기존 오류 9건 (`@/type/common` 경로 별칭 미설정, 미사용 코드). 빌드에는 영향 없음
- [ ] 쓰지 않는 이미지 정리: `public/img/agreement/galaxy.webp`·`apple.webp`(약 5.6MB), `public/img/pickup/*.svg` 등. `.ait` 크기 약 18MB(한도 100MB)
- [ ] `GradeContainer`가 오류 시 없는 경로 `/err`로 이동

## 참고

- 앱인토스 개발자센터: https://developers-apps-in-toss.toss.im/
- SDK 3.x 마이그레이션: https://developers-apps-in-toss.toss.im/documentation/integration/sdk-3.x.md
- 서버 연동(mTLS·CORS·방화벽): https://developers-apps-in-toss.toss.im/documentation/integration/server-api.md
- 검수 체크리스트(비게임): https://developers-apps-in-toss.toss.im/checklist/app-nongame.md
