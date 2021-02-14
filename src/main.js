import Vue from 'vue'
import App from './App.vue'
import dotenv from 'dotenv'
import router from '@/router.ts';
import 'vue-material/dist/vue-material.min.css'
import { MdApp, MdTabs, MdIcon, MdToolbar, MdButton, MdDrawer, MdContent, MdList, MdDialog, MdTooltip, MdSnackbar } from 'vue-material/dist/components'
import vSelect from 'vue-select';
import VueMeta from 'vue-meta';
import store from './store/store.ts'
import VueAnalytics from 'vue-analytics';


Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GOOGLE_ANALYTICS,
  router
})

Vue.use(VueMeta, { refreshOnceOnNavigation: true })

dotenv.config()

Vue.use(dotenv)
Vue.use(MdApp)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdIcon)
Vue.use(MdToolbar)
Vue.use(MdButton)
Vue.use(MdDrawer)
Vue.use(MdList)
Vue.use(MdDialog);
Vue.use(MdTooltip);
Vue.use(MdSnackbar);

Vue.component('v-select', vSelect.VueSelect)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')