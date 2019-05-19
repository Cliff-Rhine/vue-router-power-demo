
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * judge page has permission
 * @param route the route need to judge
 * @param role
 */
const hasPermission = (route, role) => {
  if (route.meta && route.meta.roles) {
    window.console.log(route.meta.roles, role)
    if (route.meta.roles.includes(role)) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param role
 */
export const filterAsyncRoutes = (routes, role) => {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(tmp, role)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, role)
      }

      res.push(tmp)
    }
  })

  return res
}

const permission = {}

permission.state = {
  routes: [],
  addRoutes: []
}

permission.mutations = {
  set_route: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

permission.actions = {
  generateRoutes: ({ commit, rootGetters }) => {
    return new Promise((resolve, reject) => {
      let accessRoutes

      accessRoutes = filterAsyncRoutes(asyncRoutes, rootGetters.role)
      commit('set_route', accessRoutes)

      resolve(accessRoutes)
    })
  }
}

export default permission
