import type { Router } from 'vue-router'
import nProgress from 'nprogress'

export function createProgressGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    nProgress.start()
    next()
  })

  router.afterEach(() => {
    nProgress.done()
  })
}
