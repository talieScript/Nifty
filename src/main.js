import Vue from 'vue'
import App from './App.vue'
import router from '@/router.ts';
import 'vue-material/dist/vue-material.min.css'
import { MdApp, MdTabs, MdIcon, MdToolbar, MdButton, MdDrawer, MdContent, MdList } from 'vue-material/dist/components'

Vue.use(MdApp)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdIcon)
Vue.use(MdToolbar)
Vue.use(MdButton)
Vue.use(MdDrawer)
Vue.use(MdList)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
