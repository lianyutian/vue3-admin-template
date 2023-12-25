// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { loginForm } from '@/api/user/type'
import { reqLogin } from '@/api/user'

// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据地方
  state() {
    return {
      token: '',
    }
  },
  // 处理异步|逻辑地方
  actions: {
    async userLogin(data: loginForm) {
      const result = await reqLogin(data)
      console.log(result)
      if (result.code === 200) {
        this.token = result.data.token
        localStorage.setItem('TOKEN', this.token)
        return 'OK'
      } else {
        Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
// 对外暴露小仓库
export default useUserStore
