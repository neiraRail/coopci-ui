<template>
    <v-sheet v-if="creditos.length > 2"
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
                            <v-col cols="1" :class="criterioOrden=='Folio' ? 'font-weight-black':''">Folio</v-col>
                            <v-col cols="6" class="text-center">Nombre del socio</v-col>
                            <v-col class="text-right">Nro de cuotas</v-col>
                            <v-col class="text-right" :class="criterioOrden=='Monto' ? 'font-weight-black':''">Monto</v-col>
                            <v-col class="text-right" :class="criterioOrden=='Saldo' ? 'font-weight-black':''">Saldo</v-col>
                        </v-row>
                        <v-row class="">
                            <v-col cols="1" :class="criterioOrden=='Folio' ? 'font-weight-black':''">{{credito.nroFolio}}</v-col>
                            <v-col cols="6" class="text-center">{{credito.socio.nombre1}} {{credito.socio.nombre2}} {{credito.socio.apellido1}} {{credito.socio.apellido2}}</v-col>
                            <v-col class="text-right">{{credito.nro_cuotas}}</v-col>
                            <v-col class="text-right" :class="criterioOrden=='Monto' ? 'font-weight-black':''">$ {{credito.monto}}</v-col>
                            <v-col class="text-right" :class="criterioOrden=='Saldo' ? 'font-weight-black':''">$ {{credito.saldo}}</v-col>
                        </v-row>
                        <v-row class="text-caption">
                            <v-col cols="3" class="text-center">Vencimiento sig. cuota</v-col>
                            <v-col cols="2" class="text-center" :class="criterioOrden=='Retraso' ? 'font-weight-black':''">Dias Retraso</v-col>
                            <v-col cols="2" class="text-right">Ultima pagada</v-col>
                            <v-col class="text-right">Cuotas faltantes</v-col> 
                            <v-col class="text-right">Cuotas atrasadas</v-col>
                            <v-col class="text-right">Valor cuota</v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="3" class="text-center">{{credito.tablaDesarrollo[credito.ultimaPagada].vencimiento}}</v-col>
                            <v-col cols="2" class="text-center" :class="criterioOrden=='Retraso' ? 'font-weight-black':''">{{credito.diasRetraso}}</v-col>
                            <v-col cols="2" class="text-right">{{credito.ultimaPagada}}</v-col>
                            <v-col class="text-right">{{credito.nro_cuotas - credito.ultimaPagada}}</v-col>
                            <v-col class="text-right">{{Math.floor(credito.diasRetraso/30)}}</v-col>
                            <v-col class="text-right">$ {{credito.valor_cuota}}</v-col>
                        </v-row>
                        </v-container>
                    </v-sheet>
                    </v-hover>
                </v-col> 
            </v-row>
        </v-container>
        <v-dialog
            v-model="dialogAbono"
            persistent
            max-width="600"
        >
            <v-card>
                <v-card-title>Abono</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="2">
                                <v-text-field 
                                    v-model="abono.folio" label="Folio" type="number"
                                    :rules="[() => !!abono.folio || 'Obligatorio']"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field 
                                    v-model="abono.ci" label="CI" type="number"
                                    :rules="[() => !!abono.ci || 'Obligatorio']"
                                    ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-menu
                                    v-model="menuFecha"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="abono.fecha"
                                        label="Fecha"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[() => !!abono.fecha || 'Obligatorio']"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="abono.fecha"
                                    @input="menuFecha = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col>
                                <v-text-field 
                                v-model="abono.monto" label="Abono" type="number" prefix="$"
                                :rules="[() => !!abono.monto || 'Obligatorio']"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="$store.commit('creditos/setDialogAbono', false)">Salir</v-btn>
                    <v-btn>Continuar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialogNuevoCredito"
            persistent
        >
            <v-card>
                <v-card-title>Nuevo Credito</v-card-title>
            </v-card>    
        </v-dialog>
    </v-sheet>
</template>

<script>

import { mapState } from 'vuex'
export default {
    data(){
        return {
            menuFecha: false,
            abono: {
                folio: '',
                ci: '',
                fecha: '',
                monto: ''
            }

        }
    },
    methods:{
        color(dias){
            if(dias > 90) return 'red lighten-3'
            if(dias > 16) return 'red lighten-4'
            if(dias > 0) return 'green lighten-4'
            else return 'green lighten-4'
        },
        verCredito(credito){
            console.log(credito.nroFolio)
            this.$router.push({name: "VerCredito", params: {credito: credito}})
        }
    },
    computed:{
        ...mapState(["cargando"]),
        ...mapState("creditos",["creditos", "criterioOrden", "dialogAbono", "dialogNuevoCredito"])
    },
    mounted(){
        this.$store.dispatch("creditos/fetchTodosLosCreditos")
        
    }
}
</script>
