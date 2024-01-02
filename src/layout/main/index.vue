<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <div v-if="flag">
        <!-- 渲染layout一级路由的子路由 -->
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import useSettingStore from '@/store/modules/setting'

const settingStore = useSettingStore()
//控制当前组件是否销毁重建
let flag = ref(true)
//监听仓库内部的数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
watch(
  () => settingStore.refresh,
  () => {
    //点击刷新按钮：路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
