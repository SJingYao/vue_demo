import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Interview1 from '@/components/interview/Interview1'
import Interview2 from '@/components/interview/Interview2'
import Table from '@/components/table/Istable'
// import VuexDemo from '@/components/is_components/VuexDemo'
Vue.use(VueRouter)

const routes = [
  // 只要浏览器的地址指向一个不存在路由，都会自动切换到这个redirect的值。
  {
    path: '*',
    name: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    // component: Home,
    component: resolve => require(['../views/Home.vue'], resolve),
      children: [
        {
          path: 'interview1',
          component: resolve => require(['@/components/interview/Interview1'], resolve),
        },
        {
          path: 'interview2',
          component: resolve => require(['@/components/interview/Interview2'], resolve),
        },
      ]
  },
  {
    path: '/interview1',
    name: 'Interview1',
    component: Interview1
  },
  {
    path: '/interview2',
    name: 'Interview2',
    component: Interview2
  },
  {
    path: '/table',
    name: 'table',
    component: Table
  },
  {
    path: '/VuexDemo',
    name: 'VuexDemo',
    component: resolve => require(['@/components/is_components/VuexDemo'], resolve),
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
  // 判断跳转的路由及 sessionStorage 中有无 token 如果没有则跳转到登录页面
  if (to.path != '/login' && sessionStorage.getItem('authorization-token') === null) {
    return next('/login')
  }
  next()
})

export default router
