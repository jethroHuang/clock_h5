import Vue from 'vue'
import App from './App.vue'
import store from './store'
import dateFormat from "@/utils/dateFormat"
import axios from 'axios'
import Icon from "@/components/Icon"

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.filter('dateFormat', dateFormat)
Vue.component('icon', Icon)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
