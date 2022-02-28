<template>
  <v-sheet rounded="lg" min-height="160">
    <v-container>
      <v-row>              
        <v-col cols="12"><v-btn block @click="restablecerEdicion">Res</v-btn></v-col>
      </v-row>
      <v-row>
        <v-col cols="12"><v-btn block @click="guardar">Guardar</v-btn></v-col>
      </v-row>
      <br>
      <v-divider></v-divider>
      <br>
      <v-row>
        <v-col cols="12"><v-btn block @click="eliminar" color="error">Eliminar</v-btn></v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data(){
      return {
      }
    },
    methods: {
      guardar(){
        this.editarSocio()
        this.$router.push("/Buscador")
      },
      eliminar(){
        this.eliminarSocio()
      },
      ...mapActions('socios', ['restablecerEdicion', 'editarSocio', 'eliminarSocio'])
    }
}
</script>