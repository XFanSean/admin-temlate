// function hasPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
//   // Visible by default
//   if (!value) {
//     return def;
//   }
//
//   const permMode = projectSetting.permissionMode;
//
//   if ([PermissionModeEnum.ROUTE_MAPPING, PermissionModeEnum.ROLE].includes(permMode)) {
//     if (!isArray(value)) {
//       return userStore.getRoleList?.includes(value as RoleEnum);
//     }
//     return (intersection(value, userStore.getRoleList) as RoleEnum[]).length > 0;
//   }
//
//   if (PermissionModeEnum.BACK === permMode) {
//     const allCodeList = permissionStore.getPermCodeList as string[];
//     if (!isArray(value)) {
//       return allCodeList.includes(value);
//     }
//     return (intersection(value, allCodeList) as string[]).length > 0;
//   }
//   return true;
// }
