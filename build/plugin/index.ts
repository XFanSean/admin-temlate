import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import { configHtmlPlugin } from './html'
import { configImageminPlugin } from './imagemin'
import { configCompressPlugin } from './compression'
import { configVisualizerConfig } from './visualizer'
import { autoImportConfig } from './autoImport'
import { unocssConfig } from './unocss'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_LEGACY,
  } = viteEnv
  const plugins: (PluginOption | PluginOption[])[] = [
    vue(),
    configHtmlPlugin(viteEnv, isBuild),
    autoImportConfig(),
    unocssConfig(),
  ]

  // 打包情况下
  if (isBuild) {
    // 开启下使用图片压缩
    VITE_USE_IMAGEMIN && plugins.push(configImageminPlugin())

    // rollup-plugin-gzip
    plugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))

    // 兼容低版本游览器
    VITE_LEGACY && plugins.push(legacy())

    // 项目大小分析
    plugins.push(configVisualizerConfig())
  }

  return plugins
}