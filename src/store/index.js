import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'

// 模块扩展
import feeds from './modules/feeds'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    feeds
  },
  state: {
    count: 1,
    // token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    params: {},
    platIcon: {
      instagram: require('../assets/images/instagram.png'),
      weibo: require('../assets/images/weibo.png'),
      twitter: require('../assets/images/twitter.png'),
      facebook: require('../assets/images/facebook.png')
    }
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
    },
    handleDownload () {
      let startTime = Date.now()
      let timer = setTimeout(() => {
        let endTime = Date.now()
        if ((endTime - startTime) < 2200) {
          window.location.href = ''
        }
      }, 2000)
      window.onblur = () => {
        clearTimeout(timer)
      }
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
