import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/',
      name: 'home',
      component: layout
    }
  ]
})
