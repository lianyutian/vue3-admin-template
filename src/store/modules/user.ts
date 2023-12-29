// src/store/modules/user.ts

// 创建用户相关的仓库
import { defineStore } from 'pinia'
import { loginForm, loginResponseData } from '@/api/user/type'
import { reqLogin } from '@/api/user'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import { UserState } from './type/type'
import { constantRoute } from '@/router/router'

// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 用户仓库存储数据地方
  state(): UserState {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
    }
  },
  // 处理异步|逻辑地方
  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)
      console.log(result)
      if (result.code === 200) {
        this.token = result.data.token as string
        //localStorage.setItem('TOKEN', this.token)
        SET_TOKEN(this.token)
        return 'OK'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
// 对外暴露小仓库
export default useUserStore
