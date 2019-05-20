
import router from './router'
import store from './store'

const whiteList = [ '/login' ]

router.beforeEach(async (to, from, next) => {
  window.console.log('★ ★ ★ route begin judging...')
  if (store.getters.token) {
    window.console.log('has token, goto path is ' + to.path)
    if (to.path === '/login') {
      // is logined and preventing login agian
      window.console.log('jumper home /')
      next('/')
    } else if (store.getters.role.length === 0) {
      // vuex has no role's info and get from service
      window.console.log('role is empty, and get user info...')
      await store.dispatch('getUserInfo')

      // check route roles with user role
      window.console.log('get permission routes map...')
      const addRoutes = await store.dispatch('generateRoutes')

      // add routes
      window.console.log('add routes...')
      router.addRoutes(addRoutes)
      window.console.log('refresh pages...')
      next({ ...to, replace: true })
    } else {
      window.console.log('role is ' + store.getters.role + ' , end ▲ ▲ ▲')
      next()
    }
  } else {
    // the page is not to login
    window.console.log('no token, goto path is ' + to.path)
    if (whiteList.indexOf(to.path) > -1) {
      window.console.log('page is in white list, end ▲ ▲ ▲')
      next()
    } else {
      window.console.log('page not in white list, goto /login')
      next({
        name: 'login',
        query: {
          redirect: to.path
        }
      })
    }
  }
})
