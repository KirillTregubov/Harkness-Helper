import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { rtdbPlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import { db } from '@/firebase' // eslint-disable-line no-unused-vars
import store from './store'

Vue.config.productionTip = false

Vue.use(rtdbPlugin)

let app = ''

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
