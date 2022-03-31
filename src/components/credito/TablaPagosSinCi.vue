<template>
    <v-sheet 
      min-height="70vh"
      rounded="lg"
    >
        <v-data-table
        :headers="headers"
        :items="pagosSinCi"
        item-key="pseudoCi"
        ></v-data-table>

    </v-sheet>
</template>
<script>
import {mapState} from "vuex";
export default {
    data(){
        return {
            headers: [
                {
                    text: 'Folio',
                    value: 'nroFolio'
                },
                {
                    text: 'Cuota',
                    value: 'nroCuota'
                },
                {
                    text: 'Amortizacion',
                    value: 'amortizacion'
                },
                {
                    text: 'Interes',
                    value: 'interes'
                },
                {
                    text: 'Fecha',
                    value: 'fecha'
                }
            ],
        }
    },
    computed:{
        ...mapState("creditos", ["pagosSinCi"])
    },
    mounted(){
        this.$store.dispatch("creditos/fetchTodosLosPagosSinCi")

    }
}
</script>