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
            <ResultadoBuscador ref="ResultadoBuscador" :socio="sociosFiltrados[actual-1]" />
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="2"
            order-md="last"
          >
            <Navegador />
            
            <Filtro ref="Filtros"/>
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
      ...mapState(['actual','socios','sociosFiltrados'])        
    },
    components: {
      ResultadoBuscador:() => import("@/components/ResultadoBuscador"),
      Navegador:() => import("@/components/Navegador"),
      Filtro:() => import("@/components/Filtro"), 
      PanelBusqueda: () => import('@/components/PanelBusqueda')     
    }
}
</script>



