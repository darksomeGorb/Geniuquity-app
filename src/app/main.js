// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { ColorThemePlugin } from 'vuestic-ui/src/services/ColorThemePlugin'
import store from '../store/index'
import router from '../router/index'
import axios from 'axios'
import VuesticPlugin from 'vuestic-ui/src/components/vuestic-plugin'
import VueClipboard from 'vue-clipboard2'
import VueSweetalert2 from 'vue-sweetalert2'
import VeeValidate from 'vee-validate'
import '../metrics'

const options = {
  confirmButtonColor: '#4AE392',
  cancelButtonColor: '#ff7674',
}

Vue.use(VueSweetalert2, options)

// Vue.prototype.$apiUrl = 'http://localhost:3000/api/'
Vue.prototype.$apiUrl = '/api/'
Vue.prototype.$http = axios
// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, { fieldsBagName: 'formFields' })

Vue.use(VuesticPlugin)
Vue.use(VueClipboard)

Vue.use(ColorThemePlugin,
  {
    // Add or change theme colors here
    themes: {
      // primary: '#f06595',
      // blurple: '#7289DA',
    },
  })

router.beforeEach((to, from, next) => {
  store.commit('setLoading', false)
  store.commit('setLoading', true)

  if (store.state.userToken === '' && to.path !== '/auth/login' && !store.state.loggedIn && to.path !== '/auth/code') {
    return next({ name: 'login' })
  }
  Vue.prototype.$http.defaults.headers.common['Auth'] = store.state.userToken
  Vue.prototype.$http.defaults.headers.common['Cache-control'] = 'no-cache'
  return next()
})

router.afterEach((to, from) => {
  store.commit('setLoading', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
