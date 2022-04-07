<template>
    <v-sheet 
      min-height="70vh"
      rounded="lg"
    >
        <v-container>
            <v-row>
                <v-col v-for="item, index of pagosSinCi" :key="index">
                    <v-card width="295">
                        <v-card-actions>
                            <v-container>
                            <v-row>
                            <v-col>
                                <v-text-field 
                                    dense 
                                    label="Nro CI" 
                                    v-model="item.ciAsignado"
                                    :rules="[!/([\D])/.test(item.ciAsignado)]"
                                ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-btn 
                                    @click="asignar(item)"
                                    :disabled="!!!item.ciAsignado"
                                    >Asignar</v-btn></v-col>
                            </v-row>
                            </v-container>
                        </v-card-actions>
                        <v-card-title>Folio {{item[0].nroFolio}}</v-card-title>
                        <v-card-text>
                                <v-row>
                                    <v-col cols="2"><b>C</b></v-col>
                                    <v-col cols="3"><b>Int</b></v-col>
                                    <v-col cols="3"><b>Amt</b></v-col>
                                    <v-col cols="4"><b>Fecha</b></v-col>
                                </v-row>
                                <v-row v-for="pago, index of item" :key="index">
                                    <v-col cols="2">{{pago.nroCuota}}</v-col>
                                    <v-col cols="3">{{pago.interes}}</v-col>
                                    <v-col cols="3">{{pago.amortizacion}}</v-col>
                                    <v-col cols="4">{{pago.fecha}}</v-col>
                                </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    computed:{
        pagosSinCi:{
            get(){
                return this.$store.state.creditos.pagosSinCi
            },
            set(value){
                this.$store.commit("creditos/setPagosSinCi", value)
            }
        }
    },
    methods:{
        asignar(item){
            this.$store.dispatch("creditos/asignarCi", item)
        }
    },
    mounted(){
        this.$store.dispatch("creditos/fetchTodosLosPagosSinCi")

    }
}
</script>