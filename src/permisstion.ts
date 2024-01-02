//路由鉴权：鉴权：项目当中路由能不能被访问的权限
import router from '@/router'
import setting from './setting'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//进度条的加载圆圈不要
nprogress.configure({ showSpinner: false })
//获取用户相关的小仓库内部token数据，去判断用户是否登陆成功
import useUserStore from '@/store/modules/user'
//为什么要引pinia
import pinia from './store'
const userStore = useUserStore(pinia)

//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  //网页的名字
  document.title = `${setting.title}-${to.meta.title}`
  //访问某一个路由之前的守卫
  nprogress.start()
  //获取token，去判断用户登录、还是未登录
  const token = userStore.token
  //获取用户名字
  const username = userStore.username
  //用户登录判断
  if (token) {
    //登陆成功，访问login。指向首页
    if (to.path == '/login') {
      next('/home')
    } else {
      //登陆成功访问其余的，放行
      //有用户信息
      if (username) {
        //放行
        next()
      } else {
        //如果没有用户信息，在收尾这里发请求获取到了用户信息再放行
        try {
          //获取用户信息
          await userStore.userInfoAction()
          next()
        } catch (error) {
          //token过期|用户手动处理token
          //退出登陆->用户相关的数据清空
          userStore.userLogoutAction()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
  // to and from are both route objects.
  nprogress.done()
})

//第一个问题：任意路由切换实现进度条业务 ----nprogress
//第二个问题：路由鉴权
//全部路由组件 ：登录|404|任意路由|首页|权限管理（三个子路由）|

//用户未登录 ：可以访问login 其余都不行
//登陆成功：不可以访问login 其余都可以
