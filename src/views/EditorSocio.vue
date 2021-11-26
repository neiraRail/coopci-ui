<template>
  <v-sheet :class="estiloFondo">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="2"
        >
        <v-sheet rounded="lg" min-height="160">
          
        </v-sheet>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="8"
          order-sm="12"
        >
          <CamposEdicion v-if="currentUser"/>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="2"
          order-md="last"
        >
          <ControlesEdicion />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data(){
    return {
    }
  },
  components: {
    CamposEdicion: () => import("@/components/socio/CamposEdicion"),
    ControlesEdicion: () => import("@/components/socio/ControlesEdicion")
  },
  computed: {
    estiloFondo(){
      return this.modoEditar ? 'grey lighten-1' : 'grey lighten-3'
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    ...mapState('socios', ['sociosFiltrados','socioActual'])
  },
  methods: {
    ...mapActions('socios', ["restablecerEdicion"])
  },
  mounted(){
    if (!this.currentUser) {
      this.$router.push('/login');
    }else{
      //inicializar socioEditado 
      this.restablecerEdicion();  
    }
     
  }    
}
</script>