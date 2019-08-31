import Vue from 'vue'
import vueWechatTitle from 'vue-wechat-title'

import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/scripts/permission' // permission control
import '@/scripts/icon' // icon
import '@/components/Dashboard/Widgets/libs' // chart libs
import * as filters from '@/scripts/filters' // global filters

import App from './App'
import store from '@/store'
import router from '@/router'

Vue.use(vueWechatTitle)
Vue.use(Element, { size: 'medium' }) // set element-ui default size

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
