import Vue from 'vue'
import App from './App.vue'

import store from './store'

import './plugins'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
