import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/store/mutation-types'
import { handleImg, welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    refresh_token: '',
    name: '',
    welcome: '',
    avatar: '',
    url: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_REFRESH_TOKEN: (state, token) => {
      state.refresh_token = token
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_URL: (state, url) => {
      state.url = url
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response
          Vue.ls.set(ACCESS_TOKEN, result.access_token, result.expires_in * 1000)
          Vue.ls.set(REFRESH_TOKEN, result.access_token)
          commit('SET_TOKEN', result.access_token)
          commit('SET_REFRESH_TOKEN', result.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response

          const perms = []
          if (result.authorities && result.authorities.length > 0) {
            result.authorities.map(item => perms.push(item.authority))
          }
          const role = {
            permissions: perms
          }
          handleImg(result.principal.avatar).then(res => {
            Vue.ls.set('Url', result.principal.avatar)
            commit('SET_URL', result.principal.avatar)
            Vue.ls.set('Avatar', res)
            commit('SET_AVATAR', res)
          })

          Vue.ls.set('Name', { name: result.principal.username, welcome: welcome() })
          Vue.ls.set('Roles', role)
          Vue.ls.set('Info', result)
          commit('SET_ROLES', role)
          commit('SET_INFO', result)
          commit('SET_NAME', { name: result.principal.username, welcome: welcome() })

          resolve(role)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    async Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_AVATAR', '')
          commit('SET_REFRESH_TOKEN', '')
          commit('SET_ROUTERS', [])
          Vue.ls.clear()
        })
      })
    }

  }
}

export default user
