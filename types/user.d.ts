/**
 * 用户密码登录
 */
export interface PasswordLoginParams {
  // 用户名
  username: string
  // 密码
  password: string
  // 验证码
  captcha?: string
  checkKey?: string
}

export interface PhoneNumberLoginParams {
  // 手机号
  phoneNumber: string
  // 验证码
  captcha: string
  // 验证码ID
  captchaKey: string
}
