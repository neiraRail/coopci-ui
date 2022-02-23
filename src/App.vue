<template>
  <v-app>
    <v-app-bar
      app
      color="#70C1B3"
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>
      <v-tabs
        centered
        class="ml-n9"
        color="#1D2F6F"
      >
        <v-tab
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          
        >
          {{ link.name }}
        </v-tab>
      </v-tabs>
      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
        @click="$router.push('/profile')"
      ></v-avatar>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <router-view/>
    </v-main>
    
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    links: [
      {name: 'Home', to: '/Home'},
      {name: 'Buscar', to: '/Buscador'},
      {name: 'Editar', to: '/Editor'},
      {name: 'Ingresos', to: '/Ingresos'},
      {name: 'Subir', to: '/Subir'}
      ]
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted(){
    //Buscar fecha actual para mantener guardada
    const meses = [
      {nombre: "Enero", nro: "1"},
      {nombre: "Febrero", nro: "2"},
      {nombre: "Marzo", nro: "3"},
      {nombre: "Abril", nro: "4"},
      {nombre: "Mayo", nro: "5"},
      {nombre: "Junio", nro: "6"},
      {nombre: "Julio", nro: "7"},
      {nombre: "Agosto", nro: "8"},
      {nombre: "Septiembre", nro: "9"},
      {nombre: "Octubre", nro: "10"},
      {nombre: "Noviembre", nro: "11"},
      {nombre: "Diciembre", nro: "12"},
    ]
    this.$store.commit('ingresos/setFiltroMes', meses[new Date().getMonth()])
    this.$store.commit('ingresos/setFiltroAño', new Date().getFullYear())
    console.log("Mounting...")

    
    if(!this.loggedIn){
      this.$router.push('/login');
    }

    // window.addEventListener('beforeunload', ()=>{
    //   console.log("logout")
    //   this.$store.dispatch('auth/logout')
    // })
  }
};
</script>


<style>


.nombre-dato{
  background-color: cornflowerblue;
}
</style>