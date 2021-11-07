<template>
    <v-sheet class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="2"
        >
          <v-row><v-col><AccionIngresos/></v-col></v-row>
          <v-row><v-col><CuotasPanel/></v-col></v-row>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="8"
          order-sm="12"
        >
          <FormIngreso/>   
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="2"
          order-md="last"
        >
          <PresetsPanel/> 
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
    ...mapState('ingresos', ['ingresoActual', 'ingresosSeleccionados'])
  },
    components:{
        FormIngreso: ()=> import('@/components/ingreso/FormIngreso'),
        PresetsPanel: ()=> import('@/components/ingreso/PresetsPanel'),
        AccionIngresos: ()=> import('@/components/ingreso/AccionIngresos'),
        TablasCuotasIngreso: ()=> import('@/components/ingreso/TablasCuotasIngreso'),
        CuotasPanel: ()=> import('@/components/ingreso/CuotasPanel')
    }
}
</script>