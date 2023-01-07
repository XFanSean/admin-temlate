import type { Router } from 'vue-router'
import { getAppEnvConfig } from '@/utils/env'
import { createPermissionGuard } from './permission'

const { VITE_GLOB_APP_TITLE } = getAppEnvConfig()

export function setupRouterGuard(router: Router) {
  createDomTitle(router)
  createPermissionGuard(router)
}

function createDomTitle(router: Router) {
  router.afterEach((to, from, next) => {
    document.title = VITE_GLOB_APP_TITLE + '-' + to.meta.title
  })
}
