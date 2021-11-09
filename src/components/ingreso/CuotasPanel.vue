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
                width="800"
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

                    <v-card-text>
                      <v-container>
                        <v-row class="full">
                            <v-col md="2" class="ingCol left"><b>Nro socio</b></v-col>
                            <v-col md="2"><b>Nombre</b></v-col>
                            <v-col md="2" class="ingCol"><b>Capital</b></v-col>
                            <v-col md="2"><b>Fondo</b></v-col>
                            <v-col md="2" class="ingCol"><b>Social</b></v-col>
                            <v-col md="2"><b>Nro cuotas</b></v-col>
                        </v-row>

                        <v-row v-for="(cuota, index) in ingresoEditado.cuotaSocios" :key="index">
                            <v-col md="2" class="ingCol left field">
                              <v-text-field dense></v-text-field>
                          </v-col>
                          <v-col md="2">{{cuota.socioEntidad.nombre1}} </v-col>
                          <v-col md="2" class="ingCol field">
                              <v-text-field
                                  v-model.number ="cuota.capitalPagado"
                                  dense
                                  :rules="[!/([\D])/.test(ingresoEditado.cuotaSocios[index].capitalPagado)]"
                              ></v-text-field>
                          </v-col>
                          <v-col md="2" class="field">
                              <v-text-field
                                  v-model.number ="cuota.fondoSolidario"
                                  dense
                                  :rules="[!/([\D])/.test(ingresoEditado.cuotaSocios[index].fondoSolidario)]"
                              ></v-text-field>
                          </v-col>
                          <v-col md="2" class="field">
                              <v-text-field
                                  v-model.number ="cuota.cuotaSocial"
                                  dense
                                  :rules="[!/([\D])/.test(ingresoEditado.cuotaSocios[index].cuotaSocial)]"
                              ></v-text-field>
                          </v-col>
                        </v-row>
                        
                        <v-row class="full">
                          <v-col md="2" class="ingCol left"><v-btn @click="agregarCuotaSocio">Agregar</v-btn></v-col>
                          <v-col md="2" class="ingCol left"><v-btn @click="quitarCuotaSocio">Quitar</v-btn></v-col>
                        </v-row>
                      </v-container>
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
                        <v-row class="full">
                            <v-col md="3" class="ingCol left"><b>Folio</b></v-col>
                            <v-col md="3"><b>Nro cuota</b></v-col>
                            <v-col md="3" class="ingCol"><b>Interes</b></v-col>
                            <v-col md="3"><b>Amortizacion</b></v-col>
                        </v-row>
                        <v-row v-for="(cuota, index) in ingresoEditado.cuotaCreditos" :key="index">
                          <v-col md="3" class="ingCol left field">
                              <v-text-field dense label="Folio"></v-text-field>
                          </v-col>
                          <v-col md="3" class="ingCol field">
                              <v-text-field
                                  v-model.number ="cuota.nroCuota"
                                  dense
                                  :rules="[!/([\D])/.test(ingresoEditado.cuotaCreditos[index].nroCuota)]"
                              ></v-text-field>
                          </v-col>
                          <v-col md="3" class="field">
                              <v-text-field
                                  v-model.number ="cuota.interes"
                                  dense
                                  :rules="[!/([\D])/.test(ingresoEditado.cuotaCreditos[index].interes)]"
                              ></v-text-field>
                          </v-col>
                          <v-col md="3" class="field">
                              <v-text-field
                                  v-model.number ="cuota.amortizacion"
                                  dense
                                  :rules="[!/([\D])/.test(ingresoEditado.cuotaCreditos[index].amortizacion)]"
                              ></v-text-field>
                          </v-col>
                        </v-row>

                        
                        <v-row class="full">
                          <v-col md="3" class="ingCol left"><v-btn @click="agregarCuotaCredito">Agregar</v-btn></v-col>
                          <v-col md="3" class="ingCol left"><v-btn @click="quitarCuotaCredito">Quitar</v-btn></v-col>
                        </v-row>
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
export default Vue.extend({
    data(){
        return{
            dialogCred: false,
            dialogSocio: false,
            ingresoEditado: {
                ingresoId: '',
                ingTitulo: '',
                ingRut: '',
                ingLugar: 'Temuco',
                ingFecha: '',
                ingGlosa: '',
                cuotaSocios: [],
                cuotaCreditos: [],
                detalleCuentas: []
            },
        }
    },
    watch:{
        ingresoEditado: {
            handler(val){
                //Guardar ingresoEditado en store
                this.$store.commit('ingresos/setIngresoEditado', val)
            },
            deep: true            
        },
        '$store.state.ingresos.ingresoEditado':{
            handler(val){
                this.ingresoEditado = val;
            },
            deep: true
        }
    },
    methods:{
        agregarCuotaSocio(){
            this.ingresoEditado.cuotaSocios.push({
              socioEntidad: {
                nroRegistro: '',
                nombre1:'',
                nombre2: '',
                apellido1: '',
                apellido2: ''
              },
              capitalPagado: '',
              fondoSolidario: '',
              cuotaSocial: '',
              nroCuota: ''
            })
        },
        quitarCuotaSocio(){
          this.ingresoEditado.cuotaSocios.pop()
        },
        agregarCuotaCredito(){
          this.ingresoEditado.cuotaCreditos.push({
            credito:{
              creditoId: ''
            },
            nroCuota: '',
            interes: '',
            amortizacion: ''
          })
        },
        quitarCuotaCredito(){
          this.ingresoEditado.cuotaCreditos.pop()
        }
    },
    
})
</script>