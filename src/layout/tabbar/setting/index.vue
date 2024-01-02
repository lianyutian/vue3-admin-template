<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0px 10px"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()

const settingStore = useSettingStore()
// 刷新功能
const updateRefresh = () => {
  settingStore.refresh = !settingStore.refresh
}

// 全屏功能
const fullScreen = () => {
  // DOM对象的一个属性：可以用来判断当前是不是全屏的模式【全屏：true，不是全屏：false】
  let full = document.fullscreenElement
  // 切换成全屏
  if (!full) {
    // 文档根节点的方法requestFullscreen实现全屏
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}

// 退出登录
const router = useRouter()
const route = useRoute()
const logout = () => {
  //第一件事：需要项服务器发请求【退出登录接口】（我们这里没有）
  //第二件事：仓库当中和关于用户的相关的数据清空
  userStore.userLogoutAction()
  //第三件事：跳转到登陆页面
  router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<style lang="scss" scoped></style>
