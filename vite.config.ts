import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createVitePlugins } from './build/plugin'
import { wrapperEnv } from './build/utils'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  return {
    plugins: createVitePlugins(viteEnv, isBuild),
  }
})
