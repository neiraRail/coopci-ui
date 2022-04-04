<template>
    <v-sheet 
      min-height="70vh"
      rounded="lg"
    >
        <v-container>
            <v-row>
                <v-col v-for="item, index of pagosSinCi" :key="index">
                    <v-card>
                        <v-card-title></v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col>C</v-col>
                                    <v-col>Int</v-col>
                                    <v-col>Amt</v-col>
                                    <v-col>Fecha</v-col>
                                </v-row>
                                <v-row v-for="pago, index of item" :key="index">
                                    <v-col>{{pago.nroCuota}}</v-col>
                                    <v-col>{{pago.interes}}</v-col>
                                    <v-col>{{pago.amortizacion}}</v-col>
                                    <v-col>{{pago.fecha}}</v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn>OK</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>
<script>
import {mapState} from "vuex";
export default {
    data(){
        return {
            
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