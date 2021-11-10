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
    <TablasCuotasIngreso :ingreso="ingreso"/>
    </v-sheet>      
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed:{
    ...mapState('ingresos', ['ingresoActual', 'ingresosSeleccionados','ingresoEditado']),
    ingreso(){
      if(this.ingresosEditado){
              return this.ingresosEditado
            }
            else{
                this.$store.commit('ingresos/setIngresoEditado',{
                    ingresoId: '',
                    ingTitulo: '',
                    ingRut: '',
                    ingLugar: '',
                    ingFecha: '',
                    ingGlosa: '',
                    cuotaSocios: [],
                    cuotaCreditos: [],
                    detalleCuentas: []
                })
                return this.ingresoEditado
            }           
    }
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