import Vue from 'vue'

import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
// import '@/element-ui-theme'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/index.scss'

import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
import BaiduMap from 'vue-baidu-map'
import cloneDeep from 'lodash/cloneDeep'
import VueParticles from 'vue-particles'

import Echarts from 'echarts'
Vue.prototype.echarts = Echarts
Vue.use(Echarts)

Vue.use(VueParticles)
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'DD279b2a90afdf0ae7a3796787a0742e'
})

// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法
// Vue.prototype.localStorage = window.localStorage

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

// 保存整站token
window.SITE_CONFIG['sessionStorage'] = window.sessionStorage
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
