import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components: { [name: string]: Component } = { SvgIcon }
//对外暴露插件对象
export default {
  //务必叫做install方法
  install(app: App) {
    //注册项目全部的全局组件
    Object.keys(components).forEach((key) => {
      //注册为全局组件
      app.component(key, components[key])
    })
    //将element-plus提供全部图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
