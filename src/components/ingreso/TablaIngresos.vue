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
        >
        </v-data-table>
    </v-sheet>    
</template>

<script>
import ingresoService from '@/services/ingreso.service'
import { mapState } from 'vuex'
export default {
    data(){
      return {
        headers: [
            {text: 'Nro CI', value: 'ingresoId'},
            {text: 'Titulo', value: 'ingTitulo'},
            {text: 'Fecha',  value: 'ingFecha'},
            {text: 'Total',  value: 'total'}
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
    },
    methods:{
        fetchIngresos(){
            ingresoService.getAllByMes(1).then((response)=>{
                const reducer = (pv, cv) => pv.debe + cv.debe
                for(let ingreso of response.data){
                    if(ingreso.detalleCuentas.length > 1){
                        ingreso.total = ingreso.detalleCuentas.reduce(reducer)
                    }
                    else{
                        ingreso.total = ingreso.detalleCuentas[0].debe
                    }
                }
                this.$store.commit('setIngresosMes', response.data)
            })
        }
    },
    mounted(){
        this.fetchIngresos()
    }
}
</script>