/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // thêm các biến khác của bạn ở đây nếu có
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}