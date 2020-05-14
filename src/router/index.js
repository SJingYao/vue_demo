import Vue from 'vue'
import VueRouter from 'vue-router'
import progress from 'nprogress' // 进度条包
import 'nprogress/nprogress.css' // 样式文件
Vue.use(VueRouter)

const routes = [
  // 只要浏览器的地址指向一个不存在路由，都会自动切换到这个redirect的值。
  {
    path: '*',
    name: '',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: '登录',
    component: resolve => require(['@/views/Login/Login.vue'], resolve),
    hidden: true
  },
  {
    path: '/', redirect: '/homePage'
  },
  {
    path: '/home',
    // 这里加了name会有警告,是因为给这个路由设置的有默认路由
    /**
     * [vue-router] Named Route '首页' has a default child route. When navigating to this named route (:to="{name: '首页'"), the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead.
     */
    // name: '首页',
    component: resolve => require(['@/views/Home/Home.vue'], resolve),
    redirect: '/homePage',
    children: [
      {
        path: '/homePage',
        name: '首页',
        component: resolve =>
          require(['@/views/Home/HomePage.vue'], resolve)
      },
      {
        path: '/interview2',
        name: '面试题',
        component: resolve =>
          require(['@/components/interview/Interview2'], resolve)
      },
      {
        path: '/table',
        name: '数据表',
        component: resolve => require(['@/components/table/Istable'], resolve)
      },
      {
        path: '/VuexDemo',
        name: 'VuexDemo',
        component: resolve =>
          require(['@/components/is_components/VuexDemo'], resolve)
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 在路由守卫中判断
router.beforeEach((to, from, next) => {
  progress.start()
  // 判断跳转的路由及 sessionStorage 中有无 token 如果没有则跳转到登录页面
  if (
    to.path != '/login' &&
    sessionStorage.getItem('authorization-token') === null
  ) {
    return next('/login')
  }
  next()
})
router.afterEach((to, from, next) => {
  progress.done()
})

export default router
