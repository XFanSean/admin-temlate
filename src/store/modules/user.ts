import { defineStore } from 'pinia'
import type { PasswordLoginParams, PhoneNumberLoginParams } from '#/user'
import { getPermissionByToken, queryUserInfo, userPasswordLogin } from '@/api/user'
import { removeItem, setItem } from '@/utils/cache/storage'
import { CacheKeyEnum } from '@/enum/cache'
import {
  addSlashToRouteComponent,
  flatMultiLevelRoutes,
  transformObjToRoute,
} from '@/router/helper/routerHelper'
import { filter, transformRouteToMenu } from '@/router/helper/menuHelper'
import { AppRouteRecordRaw } from '@/router/types'
import router from '@/router'
import { useAppStore } from './app'

type LoginTypes = 'password' | 'phoneNumber'
interface IUserStoreState {
  token: string
  userInfo: any
  isAddRoutesComplete: boolean
}

export const useUserStore = defineStore('user', {
  state: (): IUserStoreState => ({
    token: '',
    userInfo: {},
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
      location.reload()
    },
    // 获取用户权限表
    async getMenuList() {
      const res = await getPermissionByToken()
      let routeList = res.menu
      // 组件地址前加斜杠处理  author: lsq date:2021-09-08
      routeList = addSlashToRouteComponent(routeList)
      // 动态引入组件
      routeList = transformObjToRoute(routeList)
      this.generateMenuList(routeList)
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
      // 删除meta.ignoreRoute项
      routeList = filter(routeList, routeRemoveIgnoreFilter)
      routeList = routeList.filter(routeRemoveIgnoreFilter)

      routeList = flatMultiLevelRoutes(routeList)
      this.addRoutesToRouter(routeList)
      this.isAddRoutesComplete = true
    },
    // 添加路由
    addRoutesToRouter(routeList: any) {
      // 添加路由
      routeList.forEach((route: any) => {
        router.addRoute(route)
      })
    },
    // 生成菜单
    generateMenuList(routerList: any) {
      const appStore = useAppStore()
      appStore.menuList = transformRouteToMenu(routerList)
    },
  },
})
