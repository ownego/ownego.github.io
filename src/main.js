import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueAnalytics from 'vue-analytics'
import VTooltip from 'v-tooltip'
import router from './router'
import App from './App.vue'

import store from './store'
import lang from './lang'
import './services/oe.drawing'
import './services/oe.console'
import './services/lethargy'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-59799793-4',
  router
})
Vue.use(VTooltip)

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages: lang // set locale messages
})

new Vue({
  router,
  i18n,
  data: store,
  render: h => h(App)
}).$mount('#app')
