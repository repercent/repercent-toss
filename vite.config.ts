import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import aitDevtools from '@apps-in-toss/devtools/unplugin';

export default defineConfig({
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
      },
    },
  },
});
