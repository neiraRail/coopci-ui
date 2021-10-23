import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/buscador',
    name: 'Buscador',
    component: function () {
      return import('../views/Buscador.vue')
    }
  },
  {
    path: '/editor',
    name: 'Editor',
    component: function () {
      return import('../views/Editor.vue')
    }
  }
  
]

const router = new VueRouter({
  routes
})

export default router
