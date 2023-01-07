import { getAppEnvConfig } from '../env'

const { VITE_SHORT_NAME } = getAppEnvConfig()
const prefixKey = VITE_SHORT_NAME

function getStorageKey(key: string) {
  return prefixKey + '_' + key
}

// 检测 localStorage 是否可用
export const checkStorageSupported = (): boolean => {
  try {
    window.localStorage.setItem('checkLocalStorageSupported', 'checkLocalStorageSupported')
    window.sessionStorage.setItem('checkLocalStorageSupported', 'checkLocalStorageSupported')
    window.localStorage.removeItem('checkLocalStorageSupported')
    window.sessionStorage.removeItem('checkLocalStorageSupported')
    return true
  } catch (e) {
    return false
  }
}

// 获取值
export const getItem = (key: string): string | null => {
  if (checkStorageSupported()) {
    // 使用 localStorage
    return window.localStorage.getItem(getStorageKey(key))
  } else {
    // 不可用采用 cookie  作为替代方案
    let result = ''
    const name = `${getStorageKey(key)}=`
    const cookieList = document.cookie.split(';')
    for (let i = 0; i < cookieList.length; i++) {
      const c = cookieList[i].trim()
      if (c.indexOf(name) === 0) {
        result = c.substring(name.length, c.length)
        break
      }
    }
    return result
  }
}

// 设置值
export const setItem = (key: string, value: string) => {
  if (checkStorageSupported()) {
    window.localStorage.setItem(getStorageKey(key), value)
  } else {
    const d = new Date()
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000) // 设置一个月过期时间
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${getStorageKey(key)}=${value}; ${expires}`
  }
}

// 删除值
export const removeItem = (key: string) => {
  if (checkStorageSupported()) {
    window.localStorage.removeItem(getStorageKey(key))
  } else {
    const d = new Date()
    d.setTime(d.getTime() - 1) // 立即过期
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${getStorageKey(key)}=; ${expires}`
  }
}

export const setSessionStorageItem = (key: string, value: any) => {
  window.sessionStorage.setItem(getStorageKey(key), value)
}

export const getSessionStorageItem = (key: string) => {
  const res = window.sessionStorage.getItem(getStorageKey(key))
  return JSON.parse(res as string)
}

export const removeSessionStorageItem = (key: string) => {
  window.sessionStorage.removeItem(getStorageKey(key))
}
