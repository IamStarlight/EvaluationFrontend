import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import generateRoutes from './permission'

const getDefaultState = () => {
  return {
    token: getToken(),
    sid: '',
    name: '',
    avatar: '',
    roles: ['1']
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_SID: (state, sid) => {
    state.sid = sid
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        console.log("giving permission")
        const a = data.permission
        if (a == "ROLE_ADMIN")
        {
          commit('SET_ROLES', ['1'])
        } else if (a == 'ROLE_TEACHER')
        {
          commit('SET_ROLES', ['2'])
        } else
        {
          commit('SET_ROLES', ['3'])
        }
        console.log(state.roles)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  async setchangerole ({ commit, dispatch }, roles) {
    commit('SET_ROLES', roles)
    resetRouter()
    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // dynamically modify permissions
  async changeRoles ({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  },
  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data)
        {
          return reject('Verification failed, please Login again.')
        }
        console.log(
          "infoing"
        )
        const { permission, id, name } = data
        // const roles = [permission.toString()];
        // commit('SET_ROLES', roles)
        // console.log(state.roles)
        // if (permission == "ROLE_ADMIN")
        // {
        //   commit('SET_ROLES', '1')
        // } else if (permission == 'ROLE_TEACHER')
        // {
        //   commit('SET_ROLES', '2')
        // } else
        // {
        //   commit('SET_ROLES', '3')
        // }
        // commit('SET_SID', sid)
        const a = permission
        if (a == "ROLE_ADMIN")
        {
          commit('SET_ROLES', ['1'])
        } else if (a == 'ROLE_TEACHER')
        {
          commit('SET_ROLES', ['2'])
        } else
        {
          commit('SET_ROLES', ['3'])
        }
        console.log(state.roles)
        commit('SET_SID', id)
        commit('SET_NAME', name)
        console.log(
          "infodone"
        )
        const b = { roles: state.roles }
        resolve(b)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // // dynamically modify permissions
  // async changeRoles ({ commit, dispatch }, role) {
  //   const token = role + '-token'

  //   commit('SET_TOKEN', token)
  //   setToken(token)

  //   const { roles } = await dispatch('getInfo')

  //   resetRouter()

  //   // generate accessible routes map based on roles
  //   const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
  //   // dynamically add accessible routes
  //   router.addRoutes(accessRoutes)

  //   // reset visited views and cached views
  //   dispatch('tagsView/delAllViews', null, { root: true })
  // },
  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
