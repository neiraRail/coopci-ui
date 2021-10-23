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
      ]
  }),
};
</script>


<style>


.nombre-dato{
  background-color: cornflowerblue;
}
</style>