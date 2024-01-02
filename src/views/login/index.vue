<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :rules="rules"
          :model="loginForm"
          ref="loginFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到XXX</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loadType"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              @keydown.enter="logins"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'

// 登录效果
let loadType = ref(false)
//收集账号与密码数据
let loginForm = reactive({ username: 'admin', password: '111111' })

//自定义校验规则函数
const validatorUserName = (_rule: any, value: any, callback: any) => {
  //rule：校验规则对象
  //value:表单元素文本内容
  //callback:符合条件，callback放行通过，不符合：注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}
const validatorPassword = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}
//定义表单校验需要的配置对象
const rules = {
  username: [
    //规则对象属性:
    {
      required: true, // required,代表这个字段务必要校验的
      min: 5, //min:文本长度至少多少位
      max: 10, // max:文本长度最多多少位
      message: '长度应为6-10位', // message:错误的提示信息
      trigger: 'change', //trigger:触发校验表单的时机 change->文本发生变化触发校验, blur:失去焦点的时候触发校验规则
    },
    { validator: validatorUserName, trigger: 'change' },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 10,
      message: '长度应为6-15位',
      trigger: 'change',
    },
    { validator: validatorPassword, trigger: 'change' },
  ],
}
// 获取表单组件
const loginFormRef = ref()

const router = useRouter()
const route = useRoute()
let userStore = useUserStore()
// 登录
const login = async () => {
  //保证全部表单项校验通过
  await loginFormRef.value.validate()
  loadType.value = true
  try {
    await userStore.userLoginAction(loginForm)
    //编程式导航跳转到展示数据首页
    //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
    let redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
    })
    loadType.value = false
  } catch (error) {
    loadType.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

const logins = () => {
  console.log(11)
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
