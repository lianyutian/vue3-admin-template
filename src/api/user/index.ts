// 同一管理用户相关的接口
import request from '@/utils/request'
import { loginForm, loginResponseData, userResponseData } from './type'

// 统一管理API
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = 'user/info',
}

// 暴露请求函数
// 登录接口
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息接口
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL)
