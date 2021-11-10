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
                        <v-row v-for="(cuota, index) in ingresoEditado.cuotaSocios" :key="index">
                            <v-col md="2">
                              <v-text-field dense label="Nro Socio"
                                v-model.number="cuota.socioEntidad.nro_registro"
                                :rules="[!/([\D])/.test(ingresoEditado.cuotaSocios[index].socioEntidad.nro_registro)]"
                                @change="buscarSocio(cuota.socioEntidad.nro_registro, index)"
                              ></v-text-field>
                          </v-col>
                          <v-col md="4">{{cuota.socioEntidad.nombre1 +" "+ cuota.socioEntidad.nombre2 +" "+ cuota.socioEntidad.apellido1 +" "+cuota.socioEntidad.apellido2}} </v-col>
                          <v-col md="2">
                              <v-text-field dense label="Capital"
                                  v-model.number ="cuota.capitalPagado"
                                  :rules="[!/([\D])/.test(ingresoEditado.cuotaSocios[index].capitalPagado)]"
                              ></v-text-field>
                          </v-col>
                          <v-col md="2">
                              <v-text-field dense label="F. Solidario"
                                  v-model.number ="cuota.fondoSolidario"
                                  :rules="[!/([\D])/.test(ingresoEditado.cuotaSocios[index].fondoSolidario)]"
                              ></v-text-field>
                          </v-col>
                          <v-col md="2">
                              <v-text-field dense label="Cuota Social"
                                  v-model.number ="cuota.cuotaSocial"
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
                        <v-row v-for="(cuota, index) in ingresoEditado.cuotaCreditos" :key="index">
                          <v-col md="3">
                              <v-text-field dense label="Folio"
                                v-model="cuota.credito.creditoId"
                              ></v-text-field>
                          </v-col>
                          <v-col md="3">
                              <v-text-field dense label="Nro Cuota"
                                  v-model.number ="cuota.nroCuota"
                                  :rules="[!/([\D])/.test(ingresoEditado.cuotaCreditos[index].nroCuota)]"
                              ></v-text-field>
                          </v-col>
                          <v-col md="3">
                              <v-text-field dense label="Interes"
                                  v-model.number ="cuota.interes"
                                  :rules="[!/([\D])/.test(ingresoEditado.cuotaCreditos[index].interes)]"
                              ></v-text-field>
                          </v-col>
                          <v-col md="3">
                              <v-text-field dense label="Amort"
                                  v-model.number ="cuota.amortizacion"
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
import socioService from "../../services/socio.service";
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
        buscarSocio(id,index){
          socioService.get(id).then((response)=>{
            if(response.data.length == 0 || response.data === undefined){
              //Aqui prodia ir un mensaje especial
              console.log("len 0 o undefinedd")
              return ''
            }
            for(const atr in response.data){
              response.data[atr] = response.data[atr] || ""       
            }
            this.ingresoEditado.cuotaSocios[index].socioEntidad = response.data;
          })
        },
        agregarCuotaSocio(){
            this.ingresoEditado.cuotaSocios.push({
              socioEntidad: {
                nroRegistro: '',
                nombre1:'',
                nombre2:'',
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
        },
    },
    
})
</script>