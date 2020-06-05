import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/axios'
import './plugins/element.js'

import "element-ui/lib/theme-chalk/index.css"
import 'mavon-editor/dist/css/index.css'

import mavonEditor from 'mavon-editor'

import './request'
import './permission'

Vue.use(mavonEditor)

Vue.config.productionTip = false
axios.defaults.baseURL = "/api"


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// axios.defaults.withCredentials = true

