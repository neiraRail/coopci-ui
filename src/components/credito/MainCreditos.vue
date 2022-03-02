<template>
    <v-sheet
      min-height="70vh"
      rounded="lg"
    >
        <v-container>
            <v-row v-for="credito of creditos" :key="credito.nroFolio">
                <v-col>
                    <v-sheet rounded="lg" color="red lighten-4" min-height="10vh">
                        <v-row>
                            <v-col cols="1">{{credito.nroFolio}}</v-col>
                            <v-col cols="8">{{credito.socio.nombre1}} {{credito.socio.nombre2}} {{credito.socio.apellido1}} {{credito.socio.apellido2}}</v-col>
                            <v-col cols="1">{{credito.nro_cuotas}}</v-col>
                            <v-col cols="1">{{credito.ultimaPagada}}</v-col>
                            <v-col cols="1">{{credito.diasRetraso}}</v-col>
                        </v-row>
                        
                    </v-sheet>
                </v-col> 
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
import creditoService from '@/services/credito.service'
export default {
    data(){
        return {
            creditos: []
        }
    },
    mounted(){
        creditoService.getAll().then((response)=>{
            this.creditos = response.data
            this.creditos.forEach((credito)=>{
                credito.ultimaPagada = Math.floor(credito.pagos.reduce((prv, curr)=>{
                    return prv + curr.interes + curr.amortizacion 
                }, 0) / credito.valor_cuota)

                let vencimiento = new Date(credito.tablaDesarrollo[credito.ultimaPagada].vencimiento)
                credito.tablaDesarrollo = credito.tablaDesarrollo.sort((a,b)=>a.nro_cuota-b.nro_cuota)
                let difference = Date.now() - vencimiento.getTime()
                credito.diasRetraso = difference/(1000*3600*24)
            })
        })
    }
}
</script>