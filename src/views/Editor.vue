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
          <CamposEdicion />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="2"
          order-md="last"
        >
        <v-sheet rounded="lg" min-height="160">
          <v-container>
            <v-row>              
              <v-col><v-btn block @click="recargar">Restablecer</v-btn></v-col>
            </v-row>
            <v-row>
              <v-col><v-btn block @click="editar">Guardar</v-btn></v-col>
            </v-row>
          </v-container>
        </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'
var cloneDeep = require('lodash.clonedeep');
export default {
  data(){
    return {
    }
  },
  components: {
    CamposEdicion: ()=>import('@/components/CamposEdicion')
  },
  computed: {
    estiloFondo(){
      return this.modoEditar ? 'grey lighten-1' : 'grey lighten-3'
    },
    ...mapState(['sociosFiltrados','actual'])
  },
  methods: {
    recargar(){
      let clone = cloneDeep(this.sociosFiltrados[this.actual-1])
      this.$store.commit("setSocioEditado", clone)
    },
    editar(){
      //Llamar a servicio editar.
      //Volver a fetchear los socios.
      alert("editado")
    }
  },
  mounted(){
    //inicializar socioEditado
    this.recargar()
  }
    
}
</script>