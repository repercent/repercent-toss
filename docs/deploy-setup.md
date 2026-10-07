# 배포 설정 가이드

`.github/workflows/deploy-dev.yml`, `deploy-prod.yml`이 동작하려면 아래 설정이 한 번 필요해요. 흐름은 [README 배포하기](../README.md#배포하기)를 참고해 주세요.

- **dev**: 키를 AWS Secrets Manager에서 읽어요 (2단계). GitHub 관리자 권한이 필요 없어요.
- **prod**: 아직 GitHub Environment `prod`의 secret을 읽어요 (3~5단계, **저장소 관리자 권한** 필요).

## 1. 값 준비

| 이름                | 발급 위치                                                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AIT_API_KEY`       | [앱인토스 콘솔](https://apps-in-toss.toss.im/) → 워크스페이스 선택 → 왼쪽 메뉴 **키** → 발급. 접근 범위는 `repercent-dev` 앱만. 발급할 때만 보이니 바로 복사해 두세요. |
| `VITE_JUSO_API_KEY` | [주소기반산업지원서비스](https://business.juso.go.kr) → API 신청 → 도로명주소 **검색 API** 승인키                                                                      |
| `SLACK_WEBHOOK_URL` | (선택) 배포 결과를 받을 Slack 채널의 Incoming Webhook 주소                                                                                                             |

## 2. dev: AWS Secrets Manager

다른 repercent 저장소와 같은 방식이에요. workflow가 GitHub OIDC로 IAM 역할 `GitHubActions-dev`를 받고, 그 역할로 secret을 읽어요.

| 항목      | 값                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| secret    | `repercent/toss/dev/deploy` (ap-northeast-2), JSON 키 `AIT_API_KEY`, `VITE_JUSO_API_KEY`, `SLACK_WEBHOOK_URL` |
| 읽기 권한 | `GitHubActions-dev`의 인라인 정책 `RepercentTossDeploySecretRead-dev` (이 secret의 `GetSecretValue`만)        |
| 신뢰 범위 | 역할 신뢰 정책 `repo:repercent/*:ref:refs/heads/dev` → dev 브랜치 push만 역할을 받을 수 있어요                |

값 넣기: AWS 콘솔 → **Secrets Manager** → `repercent/toss/dev/deploy` → **보안 암호 값 검색** → **편집** → 키/값에서 값만 바꾸고 저장해요. `SLACK_WEBHOOK_URL`은 비워 두면 알림만 건너뛰어요.

- 값을 채팅·명령어 인자·커밋에 적지 마세요. 저장소가 공개라 workflow 로그도 공개인데, 읽은 값은 로그에서 가려져요.
- job에 `environment:`를 넣지 마세요. 넣으면 OIDC 토큰의 sub가 `environment:dev`로 바뀌어 역할을 받지 못해요.
- 로컬 `pnpm dev`도 이 secret에서 `VITE_JUSO_API_KEY`를 읽어요. 로컬 AWS 자격 증명이 필요해요 ([README 환경변수](../README.md#환경변수)).

## 3. Environment `prod`

저장소 → **Settings** → **Environments** → **New environment**

| Environment | Deployment branches and tags                                          | Environment secrets                                                                                               |
| ----------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `prod`      | **Selected branches and tags** → 규칙 추가: Ref type `Branch`, `main` | `AIT_API_KEY`, `VITE_JUSO_API_KEY`, (선택) `SLACK_WEBHOOK_URL`. 주소 검색 키를 운영용으로 따로 받았다면 운영용 값 |

- 저장소가 공개라서 배포 브랜치 제한이 필요해요. 다른 브랜치의 workflow는 secret을 읽을 수 없어요.
- (선택) `prod`에 **Required reviewers**로 출시 담당자를 넣으면, main 머지 후 승인해야 업로드가 진행돼요.

## 4. main 브랜치 보호

**Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset**

- Ruleset name `main`, Enforcement status `Active`
- Target branches: **Include by pattern** `main`
- Rules: **Restrict deletions**, **Require a pull request before merging**, **Block force pushes**

## 5. (대신) 명령어로 설정하기

관리자 계정의 `gh`로 3~4단계를 한 번에 할 수 있어요. secret 값은 명령어에 적지 말고 프롬프트에 붙여 넣어요.

```bash
REPO=repercent/repercent-toss

# Environment 생성 + 배포 브랜치 제한 (prod → main)
for pair in prod:main; do
  env=${pair%%:*}; branch=${pair##*:}
  gh api -X PUT "repos/$REPO/environments/$env" \
    -F 'deployment_branch_policy[protected_branches]=false' \
    -F 'deployment_branch_policy[custom_branch_policies]=true'
  gh api -X POST "repos/$REPO/environments/$env/deployment-branch-policies" \
    -f name="$branch" -f type=branch
done

# secret 등록 (값은 프롬프트로 입력)
for env in prod; do
  gh secret set AIT_API_KEY --env "$env" -R "$REPO"
  gh secret set VITE_JUSO_API_KEY --env "$env" -R "$REPO"
done

# main 브랜치 보호
gh api -X POST "repos/$REPO/rulesets" --input - <<'EOF'
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
EOF
```

## 6. 확인

1. dev에 push되면 **Actions → Deploy to Apps in Toss (Dev)** 가 실행돼요. 다시 돌릴 땐 **Run workflow** → `dev`.
2. 성공하면 실행 **Summary**에 테스트 스킴 `intoss-private://appsintoss?_deploymentId=…`이 나와요.
3. 폰의 토스 앱에서 스킴을 열거나 콘솔 **테스트하기**의 QR을 찍어요. 토스 앱에 로그인한 워크스페이스 멤버(만 19세 이상)만 열 수 있어요. 멤버 초대는 콘솔 **멤버** → **초대하기**.

| 증상                                   | 확인할 것                                                  |
| -------------------------------------- | ---------------------------------------------------------- |
| "값을 넣어야 합니다" (dev)             | Secrets Manager `repercent/toss/dev/deploy`의 키 철자와 값 |
| `Configure AWS credentials` 실패 (dev) | job에 `environment:`가 없는지, dev 브랜치에서 실행했는지   |
| "secret을 설정해야 합니다" (prod)      | Environment 이름 `prod`와 secret 이름 철자                 |
| 실행이 대기하다 거부됨 (prod)          | Environment `prod`의 배포 브랜치 규칙이 `main`인지         |
| `ait deploy` 단계 실패                 | API 키의 앱 접근 범위, 콘솔에 `repercent-dev` 앱이 있는지  |
