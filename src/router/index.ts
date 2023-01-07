import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { setupRouterGuard } from './guard'
import { getAppEnvConfig } from '@/utils/env'

const { VITE_PUBLIC_PATH } = getAppEnvConfig()

const routeModuleList: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard/Analysis',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: () => import('@/views/sys/redirect.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/sys/404.vue'),
    meta: {
      title: '页面找不到了',
    },
  },
]
// export const NotFoundPage = {
//   path: '/:pathMatch(.*)*',
//   name: 'NotFound',
//   component: () => import('@/views/sys/404.vue'),
//   meta: {
//     title: '页面找不到了',
//   },
// }

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = ['Login', 'Redirect', 'Root']
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(routeModuleList)

const routers = import.meta.glob('./routes/*.ts', { eager: true })

Object.keys(routers).forEach((key) => {
  const mod = (routers as Recordable)[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

const router = createRouter({
  history: createWebHistory(VITE_PUBLIC_PATH),
  routes: routeModuleList,
})

setupRouterGuard(router)

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
