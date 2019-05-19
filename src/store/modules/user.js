
import cookies from 'js-cookie'
import { login, getUserInfo, logout } from '@/api/user'
import { resetRouter } from '@/router'

const user = {}

user.state = {
  token: cookies.get('token'),
  name: '',
  role: ''
}

user.mutations = {
  set_token: (state, token) => {
    state.token = token
  },
  set_name: (state, name) => {
    state.name = name
  },
  set_role: (state, role) => {
    state.role = role
  }
}

user.actions = {
  login: ({ commit }, userInfo) => {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password
      }).then(response => {
        // response is a standed Promise object
        const { data } = response
        window.console.log(data)

        if (data.code) {
          const body = data.data
          commit('set_token', body.token)
          cookies.set('token', body.token)
        }

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getUserInfo: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      getUserInfo({
        token: state.token
      }).then(response => {
        const { data } = response
        const body = data.data
        window.console.log(data)

        if (!data.code) {
          // reject(new Error('Verification failed, please Login again.'))
          reject(data)
        }

        commit('set_name', body.name)
        commit('set_role', body.role)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      logout({
        token: state.token
      }).then(reponse => {
        commit('set_token', '')
        commit('set_name', '')
        commit('set_role', '')
        resetRouter()
        cookies.set('token', '')
        resolve(reponse.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default user
