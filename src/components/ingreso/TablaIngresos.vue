<template>
    <v-sheet 
        min-height="160"
        rounded="lg">
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="ingresosMes"
            item-key="ingresoId"
            :items-per-page="5"
            class="elevation-1"
            :footer-props="{
                disableItemsPerPage: true
            }"
            show-select
            no-data-text="No hay comprobantes este mes"
        >
        </v-data-table>
    </v-sheet>    
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
      return {
        headers: [
            {text: 'Nro CI', value: 'ingresoId'},
            {text: 'Titulo', value: 'ingTitulo'},
            {text: 'Fecha',  value: 'ingFecha'},
            {text: 'Total',  value: 'totalDebe'}
        ]
      }
    },
    computed:{
        selected: {
            get(){
                return this.$store.state.ingresosSeleccionados
            },
            set(value){
                this.$store.commit('setIngresosSeleccionados', value)
            }
        },
        ...mapState(["ingresosMes"])
    }
}
</script>