<template>
  <!-- 顶部左侧的图标 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="settingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧的面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'

// 获取layout配置相关的仓库
let settingStore = useSettingStore()
// 路由
const route = useRoute()
console.log(route.matched)
const changeIcon = () => {
  console.log(settingStore.fold)
  settingStore.fold = !settingStore.fold
}
</script>

<style lang="scss" scoped></style>
