import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: '21market',
  brand: {
    primaryColor: '#004EDB',
  },
  // Figma `Top Navigation - AppInToss` 속성과 같게: 뒤로 버튼·제목(콘솔 앱 이름·로고) 표시, 홈 버튼 없음, 라이트 테마.
  // 화면별 예외(신청 완료의 뒤로 버튼 숨김)는 useHideBackButton에서 바꾼다.
  navigationBar: {
    withBackButton: true,
    withHomeButton: false,
    withTitle: true,
    theme: 'light',
  },
  permissions: [],
  webBundleDir: 'dist',
});
