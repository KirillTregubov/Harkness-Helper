import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { rtdbPlugin } from 'vuefire'
import firebase from 'firebase' // change

Vue.config.productionTip = false

Vue.use(rtdbPlugin)

let app = ''

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
