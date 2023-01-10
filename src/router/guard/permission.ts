import type { Router } from 'vue-router'
import { getItem } from '@/utils/cache/storage'
import { CacheKeyEnum } from '@/enum/cache'
import { useUserStore } from '@/store/modules/user'

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
        next()
      }
    } else {
      to.path === '/login' ? next() : next('/login')
    }
  })

  // 后置拦截
  // router.afterEach((to, from, failure) => {})
}
