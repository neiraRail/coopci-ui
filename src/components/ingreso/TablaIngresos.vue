<template>
    <v-sheet 
        min-height="160" 
        class="panel-filtros"
        rounded="lg">
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="ingresos"
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
export default {
    data(){
      return {
        headers: [
            {text: 'Nro CI', value: 'ingresoId'},
            {text: 'Titulo', value: 'ingTitulo'},
            {text: 'Fecha',  value: 'ingFecha'},
            {text: 'Total',  value: 'total'}
        ],
        ingresos: [],
        selected: []
      }
    },
    methods:{
        fetchIngresos(){
            ingresoService.getAllByMes(1).then((response)=>{
                this.ingresos = response.data
                const reducer = (pv, cv) => pv.debe + cv.debe
                for(let ingreso of this.ingresos){
                    if(ingreso.detalleCuentas.length > 1){
                        ingreso.total = ingreso.detalleCuentas.reduce(reducer)
                    }
                    else{
                        ingreso.total = ingreso.detalleCuentas[0].debe
                    }                    
                    console.log(ingreso.total)
                }                

            })
        }
    },
    mounted(){
        this.fetchIngresos()
    }
}
</script>