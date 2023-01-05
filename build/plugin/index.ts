import vue from '@vitejs/plugin-vue'
import { configHtmlPlugin } from './html'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const plugins = [vue(), configHtmlPlugin(viteEnv, isBuild)]

  return plugins
}
