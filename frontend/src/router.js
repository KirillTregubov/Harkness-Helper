import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'
import Authentication from './views/Authentication.vue'
// import Login from './views/Login.vue'
// import Signup from './views/Signup.vue'
import NotFound from './views/NotFound.vue'
import Harkness from './components/Harkness.vue'
import AddClass from './components/AddClass.vue'
import AddHarkness from './components/AddHarkness.vue'
import firebase from 'firebase' // change

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'layout',
      component: Layout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '',
      name: 'authentication',
      component: Authentication
    },
    {
      path: '/harkness',
      name: 'harkness',
      component: Harkness,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name: 'addClass',
      component: AddClass,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new/harkness',
      name: 'addHarkness',
      component: AddHarkness,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('')
  else next()
})

export default router
