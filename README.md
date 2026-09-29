# repercent-toss

Apps in Toss 프로젝트입니다. (`@apps-in-toss/web-framework` SDK 3.x)

## 시작하기

```bash
npm run dev
```

로컬 브라우저에서 바로 확인할 수 있어요. 개발 모드에서는 SDK가 AIT Devtools 목업으로 대체되고, 화면 오른쪽 아래 `AIT` 버튼으로 devtools 패널을 열 수 있어요.

## 환경변수

프로젝트 루트의 `.env`(git에 올라가지 않음)에 설정해요. 값은 빌드 시점에 번들에 들어가므로 `npm run build` 전에 설정돼 있어야 해요.

| 이름                    | 필수 | 설명                                                                                                                                                                                                         |
| ----------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `VITE_JUSO_API_KEY`     | O    | 도로명주소 검색 API 승인키. [주소기반산업지원서비스](https://business.juso.go.kr)에서 검색 API를 신청해 발급받아요. 없으면 주소 검색에서 안내 문구만 보여요.                                                 |
| `VITE_PURCHASE_API_URL` |      | 매입 API 주소. 기본값은 로컬 개발 `/api`(Vite 프록시 → dev 서버), 빌드 `https://purchase.repercent.com`. 개발 서버로 QR 테스트할 땐 `https://dev-common-api-purchase.repercent.com`처럼 HTTPS 주소를 넣어요. |
| `VITE_IMAGE_URL`        |      | 상품 이미지 CDN. 기본값 `https://image.21market.kr`                                                                                                                                                          |
| `VITE_DEV_USER_ID`      |      | 로컬 개발용 리퍼센트 회원 ID. 토스 로그인 연동 전 판매 내역 화면 확인용이에요.                                                                                                                               |

## 배포하기

- 앱인토스 배포 API 키는 [앱인토스 콘솔](https://apps-in-toss.toss.im/) > 워크스페이스 > API 키 > 콘솔 API 키 에서 발급받을 수 있어요.

```bash
npm run build   # vite build && ait build → repercent-toss.ait
npm run deploy
```

서버 CORS 허용 Origin에 미니앱 Origin이 있어야 API를 호출할 수 있어요(appName `repercent-toss` 기준).

- `https://repercent-toss.apps.tossmini.com`, `https://repercent-toss.private-apps.tossmini.com`
- `https://repercent-toss.web.tossmini.com`, `https://repercent-toss.private-web.tossmini.com` (2026-08-25 이전 업로드된 3.x 번들)

SDK 3.x 번들을 출시하면 2.x로 되돌릴 수 없으니 콘솔 QR 테스트를 충분히 한 뒤 출시해 주세요.

## 유용한 링크

- [앱인토스 콘솔](https://apps-in-toss.toss.im/)
- [앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/)
- [SDK 3.x 마이그레이션 가이드](https://developers-apps-in-toss.toss.im/documentation/integration/sdk-3.x.md)
- [앱인토스 개발자 커뮤니티](https://techchat-apps-in-toss.toss.im/)

AI를 사용하시는 경우 [llms.txt](https://developers-apps-in-toss.toss.im/llms.txt)를 확인해보세요.
