import type { Router } from 'vue-router'
import { getItem } from '@/utils/cache/storage'
import { CacheKeyEnum } from '@/enum/cache'
import { useUserStore } from '@/store/modules/user'
import { resetRouter } from '../index'

export function createPermissionGuard(router: Router) {
  // 前置拦截
  router.beforeEach(async (to, from, next) => {
    const hasToken = getItem(CacheKeyEnum.TOKEN)
    // 有token
    if (hasToken) {
      if (to.path === '/login') {
        next('/')
      } else {
        const userStore = useUserStore()
        try {
          if (!userStore.isAddRoutesComplete) {
            await userStore.getUserInfo()
            await userStore.getMenuList()
          }
          next()
        } catch (e) {
          userStore.resetToken()
          resetRouter()
          next('/login')
        }
      }
    } else {
      to.path === '/login' ? next() : next('/login')
    }
  })

  // 后置拦截
  // router.afterEach((to, from, failure) => {})
}
