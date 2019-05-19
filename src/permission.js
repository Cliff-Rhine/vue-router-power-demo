
import router from './router'
import store from './store'

const whiteList = [ '/login' ]

router.beforeEach(async (to, from, next) => {
  window.console.log('... panduan')
  if (store.getters.token) {
    window.console.log('has token', 'path is ' + to.path)
    if (to.path === '/login') {
      window.console.log('go home /')
      next('/')
    } else if (store.getters.role.length === 0) {
      // vuex has no role's info and get from service
      window.console.log('role is empty, and get user info')
      await store.dispatch('getUserInfo')

      // check route roles with user role
      window.console.log('get permission routes map')
      const addRoutes = await store.dispatch('generateRoutes')

      // add routes
      window.console.log('add routes...')
      router.addRoutes(addRoutes)
      window.console.log('... go pages')
      next({ ...to, replace: true })
    } else {
      window.console.log('has role, role is ' + store.getters.role + ' , go pages')
      next()
    }
  } else {
    // the page is not to login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          redirect: to.path
        }
      })
    }
  }
})
