
import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  store.dispatch('login', { username: 'user', password: 'qweqw' })
  next()
})
