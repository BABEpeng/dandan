import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user
  },
  state: {
    count: 1,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
  },
  getters: {
    getStateCount: function (state) {
      // eslint-disable-next-line no-unused-expressions
      return state.count + 1
    }
  },
  mutations: {
    add (state) {
      state.count = state.count + 1
    },
    reduction (state) {
      state.count = state.count - 1
    },
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    delToken (state) {
      state.token = ''
      localStorage.removeItem('token')
    },
    // 重置vuex本地储存状态
    resetStore (state) {
      Object.keys(state).forEach((key) => {
        state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
    }
  },
  actions: {
    add (context) {
      context.commit('add')
    },
    reduction (context) {
      context.commit('reduction')
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
