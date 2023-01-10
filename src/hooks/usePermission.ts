// import { isArray } from '@/utils/is'
//
// function hasPermission(value?: string | string[], def = true): boolean {
//   // Visible by default
//   if (!value) {
//     return def
//   }
//   const allCodeList = permissionStore.getPermCodeList as string[]
//   if (!isArray(value)) {
//     return allCodeList.includes(value)
//   }
//   return (intersection(value, allCodeList) as string[]).length > 0
// }
