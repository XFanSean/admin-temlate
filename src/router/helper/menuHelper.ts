import type { AppRouteModule, AppRouteRecordRaw, Menu } from '../types'
import { cloneDeep } from 'lodash-es'
import { isUrl } from '@/utils/is'

export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): T[] {
  return treeData.map((item) => treeMapEach(item, opt))
}

export function treeMapEach(
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn }
) {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((i: number) =>
        treeMapEach(i, {
          children,
          conversion,
        })
      ),
    }
  } else {
    return {
      ...conversionData,
    }
  }
}

export function transformRouteToMenu(routeModList: AppRouteModule[], routerMapping = false) {
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList: AppRouteRecordRaw[] = []

  cloneRouteModList.forEach((item) => {
    if (routerMapping && item.meta.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect
    }
    if (item.meta?.single) {
      const realItem = item?.children?.[0]
      realItem && routeList.push(realItem)
    } else {
      routeList.push(item)
    }
  })
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        alwaysShow: node.alwaysShow || false,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      }
    },
  })
  joinParentPath(list)
  const clonedList = cloneDeep(list)
  return clonedList
}

function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // path doesn't start with /, nor is it a url, join parent path
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path)
    }
  }
}

export function filter<T = any>(tree: T[], func: (n: T) => boolean): T[] {
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        // ???????????? ?????????children???  ?????????????????????????????? listFilter
        node['children'] = node['children'] && listFilter(node['children'])
        // ????????????????????? func ????????????
        return func(node) || (node['children'] && node['children'].length)
      })
  }

  return listFilter(tree)
}
