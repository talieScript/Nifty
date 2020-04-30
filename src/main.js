import Vue from 'vue'
import App from './App.vue'
import dotenv from 'dotenv'
import router from '@/router.ts';
import 'vue-material/dist/vue-material.min.css'
import { MdApp, MdTabs, MdIcon, MdToolbar, MdButton, MdDrawer, MdContent, MdList, MdDialog} from 'vue-material/dist/components'
import { VueMasonryPlugin } from 'vue-masonry';
import vSelect from 'vue-select'



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
Vue.use(VueMasonryPlugin);
Vue.use(MdDialog);

Vue.component('v-select', vSelect.VueSelect)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')