import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
// 引入公用css样式
import './assets/css/share.css'
// 使用axios请求
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000' // 设置根目录
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
