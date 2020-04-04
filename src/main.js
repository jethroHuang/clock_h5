import Vue from 'vue'
import App from './App.vue'
import store from './store'
import dateFormat from "@/utils/dateFormat"

Vue.config.productionTip = false
Vue.filter('dateFormat', dateFormat)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
