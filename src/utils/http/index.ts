import type { AxiosCustomConfig } from './types'
import axios, { AxiosRequestConfig } from 'axios'
import { httpErrorStatusHandle } from './errorMessage'
import { useMessage } from '@/hooks/useMessage'
import { getItem } from '@/utils/cache/storage'
import { addPending, removePending } from './cancel'
import { getAppEnvConfig } from '@/utils/env'

const { createMessage } = useMessage()

const { VITE_GLOB_API_URL } = getAppEnvConfig()

// 部分axios请求预设配置
const defaultAxiosConfig: AxiosRequestConfig = {
  // 超时时间
  timeout: 5 * 1000,
  headers: { 'Content-Type': 'application/json' },
  baseURL: VITE_GLOB_API_URL,
}

export function request(
  axiosConfig: AxiosRequestConfig,
  customConfig?: Partial<AxiosCustomConfig>
) {
  // const config = Object.assign(defaultAxiosConfig, axiosConfig)
  const customOptions = Object.assign(
    {
      // 是否开启取消重复请求
      repeatRequestCancel: true,
      // 是否开启简洁的数据响应结构
      reductDataFormat: true,
      // 是否开启接口错误信息展示
      errorMessageShow: true,
      // 是否开启code不正确时的信息提示
      codeMessageShow: true,
    },
    customConfig
  ) as AxiosCustomConfig

  const service = axios.create(defaultAxiosConfig)

  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      removePending(config)
      customOptions.repeatRequestCancel && addPending(config)
      // 携带token
      if (getItem('token') && typeof window !== 'undefined') {
        // @ts-ignore
        config.headers['Authorization'] = getItem('token')
        // @ts-ignore
        config.headers['X-Access-Token'] = getItem('token')
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    (response) => {
      const { code, message, result, success } = response.data
      if (customOptions.codeMessageShow && response.data && code !== 200) {
        createMessage.warning(message)
        return Promise.reject(response.data)
      }
      return response.data.result as any
    },
    (error) => {
      error.config && removePending(error.config)
      // customOptions.loading && closeLoading(custom_options); // 关闭loading
      customOptions.errorMessageShow && httpErrorStatusHandle(error) // 处理错误状态码
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )

  return service(axiosConfig)
}
