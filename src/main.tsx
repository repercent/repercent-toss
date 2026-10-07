import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { syncSafeAreaToCss } from './utils/safeArea';

// 하단 고정 버튼 등이 기기의 하단 시스템 영역에 가리지 않도록 토스 앱의 safe area를 CSS 변수로 둔다.
syncSafeAreaToCss();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
