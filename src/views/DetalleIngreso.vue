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
           <VerIngreso :ingreso="ingresosSeleccionados[ingresoActual-1]"/>   
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="2"
          order-md="last"
        >
          <NavegadorIngresos/> 
        </v-col>
      </v-row>
    </v-container>
    <TablasCuotasIngreso/>
    </v-sheet>      
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed:{
    ...mapState(['ingresoActual', 'ingresosSeleccionados'])
  },
    components:{
        VerIngreso: ()=> import('@/components/ingreso/VerIngreso'),
        NavegadorIngresos: ()=> import('@/components/ingreso/NavegadorIngresos'),
        AccionIngresos: ()=> import('@/components/ingreso/AccionIngresos'),
        TablasCuotasIngreso: ()=> import('@/components/ingreso/TablasCuotasIngreso')
    }
}
</script>