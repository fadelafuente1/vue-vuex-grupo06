// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import { MdTable, MdContent, MdCard, MdButton, MdIcon, MdDrawer, MdToolbar, MdList } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(MdTable)
Vue.use(MdContent)
Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdIcon)
Vue.use(MdDrawer)
Vue.use(MdToolbar)
Vue.use(MdList)

Vue.config.productionTip = false
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
