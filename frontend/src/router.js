import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Harkness from './components/Harkness.vue'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/class',
      name: 'layout',
      component: Layout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/harkness',
      name: 'harkness',
      component: Harkness,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else next();
})

export default router;
