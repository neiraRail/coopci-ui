<template>
    <v-sheet v-if="creditos.length > 2"
      min-height="70vh"
      rounded="lg"
    >
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
                                    v-model="abono.nro_folio" label="Folio" type="number"
                                    :rules="[() => !!abono.nro_folio || 'Obligatorio']"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field 
                                    v-model="abono.nro_ci" label="CI" type="number"
                                    :rules="[() => !!abono.nro_ci || 'Obligatorio']"
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
                                @change="cuotasSimuladas = []"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="cuotasSimuladas.length>0">
                            <v-data-table
                                :headers="[
                                    {text: 'Nro Cuota', value: 'nroCuota'},
                                    {text: 'Interes', value: 'interes'},
                                    {text: 'Amortizacion',  value: 'amortizacion'}
                                ]"
                                :items="cuotasSimuladas"
                                item-key="nroCuota"
                                ></v-data-table>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn :disabled="!!!abono.nro_folio && !!!abono.nro_ci && !!!abono.monto && !!!abono.fecha" @click="limpiarAbono">Limpiar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="$store.commit('creditos/setDialogAbono', false)">Salir</v-btn>
                    <v-btn v-if="cuotasSimuladas.length==0" @click="simularAbono" color="blue">Continuar</v-btn>
                    <v-btn v-if="cuotasSimuladas.length>0" @click="guardarAbono" color="green">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="dialogNuevoCredito"
            persistent
            
            max-width="600"
        >
            <v-card>
                <v-card-title>Nuevo Credito</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="3">
                                <v-text-field 
                                    v-model="creditoNuevo.nroFolio" label="Folio" type="number"
                                    :rules="[() => !!creditoNuevo.nroFolio || 'Obligatorio']"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field 
                                    v-model="creditoNuevo.socio" label="Nro de socio"
                                    :rules="[() => !!creditoNuevo.socio || 'Obligatorio']"
                                    ></v-text-field>
                            </v-col>
                            <v-col >
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
                                        v-model="creditoNuevo.fecha_otorgamiento"
                                        label="Fecha otorgamiento"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[() => !!creditoNuevo.fecha_otorgamiento || 'Obligatorio']"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="creditoNuevo.fecha_otorgamiento"
                                    @input="menuFecha = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <v-text-field 
                                    v-model="creditoNuevo.interes" label="Interes" type="number"
                                    suffix="%"
                                    :rules="[() => !!creditoNuevo.interes || 'Obligatorio']"
                                    ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field 
                                    v-model="creditoNuevo.nro_cuotas" label="Nro cuotas" type="number"
                                    :rules="[() => !!creditoNuevo.nro_cuotas || 'Obligatorio']"
                                    ></v-text-field>
                            </v-col>
                            <v-col >
                                <v-text-field 
                                    v-model="creditoNuevo.monto" label="Monto entregado" type="number"
                                    prefix="$"
                                    :rules="[() => !!creditoNuevo.monto || 'Obligatorio']"
                                    ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="$store.commit('creditos/setDialogNuevoCredito', false)">Salir</v-btn>
                    <v-btn @click="guardarCredito">Continuar</v-btn>
                </v-card-actions>
            </v-card>    
        </v-dialog>
    </v-sheet>
</template>

<script>

import { mapState} from 'vuex'
import creditoService from '@/services/credito.service'
export default {
    data(){
        return {
            menuFecha: false,
            abono: {
                nro_folio: '',
                nro_ci: '',
                fecha: '',
                monto: ''
            },
            cuotasSimuladas: [],
            creditoNuevo: {
                nroFolio: '',
                socio: '',
                nro_cuotas: '',
                monto: '',
                interes: '',
                fecha_otorgamiento: ''
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
        },
        simularAbono(){
            //Se llama al servicio localmente porque no es necesario actualizar
            //ninguno de los states.
            this.$store.commit("setCargando", true)
            creditoService.simularAbono(this.abono).then((response)=>{
                console.log(response)
                this.cuotasSimuladas = response.data;
                this.$store.commit("setCargando", false)
            }).catch((error)=>{
                console.log(error)
                this.$store.commit("setCargando", false)
            })
        },
        guardarAbono(){
            //Llamar a servicio a través del store porque es necesario actualizar los creditos
            //despues de esta operación
            this.$store.dispatch("creditos/guardarAbono", this.abono)
            this.$store.commit("creditos/setDialogAbono", false)
        },
        guardarCredito(){
            //Llamar a servicio a través del store porque es necesario actualizar los creditos
            //despues de esta operación
            this.$store.dispatch("creditos/guardarCredito", this.creditoNuevo)
            this.$store.commit("creditos/setDialogNuevoCredito", false)
        },
        limpiarAbono(){
            this.abono = {
                nro_folio: '',
                nro_ci: '',
                fecha: '',
                monto: ''
            }
            this.cuotasSimuladas = [];
        }
    },
    computed:{
        ...mapState("creditos",["creditos", "criterioOrden", "dialogAbono", "dialogNuevoCredito"])
    },
    mounted(){
        this.$store.dispatch("creditos/fetchTodosLosCreditos")
        
    }
}
</script>
