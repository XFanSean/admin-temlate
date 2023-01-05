declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_PORT: number
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
  VITE_GLOB_APP_TITLE: string
  VITE_DROP_CONSOLE: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_USE_IMAGEMIN: boolean
  VITE_GENERATE_UI: string
  VITE_LEGACY: boolean
  VITE_GLOB_DOMAIN_URL: string
  VITE_GLOB_API_URL: string
  VITE_GLOB_API_URL_PREFIX: string
}
