import { openURL } from '@apps-in-toss/web-framework';

/** 토스 앱 WebView 안에서 실행 중인지 여부 */
export const isTossApp = () => typeof window !== 'undefined' && 'ReactNativeWebView' in window;

/** 외부 링크 열기 (토스 앱에서는 브리지로, 브라우저에서는 새 창으로) */
export const openExternalURL = (url: string) => {
  if (isTossApp()) {
    openURL(url);
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
};
