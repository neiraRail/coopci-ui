<template>
    <v-sheet rounded="lg" min-height="160">
    <v-container>
      <v-row>              
        <v-col cols="12">Cambiar orden</v-col>
        <v-col cols="12"><v-btn block @click="cambiarOrden">{{direccion}}</v-btn></v-col>
      </v-row>
      <v-row>
        <v-col cols="12"></v-col>
      </v-row>
      <br>
      <v-divider></v-divider>
      <br>
      <v-row>
        <v-col cols="12">Ordenar por:</v-col>
        <v-col cols="12"><v-btn :disabled="criterioOrden=='Retraso'" block @click="ordenarPorRetraso">Retraso</v-btn></v-col>
        <v-col cols="12"><v-btn :disabled="criterioOrden=='Folio'" block @click="ordenarPorFolio">Folio</v-btn></v-col>
        <v-col cols="12"><v-btn :disabled="criterioOrden=='Monto'" block @click="ordenarPorMonto">Monto</v-btn></v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            direccion: 'Ascendiente'
        }
    },
    computed:{
        ...mapState("creditos", ["criterioOrden"])
    },
    methods:{
        ordenarPorRetraso(){
            this.$store.commit("creditos/setCriterioOrden","Retraso")
            this.$store.commit("creditos/ordenarPorRetraso")
        },
        ordenarPorFolio(){
            this.$store.commit("creditos/setCriterioOrden","Folio")
            this.$store.commit("creditos/ordenarPorFolio")
        },
        ordenarPorMonto(){
            this.$store.commit("creditos/setCriterioOrden","Monto")
            this.$store.commit("creditos/ordenarPorMonto")
        },
        cambiarOrden(){
            this.direccion = this.direccion == "Ascendiente" ? "Descendiente":"Ascendiente"
            this.$store.commit("creditos/cambiarOrden")
        }
    }
}
</script>