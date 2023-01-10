import { defineStore } from 'pinia'
import { AppRouteRecordRaw } from '@/router/types'

interface IAppStoreState {
  menuList: AppRouteRecordRaw[]
  menuOpenKeys: string[]
  menuSelectKeys: string[]
  collapsed: boolean
}

export const useAppStore = defineStore('app', {
  state: (): IAppStoreState => ({
    menuList: [],
    menuOpenKeys: [],
    menuSelectKeys: [],
    collapsed: false,
  }),
  actions: {},
})
