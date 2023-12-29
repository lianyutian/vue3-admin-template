<template>
  <!-- 顶部左侧的图标 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="settingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧的面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>权限挂历</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'

//获取layout配置相关的仓库
let settingStore = useSettingStore()

const changeIcon = () => {
  console.log(settingStore.fold)
  settingStore.fold = !settingStore.fold
}
</script>

<style lang="scss" scoped></style>
