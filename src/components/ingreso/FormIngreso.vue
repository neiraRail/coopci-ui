<template>
    <v-sheet 
        min-height="160"
        rounded="lg">
        <v-container>
            <v-row class="ingHeader full">
                <v-col md="9"><center><h2>Comprobante de Ingreso</h2></center></v-col>
                <v-col md="1" class="ingCol"><p>Nro</p></v-col>
                <v-col md="2" class="field">
                    <v-text-field
                        v-model="ingresoEditado.ingresoId"
                        dense
                        type="number"
                        :rules="[!/([\D])/.test(ingresoEditado.ingresoId)]"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row class="ingHeader mid">
                <v-col md="2"  class="ingCol left">Nombre</v-col>
                <v-col md="5" class="field">
                    <v-text-field
                        v-model="ingresoEditado.ingTitulo"
                        dense
                        :rules="[!/[^a-z ]/i.test(ingresoEditado.ingTitulo)]"
                    ></v-text-field>
                </v-col>
                <v-col md="1"  class="ingCol">Rut</v-col>
                <v-col md="4" class="field">
                    <v-text-field
                        v-model="ingresoEditado.ingRut"
                        dense
                        clearable
                        :rules="[/^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/.test(ingresoEditado.ingRut) || ingresoEditado.ingRut===null || ingresoEditado.ingRut == '']"
                    ></v-text-field>
                </v-col>
            </v-row>  
            <v-row class="ingHeader full">
                <v-col md="2"  class="ingCol left">Lugar</v-col>
                <v-col md="5" class="field">
                    <v-text-field
                        v-model="ingresoEditado.ingLugar"
                        dense
                        :rules="[!/[^a-z ]/i.test(ingresoEditado.ingLugar)]"
                    ></v-text-field>
                </v-col>
                <v-col md="1"  class="ingCol">Fecha</v-col>
                <v-col md="4" class="field">
                    <v-text-field
                        v-model="ingresoEditado.ingFecha"
                        dense
                    ></v-text-field>
                </v-col>
            </v-row>  
            <v-row class="ingHeader mid">
                <v-col></v-col>
            </v-row>  
            <v-row class="full">
                <v-col md="2" class="ingCol left"><b> Cuenta</b></v-col>
                <v-col md="6"><b>Por el concepto de</b></v-col>
                <v-col md="2" class="ingCol"><b>Debe</b></v-col>
                <v-col md="2"><b>Haber</b></v-col>
            </v-row>
            <!-- Detalle de las cuentas -->
            <v-row v-for="(cuenta, index) in ingresoEditado.detalleCuentas" :key="index" class="full">
                <v-col md="2" class="ingCol left field">
                    <v-combobox
                        v-model="cuenta.cuenta"
                        :items="cuentas"
                        item-text="cuentaId"                        
                        dense
                    ></v-combobox>
                </v-col>
                <v-col md="6">{{cuenta.cuenta.cuentaNombre}} </v-col>
                <v-col md="2" class="ingCol field">
                    <v-text-field
                        v-model.number ="cuenta.debe"
                        dense
                        :rules="[!/([\D])/.test(ingresoEditado.detalleCuentas[index].debe)]"
                    ></v-text-field>
                </v-col>
                <v-col md="2" class="field">
                    <v-text-field
                        v-model.number ="cuenta.haber"
                        dense
                        :rules="[!/([\D])/.test(ingresoEditado.detalleCuentas[index].haber)]"
                    ></v-text-field>
                </v-col>
            </v-row>  
            <v-row class="mid">
                <v-col md="2" class="ingCol left field">
                    <v-btn block @click="agregarCuenta">+</v-btn>
                </v-col>
                <v-col md="1" class="field ingCol left">
                    <v-btn block @click="quitarCuenta">-</v-btn>
                </v-col>
                <v-col md="9"></v-col>
            </v-row>
            <v-row class="full">
                <v-col md="2" class="ingCol left"><b>Total</b></v-col>
                <v-col md="6"></v-col>
                <v-col md="2" class="ingCol"><b>{{totalDebe}} </b></v-col>
                <v-col md="2"><b>{{totalHaber}} </b></v-col>
            </v-row>
            <v-row class="full">
                <v-col md="2" class="ingCol left"><b>Glosa </b></v-col>
                <v-col md="10" class="field">
                    <v-text-field
                        v-model="ingresoEditado.ingGlosa"
                        dense
                    ></v-text-field>
                </v-col>
            </v-row>              
        </v-container>
    </v-sheet>   
</template>

<script>
import enumsService from '@/services/enums.service'
import ingresoService from '@/services/ingreso.service'
export default {
    data(){
        return{
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
            cuentas:[]
        }
    },
    computed:{
        totalDebe(){
            if(this.ingresoEditado.detalleCuentas.length > 1){
                let suma = 0
                for(let ct of this.ingresoEditado.detalleCuentas){
                    suma= parseInt(suma) + (ct.debe ? parseInt(ct.debe):0)                                        
                }
                return suma
            }else if(this.ingresoEditado.detalleCuentas.length == 1){
                return this.ingresoEditado.detalleCuentas[0].debe
            }else{
                return 0
            }
        },
        totalHaber(){ 
            if(this.ingresoEditado.detalleCuentas.length > 1){
                let suma = 0
                for(let ct of this.ingresoEditado.detalleCuentas){
                    suma= parseInt(suma) + (ct.haber ? parseInt(ct.haber):0)                                        
                }
                return suma
            }else if(this.ingresoEditado.detalleCuentas.length == 1){
                return this.ingresoEditado.detalleCuentas[0].haber
            }else{
                return 0
            }
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
        agregarCuenta(){
            this.ingresoEditado.detalleCuentas.push({
                cuenta: {
                    cuentaId: '',
                    cuentaNombre: ''
                },
                debe: 0,
                haber: 0
            })
        },
        quitarCuenta(){
            this.ingresoEditado.detalleCuentas.pop()
        },

        fetchCuentas(){
            enumsService.getCuentas().then((response)=>{
                this.cuentas = response.data
                this.ingresoEditado.detalleCuentas.push({
                    cuenta: this.cuentas[1],
                    debe: 0,
                    haber: 0
                })
            })
        },

        fetchUltimoId(){
            ingresoService.getLastId().then((response)=>{
                this.ingresoEditado.ingresoId = response.data + 1
            })
        }
    },
    mounted(){
        this.fetchCuentas()  
        this.fetchUltimoId()      
    }
    
}
</script>

<style>
.ingCol{
    border-left: 1px black solid;
    border-right: 1px black solid;
    text-align: right;
    font-weight: bold;
}

.ingCol.left{
    border-left: 0px;
    border-right: 1px black solid;
}

.full{    
    border: 1px black solid;
}
.mid{
    border-left: 1px black solid;
    border-right: 1px black solid;
}


.ingHeader{
    background-color: #f09e6e;
}
.ingHeader.mid{
    background-color: #f09e6e;
    
}

.field{
    padding-top: 0;
    padding-bottom: 0;
  }
</style>