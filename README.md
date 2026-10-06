# repercent-toss

Apps in Toss 프로젝트입니다. (`@apps-in-toss/web-framework` SDK 3.x)

## 시작하기

Node.js 24(`.nvmrc`)와 pnpm이 필요해요. pnpm이 없으면 `corepack enable`로 켜요. 버전은 `package.json`의 `packageManager`를 따라요.

```bash
pnpm install
pnpm dev
```

로컬 브라우저에서 바로 확인할 수 있어요. 개발 모드에서는 SDK가 AIT Devtools 목업으로 대체되고, 화면 오른쪽 아래 `AIT` 버튼으로 devtools 패널을 열 수 있어요.

## 환경변수

프로젝트 루트의 `.env`(git에 올라가지 않음)에 설정해요. 값은 빌드 시점에 번들에 들어가므로 `pnpm build` 전에 설정돼 있어야 해요.

| 이름                    | 필수 | 설명                                                                                                                                                                                                         |
| ----------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `VITE_JUSO_API_KEY`     | O    | 도로명주소 검색 API 승인키. [주소기반산업지원서비스](https://business.juso.go.kr)에서 검색 API를 신청해 발급받아요. 없으면 주소 검색에서 안내 문구만 보여요.                                                 |
| `VITE_PURCHASE_API_URL` |      | 매입 API 주소. 기본값은 로컬 개발 `/api`(Vite 프록시 → dev 서버), 빌드 `https://purchase.repercent.com`. 개발 서버로 QR 테스트할 땐 `https://dev-common-api-purchase.repercent.com`처럼 HTTPS 주소를 넣어요. |
| `VITE_IMAGE_URL`        |      | 상품 이미지 CDN. 기본값 `https://image.21market.kr`                                                                                                                                                          |
| `VITE_AUTH_API_URL`     |      | 토스 로그인 auth 서버 주소. 기본값은 로컬 개발 `https://dev-auth.repercent.com`, 빌드 `https://auth.repercent.com`.                                                                                          |

## 배포하기

작업 브랜치 → `dev` → `main` 순서로 병합하고, 브랜치에 push되면 GitHub Actions가 번들을 빌드해 앱인토스 콘솔에 올려요.

| 브랜치                      | workflow                            | 번들이 호출하는 서버                                                     |
| --------------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| `dev`                       | `.github/workflows/deploy-dev.yml`  | 개발 (`dev-common-api-purchase.repercent.com`, `dev-auth.repercent.com`) |
| `main` (dev → main PR 머지) | `.github/workflows/deploy-prod.yml` | 운영 (`purchase.repercent.com`, `auth.repercent.com`)                    |

- 업로드만 하고 출시하지는 않아요. 실행 결과 요약(Slack을 설정했다면 Slack에도)에 테스트 스킴 `intoss-private://appsintoss?_deploymentId=…`이 남고, 콘솔 '테스트하기'의 QR로도 열 수 있어요. 토스 앱에 로그인한 워크스페이스 멤버(만 19세 이상)만 열 수 있어요.
- 출시는 콘솔에서 **main 번들**(업로드 메모 `prod <커밋>`)로 검토를 요청하고, 승인되면 '출시하기'를 눌러요. dev 번들(메모 `dev <커밋>`)은 개발 서버를 호출하니 검토 요청에 쓰면 안 돼요.

배포 키는 아래 이름으로 넣어요. dev는 AWS Secrets Manager `repercent/toss/dev/deploy`(JSON)에서 GitHub OIDC로 읽고, prod는 아직 GitHub Environment `prod`의 secret을 읽어요. 자세한 방법은 [배포 설정 가이드](docs/deploy-setup.md)를 참고해 주세요.

| 이름                | 필수 | 설명                                                                                              |
| ------------------- | ---- | ------------------------------------------------------------------------------------------------- |
| `AIT_API_KEY`       | O    | 앱인토스 API 키. [앱인토스 콘솔](https://apps-in-toss.toss.im/) > 워크스페이스 > 키에서 발급해요. |
| `VITE_JUSO_API_KEY` | O    | 도로명주소 검색 API 승인키 (위 환경변수 참고)                                                     |
| `SLACK_WEBHOOK_URL` |      | 배포 결과 알림. 없으면 알림만 건너뛰어요.                                                         |

로컬에서 직접 올릴 수도 있어요. `.env`에 API 주소가 없으면 운영 주소로 빌드되니 대상 서버를 확인해 주세요.

```bash
pnpm build       # vite build && ait build → repercent-toss.ait
pnpm run deploy  # ait deploy (`pnpm deploy`는 pnpm 내장 명령이라 run을 붙여요)
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
