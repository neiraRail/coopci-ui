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

import { mapActions } from 'vuex'
export default {
    components: {
      TablaIngresos: () => import("@/components/ingreso/TablaIngresos"),
      FiltrosIngresos: () => import("@/components/ingreso/FiltrosIngresos"),
      AccionIngresos: () => import("@/components/ingreso/AccionIngresos")
    },
    methods:{
      ...mapActions('ingresos', ["fetchIngresosPorMes"]),
      fetchIngresos(){
        const mesActual = new Date().getMonth()
        const añoActual = new Date().getFullYear()
        console.log(añoActual)
        this.fetchIngresosPorMes({mes: mesActual, año: añoActual})
      }
    },
    mounted(){
      this.$store.commit('ingresos/resetIngresosSeleccionados')
      this.fetchIngresos()
    }
}
</script>