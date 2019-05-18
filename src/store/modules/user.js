
import cookies from 'js-cookie'
import { login, getUserInfo, logout } from '@/api/user'

let user = {}

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
        // response is stand primise object
        // const { data } = response

        getUserInfo()
        logout()
      })
    })
  }
}

export default user
