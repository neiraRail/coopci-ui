<template>
  <v-sheet class="grey lighten-3">
      <v-container >
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="2"
          >
            <PanelBusqueda @fetch="limpiarFiltros"/>

          </v-col>

          <v-col
            cols="12"
            sm="12"
            md="8"
            order-sm="12"
          >
            <ResultadoBuscador ref="ResultadoBuscador" :socio="sociosFiltrados[socioActual-1]" />
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="2"
            order-md="last"
          >
            <Navegador />
            
            <Filtro ref="Filtros"/>

            <Adicional />
          </v-col>
        </v-row>
      </v-container>
  </v-sheet>
</template>


<script>
import { mapState } from 'vuex'

export default {
    data(){
      return{
      }
    },
    methods:{
      limpiarFiltros(){
        this.$refs.Filtros.limpiarFiltros()
      },    
    },
    computed: {        
      ...mapState('socios',['socioActual','socios','sociosFiltrados']),
      currentUser() {
        return this.$store.state.auth.user;
      }       
    },
    components: {
      ResultadoBuscador:() => import("@/components/socio/ResultadoBuscador"),
      Navegador:() => import("@/components/socio/Navegador"),
      Filtro:() => import("@/components/socio/Filtro"), 
      PanelBusqueda: () => import('@/components/socio/PanelBusqueda'),
      Adicional: () => import('@/components/socio/PanelAdicional')     
    },
    mounted(){
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    }
}
</script>



