export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 标题
    title?: string
    // 是否展示在菜单
    hiddenMenu?: boolean
    // 排序
    orderNo?: number
  }
}
