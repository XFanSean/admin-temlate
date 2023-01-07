export interface AxiosCustomConfig {
  // 是否开启取消重复请求
  repeatRequestCancel: boolean
  // 是否开启loading效果
  reductDataFormat: boolean
  // 是否开启接口错误信息展示
  errorMessageShow: boolean
  // 是否开启code不正确时的信息提示
  codeMessageShow: boolean
}

export interface ResponseData<T = any> {
  code: number
  message: string
  result: T
  success: boolean
  timestamp: number
}
