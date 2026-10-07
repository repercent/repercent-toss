# 앱인토스 출시 준비 현황

2026-10-06 기준 (처음 작성 2026-09-29). Figma `App-in-Toss` 파일의 `앱인토스` 섹션을 기준으로 구현했고, 출시까지 남은 일을 담당별로 정리했어요.

## 한눈에 보기

| 구분                                            | 상태                                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Figma 플로우 화면 구현                          | 완료                                                                                       |
| SDK 3.x 마이그레이션 (2.6.1 → 3.6.0)            | 완료                                                                                       |
| 우편번호 iframe 위젯 제거 → 도로명주소 API 검색 | 완료. 승인키 발급·dev 등록 완료, 토스 앱 실기기 확인 남음                                  |
| API 주소를 빌드용 HTTPS 주소로 전환             | 완료                                                                                       |
| purchase 서버 CORS에 미니앱 Origin 추가         | dev 반영 (repercent-common-api#825), main 반영 필요                                        |
| 토스 로그인 연동                                | 앱 구현 완료. auth 서버 repercent-auth#63 미병합, 콘솔 설정 필요 ([설계](./toss-login.md)) |
| 배포 키                                         | dev: AWS Secrets Manager로 전환 완료, 앱인토스 API 키 입력 남음. prod: 시작 전             |
| 내비게이션 바(헤더)                             | 설정·신청 완료 화면 처리 완료, QR 확인 남음 ([아래](#7-내비게이션-바헤더))                 |
| 사업자 등록 · 콘솔 앱 등록 · 검수 · 출시        | 시작 전 ([아래](#6-사업자-등록--콘솔-앱-등록--검수--출시))                                 |

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
  - `https://repercent-dev.apps.tossmini.com`, `https://repercent-dev.private-apps.tossmini.com`
  - `https://repercent-dev.web.tossmini.com`, `https://repercent-dev.private-web.tossmini.com`
- [ ] #825 머지 → dev 배포 → QR 테스트 → main 대상 PR · 배포
- 콘솔 appName은 `repercent-dev`로 등록했어요(appName에 `toss`를 넣을 수 없어서). Origin과 `apps-in-toss.config.ts`가 이 값과 같아야 하고, appName은 등록 후 바꿀 수 없어요.

### 3. 도로명주소 API 승인키 — 출시 필수

앱인토스는 iframe을 쓸 수 없어서(YouTube만 예외) 다음 우편번호 위젯 대신 도로명주소 API를 앱에서 직접 불러요. 그래서 승인키가 필요해요.

- [x] [business.juso.go.kr](https://business.juso.go.kr)에서 검색 API 승인키 발급
- [x] AWS Secrets Manager `repercent/toss/dev/deploy`의 `VITE_JUSO_API_KEY`에 등록. dev 배포와 로컬 `pnpm dev`가 여기서 읽어요 ([배포 설정 가이드](./deploy-setup.md))
- [x] 로컬에서 실제 검색 확인 (2026-10-06, API 응답 `정상`)
- [ ] 운영에 쓸 키 확인 (개발키·운영키 구분, 운영키는 서비스 URL 등록) 후 prod 배포 키에 등록
- [ ] 토스 앱(QR)에서 실제 검색 확인
- 키는 빌드 결과물에 그대로 들어가요. 앱에서 직접 부르는 구조라 피할 수 없고, 숨기려면 서버가 대신 호출해야 해요. git·채팅·명령어 인자에는 적지 않아요.

### 4. 서버 인증 적용 — 출시 전 권장

- [ ] 토스 로그인 연동 후 매입 API 요청에 토큰 인증 적용 (세부 점검 항목은 백엔드 내부 문서에서 관리)

### 5. 기획 · 디자인 확인

- [x] 서비스 알아보기 후기를 웹 판매하기 화면과 같은 5건으로 교체. 이름은 가운데 글자를 가려요 (`src/constant/service.ts`)
- [x] 서비스 알아보기 가격 비교를 웹과 같은 방식으로 계산: 추천 모델 시세와 A사·B사 시세(80~95%) (`src/hooks/usePurchaseHero.ts`)
- [ ] 입고(200) 상태 취소 버튼: 시안엔 있지만 서버가 막아서 뺐어요. 정책 확인
- [ ] 111·112·140 상태 취소: 운영 서버는 허용, dev 서버 정책은 차단. 배포되면 앱 버튼도 맞춰야 해요.
- [ ] 로그아웃 방법 단계 번호를 전체에 붙였어요(시안은 1~3만). 확인
- [ ] 계좌 입력·취소 사유·확인 창은 시안이 없어 웹과 같은 문구로 구현했어요. 필요하면 시안 추가

### 6. 사업자 등록 · 콘솔 앱 등록 · 검수 · 출시

**사업자 등록 (토스 로그인 필수 조건)**

토스 로그인·토스페이·인앱 결제·프로모션 등은 사업자 등록이 있어야 써요. 이 앱은 토스 로그인을 쓰므로 회사 사업자로 등록해요.

- [ ] 콘솔 → 워크스페이스 **내 정보**에서 사업자 등록 (검토 영업일 1~2일)
  - 부가가치세 면세사업자는 등록할 수 없어요.
  - 사업자등록증 업종과 미니앱 서비스 업종(중고폰 매입)이 같아야 해요.
  - 법인은 발급일 3개월 이내 사업자등기부등본이 필요해요.
- 워크스페이스는 **사업자당 1개**이고, 만든 사람이 **대표관리자**가 돼요. 워크스페이스·앱을 다른 사업자로 옮길 수 있는지는 문서에 없어서, 처음부터 회사 사업자·회사 담당자 계정으로 만들어요. 이미 개인 기준으로 만들었다면 앱 등록 전에 채널톡에 문의해요.

**앱 정보 (내비게이션 바 제목·아이콘)**

- [ ] 앱 이름 `리퍼센트`: 토스 앱과 상단 내비게이션 바 제목에 보여요. 나중에 수정할 수 있어요.
- [ ] 로고: 비게임 앱은 상단 내비게이션 바 아이콘으로도 쓰여요.
  - 규격: 600×600px PNG, 정사각형(둥근 모서리 금지), 배경색 필수(투명 금지), 토스 아이콘·리소스 사용·가공 금지
  - 후보: [`docs/assets/console-logo-600.png`](./assets/console-logo-600.png). 웹(repercent-client) 앱 아이콘 `public/img/logo/app_icon.png`(1024×1024)을 흰 배경 600×600, 알파 없는 PNG로 줄인 거예요. 18px 헤더 아이콘에서 글자가 작아 보일 수 있으니 여백을 줄인 버전이 필요한지 디자인에 확인해요.
  - Figma 헤더의 로고(파란 바탕 집 모양 아이콘, 29개 화면 공통)는 실제 리퍼센트 로고가 아닌 시안 자리표시로 보여요. 참고 캡처: [`docs/assets/figma-header.png`](./assets/figma-header.png)
- [x] appName `repercent-dev` 등록 (`toss`가 들어간 이름은 쓸 수 없음). 코드(`apps-in-toss.config.ts`)·서버 CORS Origin이 같아야 하고, **등록 후 바꿀 수 없어요.**
- [ ] 영문명(15자 이내), 카테고리. 앱 정보 검토는 영업일 3~7일이에요.
- [ ] 중고폰 매입이 어떤 카테고리·정책에 해당하는지 채널톡으로 사전 문의 (중고거래는 별도 서류 대상)
- [ ] `pnpm build` → 콘솔 업로드(또는 `pnpm run deploy`) → QR로 토스 앱 테스트 → 검토 요청 → 출시
- [ ] 검수 체크: 외부 링크(채널톡 문의, CJ 배송조회)가 "서비스에 꼭 필요한 링크"로 인정되는지 확인
- SDK 3.x 번들은 출시 후 2.x로 되돌릴 수 없어요.

### 7. 내비게이션 바(헤더)

Figma 맨 위 줄(`<` · 아이콘 · 리퍼센트 · `···` · `X`)은 앱인토스 SDK가 그리는 내비게이션 바예요. 앱이 직접 그리지 않아요(지금 코드도 자체 헤더 없음).

| 영역                                   | 정하는 곳                                                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 아이콘 · 제목                          | 콘솔 앱 정보 (6번). 자체 로고 추가는 허용되지 않아요                                                               |
| `···` 더보기 · `X` 닫기                | 토스 고정 (문의·공유·권한 등 기본 메뉴 포함)                                                                       |
| 뒤로 · 홈 버튼, 제목 표시, 배경 · 테마 | 앱: `apps-in-toss.config.ts`의 `navigationBar`(처음 값), `NavigationBar.setOptions`(화면별)                        |
| 뒤로가기 처리                          | 앱: `graniteEvent.addEventListener('backEvent', …)`. 등록하면 기본 뒤로가기가 막히고, 화면을 떠날 때 해제해야 해요 |

시안에 맞추려면:

- [x] `apps-in-toss.config.ts`의 `navigationBar`를 시안 컴포넌트 속성(`Back Button=True`, `Home=False`, `Title Area=True`, `Theme=Light`)과 같게 설정
- [x] 신청 완료 화면(`/complete`, 시안 `Back Button=False`): `useHideBackButton`으로 뒤로 버튼을 숨기고(떠날 때 되돌림), 시스템 뒤로가기는 `backEvent`로 받아 닫기와 같이 메인으로 보내요.
- [ ] QR 테스트로 확인: 첫 화면에서 뒤로를 누를 때 동작(문서에 없음), `NavigationBar.setOptions` 지원 토스 앱 버전(문서에 없음 → 호출 실패해도 화면은 계속 동작하게)

### 8. 배포 키

- [x] dev: workflow가 GitHub OIDC로 AWS 역할 `GitHubActions-dev`를 받아 Secrets Manager `repercent/toss/dev/deploy`를 읽어요 (#12). 주소 키·Slack 웹훅 등록, OIDC·읽기·Slack 알림 동작 확인
- [ ] dev: 앱인토스 콘솔에서 API 키 발급 → `AIT_API_KEY` 등록 → **Run workflow**로 업로드 확인
- [ ] prod: dev와 같은 방식으로 전환 (`GitHubActions-prod`에 읽기 권한 추가 → `repercent/toss/prod/deploy`에 값 등록 → `deploy-prod.yml` 수정). 그 전까지 main 병합 시 prod workflow는 설정 확인 단계에서 멈춰요(업로드 없음).

### 9. 기술 부채 — 출시 후 가능

- [x] 로컬 개발 프록시(`vite.config.ts`)가 운영 purchase 서버를 가리키던 문제 → dev 서버로 변경
- [ ] `pnpm audit` 취약점 6건 (axios, react-router 등, SDK 업그레이드 전부터 존재)
- [ ] `tsc` 기존 오류 9건 (`@/type/common` 경로 별칭 미설정, 미사용 코드). 빌드에는 영향 없음
- [ ] 쓰지 않는 이미지 정리: `public/img/agreement/galaxy.webp`·`apple.webp`(약 5.6MB), `public/img/pickup/*.svg` 등. `.ait` 크기 약 18MB(한도 100MB)
- [ ] `GradeContainer`가 오류 시 없는 경로 `/err`로 이동

## 참고

- 앱인토스 개발자센터: https://developers-apps-in-toss.toss.im/
- SDK 3.x 마이그레이션: https://developers-apps-in-toss.toss.im/documentation/integration/sdk-3.x.md
- 서버 연동(mTLS·CORS·방화벽): https://developers-apps-in-toss.toss.im/documentation/integration/server-api.md
- 검수 체크리스트(비게임): https://developers-apps-in-toss.toss.im/checklist/app-nongame.md
