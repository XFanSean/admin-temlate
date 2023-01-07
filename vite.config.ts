import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { createVitePlugins } from './build/plugin'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/proxy'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PROXY } = viteEnv

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'types'),
      },
    },
    server: {
      port: VITE_PORT,
      // https: true,
      proxy: createProxy(VITE_PROXY),
      hmr: true,
      // host: 'lo',
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 此处也可设置直角、边框色、字体大小等
            // 'primary-color': '#0F48B3',
            // 'link-color': '#073894',
            // 'border-radius-base': '2px',
            // 配合configProvider组件使用
            // '@ant-prefix': 'platform-ant',
          },
          sourceMap: false,
          javascriptEnabled: true,
        },
      },
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'dist',
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: mode === 'production',
          // 生产环境去除console.log
          drop_console: mode === 'production',
        },
      },
    },
  }
})
