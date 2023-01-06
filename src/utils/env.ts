export function getAppEnvConfig() {
  const ENV = import.meta.env as unknown as GlobEnvConfig

  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_API_URL_PREFIX } = ENV

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
  }
}
