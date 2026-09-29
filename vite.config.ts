import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import aitDevtools from '@apps-in-toss/devtools/unplugin';

export default defineConfig({
  plugins: [aitDevtools.vite(), react()],
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
