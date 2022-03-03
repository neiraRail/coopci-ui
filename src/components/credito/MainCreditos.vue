<template>
    <v-sheet
      min-height="70vh"
      rounded="lg"
    >
        <v-dialog
            v-model="cargando"
            hide-overlay
            persistent
            width="300"
        >
        <v-card
            color="primary"
            dark
        >
            <v-card-text>
                Solicitando informacion...
            <v-progress-linear
                indeterminate
                color="white"
                class="mb-1"
            ></v-progress-linear>
            </v-card-text>
        </v-card>
        </v-dialog>
        <v-container>
            <v-row v-for="credito of creditos" :key="credito.nroFolio" >
                <v-col>
                    <v-hover v-slot="{ hover }">
                    <v-sheet rounded="lg" :color="color(credito.diasRetraso)" min-height="10vh" :elevation="hover ? 12:2" @click="verCredito(credito)"
                    >
                        <v-container >
                        <v-row class="text-caption">
                            <v-col cols="1">Folio</v-col>
                            <v-col cols="6" class="text-center">Nombre del socio</v-col>
                            <v-col class="text-right">Nro de cuotas</v-col>
                            <v-col class="text-right">Monto</v-col>
                        </v-row>
                        <v-row class="">
                            <v-col cols="1">{{credito.nroFolio}}</v-col>
                            <v-col cols="6" class="text-center">{{credito.socio.nombre1}} {{credito.socio.nombre2}} {{credito.socio.apellido1}} {{credito.socio.apellido2}}</v-col>
                            <v-col class="text-right">{{credito.nro_cuotas}}</v-col>
                            <v-col class="text-right">$ {{credito.montoEntregado}}</v-col>
                            
                        </v-row>
                        <v-row class="text-caption">
                            <v-col cols="3" class="text-center">Vencimiento sig. cuota</v-col>
                            <v-col cols="2" class="text-right">Ultima pagada</v-col>
                            <v-col cols="2" class="text-right">Dias Retraso</v-col>
                            <v-col class="text-right">Cuotas atrasadas</v-col>
                            <v-col class="text-right">Valor cuota</v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="3" class="text-center">{{credito.tablaDesarrollo[credito.ultimaPagada].vencimiento}}</v-col>
                            <v-col cols="2" class="text-right">{{credito.ultimaPagada}}</v-col>
                            <v-col cols="2" class="text-right">{{credito.diasRetraso}}</v-col>
                            <v-col class="text-right">{{Math.floor(credito.diasRetraso/30)}}</v-col>
                            <v-col class="text-right">$ {{credito.valor_cuota}}</v-col>
                        </v-row>
                        </v-container>
                    </v-sheet>
                    </v-hover>
                </v-col> 
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
import creditoService from '@/services/credito.service'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            creditos: []
        }
    },
    methods:{
        color(dias){
            if(dias > 500) return 'red lighten-1'
            if(dias > 300) return 'red lighten-2'
            if(dias > 100) return 'red lighten-3'
            if(dias > 0) return 'red lighten-4'
            if(dias == 0) return 'green lighten-4'
        },
        verCredito(credito){
            console.log(credito.nroFolio)
            this.$router.push({name: "VerCredito", params: {credito: credito}})
        }
    },
    computed:{
        ...mapState(["cargando"])
    },
    mounted(){
        this.$store.commit("setCargando", true)
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
            
            this.creditos = this.creditos.sort((a,b) => b.diasRetraso-a.diasRetraso)
            this.$store.commit("setCargando", false)
        })
    }
}
</script>
