<template>
    <v-sheet
      min-height="70vh"
      rounded="lg"
    >
        <v-container>
            <v-row v-for="credito of creditos" :key="credito.nroFolio">
                <v-col>
                    <v-sheet rounded="lg" :color="credito.diasRetraso>0 ? 'red lighten-4': 'green lighten-4'" min-height="10vh">
                        <v-container>
                        <v-row class="text-caption">
                            <v-col cols="1">Folio</v-col>
                            <v-col cols="6">Nombre del socio</v-col>
                            <v-col >Nro de cuotas</v-col>
                            <v-col>Monto</v-col>
                        </v-row>
                        <v-row class="">
                            <v-col cols="1">{{credito.nroFolio}}</v-col>
                            <v-col cols="6">{{credito.socio.nombre1}} {{credito.socio.nombre2}} {{credito.socio.apellido1}} {{credito.socio.apellido2}}</v-col>
                            <v-col >{{credito.nro_cuotas}}</v-col>
                            <v-col>$ {{credito.montoEntregado}}</v-col>
                            
                        </v-row>
                        <v-row class="text-caption">
                            <v-col>Vencimiento</v-col>
                            <v-col >Ultima pagada</v-col>
                            <v-col >Dias Retraso</v-col>
                            <v-col>Cuotas atrasadas</v-col>
                            <v-col>Valor cuota</v-col>
                        </v-row>
                        <v-row>
                            <v-col>{{credito.fecha_vencimiento}}</v-col>
                            <v-col >{{credito.ultimaPagada}}</v-col>
                            <v-col >{{credito.diasRetraso}}</v-col>
                            <v-col>{{Math.floor(credito.diasRetraso/31)}}</v-col>
                            <v-col>$ {{credito.valor_cuota}}</v-col>
                        </v-row>
                        </v-container>
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
                credito.tablaDesarrollo = credito.tablaDesarrollo.sort((a,b)=>a.nro_cuota-b.nro_cuota)

                credito.ultimaPagada = Math.floor(credito.pagos.reduce((prv, curr)=>{
                    return prv + curr.interes + curr.amortizacion 
                }, 0) / credito.valor_cuota)

                let vencimiento = new Date(credito.tablaDesarrollo[credito.ultimaPagada].vencimiento)
                let difference = Date.now() - vencimiento.getTime()
                //Solo si es positivo
                let retraso = Math.floor(difference/(1000*3600*24))
                credito.diasRetraso = retraso > 0 ? retraso : 0

                //Codigo para calcular monto entregado. Esto deberia estar en la base de datos:
                credito.montoEntregado = credito.tablaDesarrollo.reduce((prv, curr)=>{
                    return prv + curr.interes
                }, 0)
            })
        })
    }
}
</script>