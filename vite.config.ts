import { execFileSync } from 'node:child_process';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

import aitDevtools from '@apps-in-toss/devtools/unplugin';

/** CI(deploy-dev.yml)와 같은 dev 배포 키. 로컬 개발 서버도 여기서 주소 검색 키를 읽는다. */
const DEV_SECRET_ID = 'repercent/toss/dev/deploy';

/**
 * 개발 서버를 띄울 때 주소 검색 키가 없으면 AWS Secrets Manager(dev)에서 읽어 온다.
 * 환경변수나 .env*에 이미 있으면 그 값을 쓴다. 로컬 AWS 자격 증명이 없으면 경고만 남기고
 * 키 없이 뜬다(주소 검색에 안내 문구만 보임). 빌드는 CI가 키를 넣어 주므로 여기서 읽지 않는다.
 */
const loadDevJusoKey = (mode: string) => {
  if (loadEnv(mode, process.cwd(), 'VITE_').VITE_JUSO_API_KEY) return;

  try {
    const secret = execFileSync(
      'aws',
      [
        'secretsmanager',
        'get-secret-value',
        '--region',
        'ap-northeast-2',
        '--secret-id',
        DEV_SECRET_ID,
        '--query',
        'SecretString',
        '--output',
        'text',
      ],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 10_000 }
    );
    const key = (JSON.parse(secret) as { VITE_JUSO_API_KEY?: string }).VITE_JUSO_API_KEY;
    if (key) {
      // Vite는 process.env의 VITE_ 값을 import.meta.env로 노출한다.
      process.env.VITE_JUSO_API_KEY = key;
      return;
    }
    console.warn(
      `[dev] ${DEV_SECRET_ID}의 VITE_JUSO_API_KEY가 비어 있어요. 주소 검색 없이 시작해요.`
    );
  } catch {
    console.warn(
      `[dev] AWS Secrets Manager ${DEV_SECRET_ID}를 읽지 못했어요(aws CLI·자격 증명 확인). 주소 검색 없이 시작해요.`
    );
  }
};

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') loadDevJusoKey(mode);

  return {
    plugins: [aitDevtools.vite(), react()],
    build: {
      // Vite 8 기본값(Safari·iOS 16.4)은 구형 iOS의 토스 앱 WebView를 빼므로 Vite 6 기본값을 유지한다.
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    },
    server: {
      proxy: {
        // 로컬 개발은 dev 서버 (토스 로그인도 dev auth 서버를 써서 회원 ID가 같은 환경이어야 함)
        '/api': {
          target: 'https://dev-common-api-purchase.repercent.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          // 브라우저는 POST에 Origin(localhost:5173)을 붙이고, 서버 CORS 허용 목록에는 이 주소가 없어 403이 난다.
          // 프록시는 서버 간 요청이라 CORS가 필요 없으므로 Origin을 빼고 넘긴다.
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => proxyReq.removeHeader('origin'));
          },
        },
      },
    },
  };
});
