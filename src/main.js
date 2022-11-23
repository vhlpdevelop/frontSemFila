import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './routes/index'
import vuetify from './plugins/vuetify'
import store from '../src/store/index'
import VueAnalytics from 'vue-analytics'
Vue.use(router, VueAxios, axios,VueAnalytics, {
  id: 'G-99T0SYESWY',
  checkDuplicatedScript: true
})


Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
