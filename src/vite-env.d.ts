/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PURCHASE_API_URL?: string;
  readonly VITE_IMAGE_URL?: string;
  readonly VITE_DEV_USER_ID?: string;
  readonly VITE_JUSO_API_KEY?: string;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
