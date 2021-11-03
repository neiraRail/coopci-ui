import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/buscador',
    name: 'Buscador',
    component: function () {
      return import('../views/BuscadorSocios.vue')
    }
  },
  {
    path: '/editor',
    name: 'Editor',
    component: function () {
      return import('../views/EditorSocio.vue')
    }
  },
  {
    path: '/ingresos',
    name: 'Ingresos',
    component: function() {
      return import('../views/Ingresos.vue')
    }
  },
  {
    path: '/detalleingreso',
    name: 'DetalleIngreso',
    component: function() {
      return import('../views/DetalleIngreso.vue')
    }
  },
  
]

const router = new VueRouter({
  routes
})

export default router
