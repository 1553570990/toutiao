import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './permission.js'
import Component from './components'
import './style/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/axios.config'
Vue.use(ElementUI)
Vue.use(Component)
// axios.defaults.baseURL = 'http://localhost:3031'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
    router
}).$mount('#app')
