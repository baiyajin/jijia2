// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import qs from 'qs'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios' // 1、在这里引入axios




Vue.prototype.$axios = axios; // 2、在vue中使用axios
Vue.prototype.$http = axios;

// axios.defaults.baseURL='/api';  //设置一个基础路径，这样你调用接口的时候可以不写api,直接写/接口名称即可
// Vue.defaults.baseURL='/api';  //设置一个基础路径，这样你调用接口的时候可以不写api,直接写/接口名称即可
// global.axios=Axios;  //设置一个全局axios便于调用


Vue.config.productionTip = false

Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
