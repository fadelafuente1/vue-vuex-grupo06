// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import { MdTable, MdContent, MdCard, MdButton, MdIcon, MdDrawer, MdToolbar, MdList } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material-design-icons/styles.css'
import MenuIcon from 'vue-material-design-icons/menu.vue'
import SwapIcon from 'vue-material-design-icons/swap-horizontal-variant.vue'
import PlusIcon from 'vue-material-design-icons/plus-circle.vue'
import MinusIcon from 'vue-material-design-icons/minus-circle.vue'
import VueTouch from 'vue-touch'


Vue.use(MdTable)
Vue.use(MdContent)
Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdIcon)
Vue.use(MdDrawer)
Vue.use(MdToolbar)
Vue.use(MdList)
Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('MenuIcon', MenuIcon)
Vue.component('SwapIcon', SwapIcon)
Vue.component('PlusIcon', PlusIcon)
Vue.component('MinusIcon', MinusIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
