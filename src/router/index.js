import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Parent from '../views/is_components/Parents'
import Child from '../views/is_components/Child'
import Interview1 from '../views/interview/Interview1'
import Interview2 from '../views/interview/Interview2'

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
          component: resolve => require(['../views/interview/Interview1'], resolve),
        },
        {
          path: 'interview2',
          component: resolve => require(['../views/interview/Interview2'], resolve),
        },
      ]
  },
  {
    path: '/parent',
    name: 'Parent',
    component: Parent
  },
  {
    path: '/child',
    name: 'Child',
    component: Child
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
  mode: 'history',
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
