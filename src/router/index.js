'use strict'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Separate constantRoutes and asyncRoutes to make logic and structure clearer
export const constantRoutes = require('./constantRoutes').default
export const asyncRoutes = require('./asyncRoutes').default

const createRouter = () => new Router({
  mode: 'history', // require service support
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
