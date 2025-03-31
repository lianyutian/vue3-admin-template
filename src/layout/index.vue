<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: settingStore.fold ? true : false }">
      <!-- logo -->
      <Logo></Logo>
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="white"
          :default-active="route.path"
          :collapse="settingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: settingStore.fold ? true : false }">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main" :class="{ fold: settingStore.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import Main from './main/index.vue'
import { useRoute } from 'vue-router'
import useSettingStore from '@/store/modules/setting'

const userStore = useUserStore()
const settingStore = useSettingStore()
const route = useRoute()
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  color: white;
  .layout_slider {
    width: 260px;
    height: 100vh;
    background: #001529;
    transition: all 0.1s;

    &.fold {
      width: 50px;
    }

    .scrollbar {
      width: 100%;
      height: calc(100vh - 50px);

      .el-menu {
        border-right: 0;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - 260px);
    height: 50px;
    background: cyan;
    top: 0;
    left: 260px;
    transition: all 0.1s;

    &.fold {
      width: calc(100vw - 50px);
      left: 50px;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - 260px);
    height: calc(100vh - 50px);
    background-color: yellowgreen;
    left: 260px;
    top: 50px;
    padding: 20px;
    overflow: auto;
    transition: all 0.1s;

    &.fold {
      width: calc(100vw - 50px);
      left: 50px;
    }
  }
}
</style>
