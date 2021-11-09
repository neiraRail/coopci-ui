<template>
    <v-sheet
      min-height="125"
      rounded="lg"
    >
      <v-container>
        <v-row>
          <v-col>
            <!-- Dialog -->
            <v-dialog
                v-model="dialogSocio"
                width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn block
                    color="blue lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >
                    Cuotas Socio
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title>
                    Agregar cuotas socio
                    </v-card-title>

                    <v-card-text >          
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Fin Dialog -->
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!-- Dialog -->
            <v-dialog
                v-model="dialogCred"
                width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn block
                    color="blue lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >
                    Cuotas Cred
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title>
                    Agregar cuotas crédito
                    </v-card-title>

                    <v-card-text > 
                        <v-container>
                          <v-row>
                            <v-col md="3">Folio</v-col>
                            <v-col md="3">Nro Cuota</v-col>
                            <v-col md="3">Interes</v-col>
                            <v-col md="3">Amortizacion</v-col>
                          </v-row>
                          <v-row v-for="(cuota, index) in ingresoEditado.cuotaCreditos" :key="index">
                            <v-col md="3">{{cuota.credito.creditoId}}</v-col>
                            <v-col md="3">{{cuota.nroCuota}}</v-col>
                            <v-col md="3"><v-text-field label="Amortizacion"></v-text-field></v-col>
                            <v-col md="3">Amortizacion</v-col>
                          </v-row>
                          <v-row>
                            <v-col md="2" >
                                <v-btn block @click="agregarCuotaCred">+</v-btn>
                            </v-col>
                            <v-col md="2" >
                                <v-btn block @click="quitarCuotaCred">-</v-btn>
                            </v-col>
                            <v-col md="8"></v-col>
                          </v-row>
                        </v-container>         
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Fin Dialog -->
          </v-col>
        </v-row>
      </v-container>                
    </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
    data(){
        return{
            dialogCred: false,
            dialogSocio: false
        }
    },
    computed:{
      ...mapState('ingresos',['ingresoEditado'])
    },
    methods:{
        agregarCuotaSocio(){
        },
        agregarCuotaCred(){
          this.ingresoEditado.cuotaCreditos.push({})
        }
    },
    
})
</script>