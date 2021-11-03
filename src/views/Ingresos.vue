<template>
  <v-sheet class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="2"
        >
          <AccionIngresos/>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="8"
          order-sm="12"
        >
          <TablaIngresos/>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="2"
          order-md="last"
        >
          <FiltrosIngresos/>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script>

import ingresoService from '@/services/ingreso.service'
export default {
    components: {
      TablaIngresos: () => import("@/components/ingreso/TablaIngresos"),
      FiltrosIngresos: () => import("@/components/ingreso/FiltrosIngresos"),
      AccionIngresos: () => import("@/components/ingreso/AccionIngresos")
    },
    methods:{
      fetchIngresos(){
        ingresoService.getAllByMes(1).then((response)=>{
          const reducerDebe = (pv, cv) => pv.debe + cv.debe
          const reducerHaber = (pv, cv) => pv.haber + cv.haber
          for(let ingreso of response.data){
            if(ingreso.detalleCuentas.length > 1){
              ingreso.totalDebe = ingreso.detalleCuentas.reduce(reducerDebe)
              ingreso.totalHaber = ingreso.detalleCuentas.reduce(reducerHaber)
            }
            else{
              ingreso.totalDebe = ingreso.detalleCuentas[0].debe
              ingreso.totalHaber = ingreso.detalleCuentas[0].haber
            }
          }
          this.$store.commit('setIngresosMes', response.data)
        })
      }
    },
    mounted(){
      this.$store.commit('resetIngresosSeleccionados')
      this.fetchIngresos()
    }
}
</script>