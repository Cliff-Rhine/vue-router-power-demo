
import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  const re = store.dispatch('login', { username: 'user', password: 'qweqw' })
  window.console.log(re.data)
  next()
})
