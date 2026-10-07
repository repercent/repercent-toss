# 배포 설정 가이드

`.github/workflows/deploy-dev.yml`, `deploy-prod.yml`이 동작하려면 아래 설정이 한 번 필요해요. 흐름은 [README 배포하기](../README.md#배포하기)를 참고해 주세요.

- dev·prod 모두 키를 AWS Secrets Manager에서 읽어요 (2단계). GitHub 관리자 권한이 필요 없어요.
- main 브랜치 보호(3단계)만 **저장소 관리자 권한**이 필요해요.

## 1. 값 준비

| 이름                | 발급 위치                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AIT_API_KEY`       | [앱인토스 콘솔](https://apps-in-toss.toss.im/) → 워크스페이스 선택 → 왼쪽 메뉴 **키** → 발급. 접근 범위는 `21market` 앱만. 발급할 때만 보이니 바로 복사해 두세요.               |
| `VITE_JUSO_API_KEY` | [주소기반산업지원서비스](https://business.juso.go.kr) → API 신청 → 도로명주소 **검색 API** 승인키. dev는 개발용, prod는 운영용(서비스 URL `https://21market.apps.tossmini.com`) |
| `SLACK_WEBHOOK_URL` | (선택) 배포 결과를 받을 Slack 채널의 Incoming Webhook 주소                                                                                                                      |

## 2. AWS Secrets Manager (dev·prod)

다른 repercent 저장소와 같은 방식이에요. workflow가 GitHub OIDC로 IAM 역할을 받고, 그 역할로 secret을 읽어요.

| 항목      | dev (`deploy-dev.yml`)                                                           | prod (`deploy-prod.yml`)                                                          |
| --------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| secret    | `repercent/toss/dev/deploy`                                                      | `repercent/toss/prod/deploy`                                                      |
| 역할      | `GitHubActions-dev`                                                              | `GitHubActions-prod`                                                              |
| 읽기 권한 | 인라인 정책 `RepercentTossDeploySecretRead-dev` (이 secret의 `GetSecretValue`만) | 인라인 정책 `RepercentTossDeploySecretRead-prod` (이 secret의 `GetSecretValue`만) |
| 신뢰 범위 | `repo:repercent/*:ref:refs/heads/dev` → dev push만                               | `repo:repercent/*:ref:refs/heads/main` → main push만                              |

두 secret 모두 리전 ap-northeast-2, JSON 키 `AIT_API_KEY`, `VITE_JUSO_API_KEY`, `SLACK_WEBHOOK_URL`이에요.

값 넣기: AWS 콘솔 → **Secrets Manager** → secret 선택 → **보안 암호 값 검색** → **편집** → 키/값에서 값만 바꾸고 저장해요. `SLACK_WEBHOOK_URL`은 비워 두면 알림만 건너뛰어요.

- 값을 채팅·명령어 인자·커밋에 적지 마세요. 저장소가 공개라 workflow 로그도 공개인데, 읽은 값은 로그에서 가려져요.
- job에 `environment:`를 넣지 마세요. 넣으면 OIDC 토큰의 sub가 `environment:dev`/`environment:prod`로 바뀌어 역할을 받지 못해요.
- 로컬 `pnpm dev`도 dev secret에서 `VITE_JUSO_API_KEY`를 읽어요. 로컬 AWS 자격 증명이 필요해요 ([README 환경변수](../README.md#환경변수)).

## 3. main 브랜치 보호

**Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset**

- Ruleset name `main`, Enforcement status `Active`
- Target branches: **Include by pattern** `main`
- Rules: **Restrict deletions**, **Require a pull request before merging**, **Block force pushes**

관리자 계정의 `gh`로 하려면:

```bash
gh api -X POST "repos/repercent/repercent-toss/rulesets" --input - <<'JSON'
{
  "name": "main",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["refs/heads/main"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": false
      }
    }
  ]
}
JSON
```

## 4. 확인

1. dev에 push되면 **Actions → Deploy to Apps in Toss (Dev)**, main에 push되면 **(Prod)** 가 실행돼요. 다시 돌릴 땐 **Run workflow** → 브랜치 선택.
2. 성공하면 실행 **Summary**에 테스트 스킴 `intoss-private://appsintoss?_deploymentId=…`이 나와요.
3. 폰의 토스 앱에서 스킴을 열거나 콘솔 **테스트하기**의 QR을 찍어요. 토스 앱에 로그인한 워크스페이스 멤버(만 19세 이상)만 열 수 있어요. 멤버 초대는 콘솔 **멤버** → **초대하기**.

| 증상                             | 확인할 것                                                            |
| -------------------------------- | -------------------------------------------------------------------- |
| "값을 넣어야 합니다"             | Secrets Manager `repercent/toss/{dev,prod}/deploy`의 키 철자와 값    |
| `Configure AWS credentials` 실패 | job에 `environment:`가 없는지, dev/main 브랜치에서 실행했는지        |
| `Load deploy secrets` 실패       | 역할 인라인 정책 `RepercentTossDeploySecretRead-{dev,prod}`이 있는지 |
| `ait deploy` 단계 실패           | API 키의 앱 접근 범위, 콘솔에 `21market` 앱이 있는지                 |
