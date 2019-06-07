import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'
import Authentication from './views/Authentication.vue'
import NotFound from './views/NotFound.vue'
// change
import Harkness from './components/Harkness/Harkness.vue'
import AddHarkness from './components/Harkness/AddHarkness.vue'
import EditHarkness from './components/Harkness/EditHarkness.vue'
import AddClass from './components/Class/AddClass.vue'
import EditClass from './components/Class/EditClass.vue'
import About from './components/General/About.vue'
import firebase from 'firebase' // change

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'authentication',
      component: Authentication
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
    {
      path: '/dashboard',
      name: 'layout',
      component: Layout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/view/harkness',
      name: 'view-harkness',
      component: Harkness,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new/class',
      name: 'add-class',
      component: AddClass,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new/harkness',
      name: 'add-harkness',
      component: AddHarkness,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/class',
      name: 'edit-class',
      component: EditClass,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/harkness',
      name: 'edit-harkness',
      component: EditHarkness,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && currentUser) {
    // console.log('logged in')
    next()
  } else if (currentUser && to.path === '/') {
    // console.log('logged in trying to login')
    next('dashboard')
  } else if (!currentUser) {
    // console.log('need to log in')
    if (to.path !== '/') next('')
    else next()
  } else {
    // console.log('404')
    if (to.path !== '/*') next('*')
    else next()
  }
})

export default router
