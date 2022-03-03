import Vue from 'vue'
import VueRouter from 'vue-router'


import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

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
  {
    path: '/editoringreso',
    name: "EditorIngreso",
    component: function() {
      return import('../views/EditorIngreso')
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/subir',
    name: 'subir',
    // lazy-loaded
    component: () => import('../views/SubirPlanilla.vue')
  },
  {
    path: '/resultadosubir',
    name: 'resultadosubir',
    // lazy-loaded
    component: () => import('../views/PlanillaSubida.vue'),
    props: true
  },
  {
    path: '/creditos',
    name: 'creditos',
    // lazy-loaded
    component: () => import('../views/VistaCreditos.vue')
  },
  {
    path: '/VerCredito',
    name: 'VerCredito',
    // lazy-loaded
    component: () => import('../views/VerCredito.vue'),
    props: true
  }
  
]

const router = new VueRouter({
  routes
})

export default router
