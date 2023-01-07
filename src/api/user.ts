import type { PasswordLoginParams } from '#/user'
import { request } from '@/utils/http'

// 用户账号密码登录
export function userPasswordLogin(params: PasswordLoginParams) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data: params,
  })
}

// 获取用户信息
export function queryUserInfo() {
  return request(
    {
      url: '/sys/user/getUserInfo',
      method: 'GET',
    },
    {
      errorMessageShow: true,
      codeMessageShow: false,
    }
  )
}

// 获取用户权限列表
export function getPermissionByToken() {
  return request(
    {
      url: 'sys/permission/getUserPermissionByToken',
      method: 'GET',
    },
    {
      errorMessageShow: true,
      codeMessageShow: false,
    }
  )
}
