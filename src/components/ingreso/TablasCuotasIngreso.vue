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
export default {
  props: ['ingreso'],
    data(){
        return{
            headerCredito: [
                {text: 'Folio', value: 'credito.creditoId', class: 'accent'},
                {text: 'Nro Cuota', value: 'nroCuota', class: 'accent'},
                {text: 'Interés', value: 'interes', class: 'accent'},
                {text: 'Amortizacion', value: 'amortizacion', class: 'accent'}
            ],
            headerSocio: [
                {text: 'Numero', value: 'socioEntidad.nro_registro', class: 'accent'},
                {text: 'Nombre', value: 'socioEntidad.nombre1', class: 'accent'},
                {text: 'Capital Pagado', value: 'capitalPagado', class: 'accent'},
                {text: 'Fondo Solidario', value: 'fondoSolidario', class: 'accent'},
                {text: 'Otros Ingresos', value: 'cuotaSocial', class: 'accent'},
                {text: 'Nro cuotas', value: 'nroCuotas', class: 'accent'},
            ]
        }
    }, 
}
</script>