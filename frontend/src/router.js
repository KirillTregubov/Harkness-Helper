import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'
import Focused from './views/Focused.vue'
import Harkness from './components/Harkness.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout
    },
    {
      path: '/login',
      name: 'login',
      component: Focused
    },
    {
      path: '/harkness',
      name: 'harkness',
      component: Harkness
    }/*,
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(webpackChunkName: "about" './views/About.vue')
    } */
  ]
})
