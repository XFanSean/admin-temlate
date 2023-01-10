import 'uno.css'
import './styles/index.less'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { useUserStore } from '@/store/modules/user'
import { getItem } from '@/utils/cache/storage'

const app = createApp(App)
// 状态管理
app.use(store)

// 解决刷新路由丢失的问题
async function init() {
  const userStore = useUserStore()
  if (getItem('token')) {
    try {
      await userStore.getUserInfo()
      await userStore.getMenuList()
    } catch (e) {
      userStore.resetToken()
    }
  }
}
await init()

// 路由
app.use(router)

app.mount('#app')
