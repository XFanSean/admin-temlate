import { defineStore } from 'pinia'
import type { PasswordLoginParams, PhoneNumberLoginParams } from '#/user'
import { getPermissionByToken, queryUserInfo, userPasswordLogin } from '@/api/user'
import { removeItem, setItem, setSessionStorageItem } from '@/utils/cache/storage'
import { useRoute, useRouter } from 'vue-router'
import { CacheKeyEnum } from '@/enum/cache'
import {
  addSlashToRouteComponent,
  flatMultiLevelRoutes,
  transformObjToRoute,
} from '@/router/helper/routerHelper'
import { filter, transformRouteToMenu } from '@/router/helper/menuHelper'
import { AppRouteRecordRaw } from '@/router/types'
import router from '@/router'

type LoginTypes = 'password' | 'phoneNumber'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {},
    menuList: [] as any,
    isAddRoutesComplete: false,
  }),
  actions: {
    // 登录
    async userLogin(type: LoginTypes, data: PhoneNumberLoginParams | PasswordLoginParams) {
      try {
        let token = ''
        if (type === 'password') {
          const res = await userPasswordLogin(data as PasswordLoginParams)
          token = res.token
        }
        if (type === 'phoneNumber') {
          // const res = await
        }
        this.saveToken(token)
        await this.getUserInfo()
        await this.getMenuList()
      } catch (e) {
        return Promise.reject()
      }
    },
    // 保存token
    saveToken(token: string) {
      this.token = token
      setItem(CacheKeyEnum.TOKEN, token)
    },
    // 获取用户信息
    async getUserInfo() {
      const res = await queryUserInfo()
      this.userInfo = res.userInfo
    },
    // token过期或者推出登录
    resetToken() {
      removeItem(CacheKeyEnum.TOKEN)
      const { push } = useRouter()
      const { path } = useRoute()
      push({
        path: '/login',
        query: { redirectTo: path },
      })
    },
    // 获取用户权限表
    async getMenuList() {
      const res = await getPermissionByToken()
      let routeList = res.menu
      // 组件地址前加斜杠处理  author: lsq date:2021-09-08
      routeList = addSlashToRouteComponent(routeList)
      // 动态引入组件
      routeList = transformObjToRoute(routeList)
      // 构建后台路由菜单
      const backMenuList = transformRouteToMenu(routeList)
      // this.menuList = backMenuList
      // list?.length > 0 && this.setLastBuildMenuTime()
      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { ignoreRoute } = meta || {}
        return !ignoreRoute
      }
      // 删除meta.ignoreRoute项
      routeList = filter(routeList, routeRemoveIgnoreFilter)
      routeList = routeList.filter(routeRemoveIgnoreFilter)

      routeList = flatMultiLevelRoutes(routeList)
      this.addRoutesToRouter(routeList)
      this.isAddRoutesComplete = true
    },
    // 添加路由
    addRoutesToRouter(routeList: any) {
      // 保存routeList到sessionStorage
      setSessionStorageItem('routeList', JSON.stringify(routeList))
      // 添加路由
      routeList.forEach((route: any) => {
        router.addRoute(route)
      })
    },
  },
})
