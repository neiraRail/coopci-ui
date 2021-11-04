<template>
    <v-container>
      <v-row>
        <v-col>
          <v-sheet rounded="lg">
            <v-data-table
              v-if="ingreso.cuotaSocios.length>0"
              hide-default-footer
              no-data-text="Sin cuotas"
              :headers="headerSocio"
              :items="ingreso.cuotaSocios"
            ></v-data-table>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet rounded="lg">
            <v-data-table
              v-if="ingreso.cuotaCreditos.length>0"
              hide-default-footer
              no-data-text="Sin credito"
              :headers="headerCredito"
              :items="ingreso.cuotaCreditos"
            ></v-data-table>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            headerCredito: [
                {text: 'Folio', value: 'credito.creditoId'},
                {text: 'Nro Cuota', value: 'nroCuota'},
                {text: 'Interés', value: 'interes'},
                {text: 'Amortizacion', value: 'amortizacion'}
            ],
            headerSocio: [
                {text: 'Numero', value: 'socioEntidad.nro_registro'},
                {text: 'Nombre', value: 'socioEntidad.nombre1'},
                {text: 'Capital Pagado', value: 'capitalPagado'},
                {text: 'Fondo Solidario', value: 'fondoSolidario'},
                {text: 'Otros Ingresos', value: 'cuotaSocial'},
                {text: 'Nro cuotas', value: 'nroCuotas'},
            ]
        }
    },
    computed:{
        ...mapState(['ingresosSeleccionados', 'ingresoActual']),
        ingreso(){
            if(this.$store.state.ingresosSeleccionados.length>=1){
                return this.ingresosSeleccionados[this.ingresoActual-1]
            }
            else{
                return [{
                    "ingresoId": '',
                    "ingTitulo": '',
                    "ingRut": '',
                    "ingLugar": '',
                    "ingFecha": '',
                    "ingGlosa": '',
                    "cuotaSocios": [],
                    "cuotaCreditos": [],
                    "detalleCuentas": []
                }]
            }            
        }
    }    
}
</script>