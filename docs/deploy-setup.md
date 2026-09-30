# 배포 설정 가이드

`.github/workflows/deploy-dev.yml`, `deploy-prod.yml`이 동작하려면 아래 설정이 한 번 필요해요. 흐름은 [README 배포하기](../README.md#배포하기)를 참고해 주세요.

2~4단계는 **저장소 관리자 권한**이 있어야 할 수 있어요 (Settings 탭이 보이는 권한).

## 1. 값 준비

| 이름                | 발급 위치                                                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AIT_API_KEY`       | [앱인토스 콘솔](https://apps-in-toss.toss.im/) → 워크스페이스 선택 → 왼쪽 메뉴 **키** → 발급. 접근 범위는 `repercent-toss` 앱만. 발급할 때만 보이니 바로 복사해 두세요. |
| `VITE_JUSO_API_KEY` | [주소기반산업지원서비스](https://business.juso.go.kr) → API 신청 → 도로명주소 **검색 API** 승인키                                                                       |
| `SLACK_WEBHOOK_URL` | (선택) 배포 결과를 받을 Slack 채널의 Incoming Webhook 주소                                                                                                              |

## 2. Environment `dev`, `prod`

저장소 → **Settings** → **Environments** → **New environment**

| Environment | Deployment branches and tags                                          | Environment secrets                                               |
| ----------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `dev`       | **Selected branches and tags** → 규칙 추가: Ref type `Branch`, `dev`  | `AIT_API_KEY`, `VITE_JUSO_API_KEY`, (선택) `SLACK_WEBHOOK_URL`    |
| `prod`      | **Selected branches and tags** → 규칙 추가: Ref type `Branch`, `main` | 위와 같은 이름. 주소 검색 키를 운영용으로 따로 받았다면 운영용 값 |

- 저장소가 공개라서 배포 브랜치 제한이 필요해요. 다른 브랜치의 workflow는 secret을 읽을 수 없어요.
- (선택) `prod`에 **Required reviewers**로 출시 담당자를 넣으면, main 머지 후 승인해야 업로드가 진행돼요.

## 3. main 브랜치 보호

**Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset**

- Ruleset name `main`, Enforcement status `Active`
- Target branches: **Include by pattern** `main`
- Rules: **Restrict deletions**, **Require a pull request before merging**, **Block force pushes**

## 4. (대신) 명령어로 설정하기

관리자 계정의 `gh`로 2~3단계를 한 번에 할 수 있어요. secret 값은 명령어에 적지 말고 프롬프트에 붙여 넣어요.

```bash
REPO=repercent/repercent-toss

# Environment 생성 + 배포 브랜치 제한 (dev → dev, prod → main)
for pair in dev:dev prod:main; do
  env=${pair%%:*}; branch=${pair##*:}
  gh api -X PUT "repos/$REPO/environments/$env" \
    -F 'deployment_branch_policy[protected_branches]=false' \
    -F 'deployment_branch_policy[custom_branch_policies]=true'
  gh api -X POST "repos/$REPO/environments/$env/deployment-branch-policies" \
    -f name="$branch" -f type=branch
done

# secret 등록 (값은 프롬프트로 입력)
for env in dev prod; do
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

## 5. 확인

1. dev에 push되면 **Actions → Deploy to Apps in Toss (Dev)** 가 실행돼요. 다시 돌릴 땐 **Run workflow** → `dev`.
2. 성공하면 실행 **Summary**에 테스트 스킴 `intoss-private://appsintoss?_deploymentId=…`이 나와요.
3. 폰의 토스 앱에서 스킴을 열거나 콘솔 **테스트하기**의 QR을 찍어요. 토스 앱에 로그인한 워크스페이스 멤버(만 19세 이상)만 열 수 있어요. 멤버 초대는 콘솔 **멤버** → **초대하기**.

| 증상                       | 확인할 것                                                  |
| -------------------------- | ---------------------------------------------------------- |
| "secret을 설정해야 합니다" | Environment 이름(`dev`/`prod`)과 secret 이름 철자          |
| 실행이 대기하다 거부됨     | Environment의 배포 브랜치 규칙이 `dev`/`main`인지          |
| `ait deploy` 단계 실패     | API 키의 앱 접근 범위, 콘솔에 `repercent-toss` 앱이 있는지 |
