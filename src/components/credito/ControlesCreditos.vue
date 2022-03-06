<template>
    
    <v-sheet rounded="lg" min-height="160">
    <v-container>
      <v-row>
        <v-col cols="12"><v-btn block @click.stop="mostrarDialogAbono">Pago abono</v-btn></v-col>
        <v-col cols="12"><v-btn block @click.stop="mostrarDialogNuevoCredito">Nuevo credito</v-btn></v-col>
      </v-row>
      <br>
      <v-divider></v-divider>
      <br>
      <v-row>              
        <v-col cols="12" class="text-center">Cambiar orden</v-col>
        <v-col cols="12"><v-btn block small @click="cambiarOrden">{{direccion}}</v-btn></v-col>
      </v-row>
      <br>
      <v-divider></v-divider>
      <br>
      <v-row>
        <v-col cols="12" class="text-center ">Ordenar por:</v-col>
        <v-col cols="12"><v-btn :disabled="criterioOrden=='Retraso'" block small @click="ordenarPorRetraso">Retraso</v-btn></v-col>
        <v-col cols="12"><v-btn :disabled="criterioOrden=='Folio'" block small @click="ordenarPorFolio">Folio</v-btn></v-col>
        <v-col cols="12"><v-btn :disabled="criterioOrden=='Monto'" block small @click="ordenarPorMonto">Monto</v-btn></v-col>
        <v-col cols="12"><v-btn :disabled="criterioOrden=='Saldo'" block small @click="ordenarPorSaldo">Saldo</v-btn></v-col>
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
        ordenarPorSaldo(){
          this.$store.commit("creditos/setCriterioOrden","Saldo")
          this.$store.commit("creditos/ordenarPorSaldo")
        },
        cambiarOrden(){
            this.direccion = this.direccion == "Ascendiente" ? "Descendiente":"Ascendiente"
            this.$store.commit("creditos/cambiarOrden")
        },
        mostrarDialogAbono(){
            this.$store.commit("creditos/setDialogAbono", true)
        },
        mostrarDialogNuevoCredito(){
            this.$store.commit("creditos/setDialogNuevoCredito", true)
        }
    }
}
</script>