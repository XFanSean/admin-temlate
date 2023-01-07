import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

// @ts-ignore
// @ts-ignore
export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  // @ts-ignore
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
  alwaysShow?: boolean
}

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw

export interface Menu {
  name: string

  icon?: string

  path: string

  // path contains param, auto assignment.
  paramPath?: string

  disabled?: boolean

  children?: Menu[]

  orderNo?: number

  // roles?: RoleEnum[]

  meta?: Partial<RouteMeta>

  tag?: MenuTag

  hideMenu?: boolean

  alwaysShow?: boolean
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}
