import request from '@/utils/request'

const userApi = {
  Login: '/auth/oauth/token',
  Logout: '/auth/myLogout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/auth/user/info',
  UserMenu: '/system/menu/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  // 密码模式
  // eslint-disable-next-line camelcase
  const grant_type = 'password'
  const key = 77777439
  const code = 4726
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter,
    headers: {
      'Authorization': 'Basic c3dhZ2dlcjoxMjM0NTY=' // swagger:123456 避免验证验证码 http://localhost:8301/auth/captcha?key=77777439生成验证码
      // fxz:123456  'Authorization': 'Basic Znh6OjEyMzQ1Ng=='
    },
    params: { grant_type, code, key, username: parameter.username, password: parameter.password }
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get'
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'DELETE'
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
