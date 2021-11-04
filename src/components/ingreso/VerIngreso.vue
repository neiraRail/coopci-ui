<template>
    <v-sheet 
        min-height="160"
        rounded="lg">
        <v-container>
            <v-row class="ingHeader full">
                <v-col md="10"><center><h2>Comprobante de Ingreso</h2></center></v-col>
                <v-col md="1" class="ingCol"><p>Nro</p></v-col>
                <v-col md="1">{{ingreso.ingresoId}}</v-col>
            </v-row>
            <v-row class="ingHeader mid">
                <v-col md="2"  class="ingCol left">Nombre</v-col>
                <v-col md="5">{{ingreso.ingTitulo}} </v-col>
                <v-col md="1"  class="ingCol">Rut</v-col>
                <v-col md="4">{{ingreso.ingRut}} </v-col>
            </v-row>  
            <v-row class="ingHeader full">
                <v-col md="2"  class="ingCol left">Lugar</v-col>
                <v-col md="5">{{ingreso.ingLugar}}</v-col>
                <v-col md="1"  class="ingCol">Fecha</v-col>
                <v-col md="4">{{ingreso.ingFecha}}</v-col>
            </v-row>  
            <v-row>
            </v-row>  
            <v-row class="full">
                <v-col md="2" class="ingCol left"><b> Cuenta</b></v-col>
                <v-col md="6"><b>Por el concepto de</b></v-col>
                <v-col md="2" class="ingCol"><b>Debe</b></v-col>
                <v-col md="2"><b>Haber</b></v-col>
            </v-row>  
            <v-row v-for="(cuenta, index) in ingreso.detalleCuentas" :key="index" class="full">
                <v-col md="2" class="ingCol left">{{cuenta.cuenta.cuentaId}}</v-col>
                <v-col md="6">{{cuenta.cuenta.cuentaNombre}} </v-col>
                <v-col md="2" class="ingCol">{{cuenta.debe}} </v-col>
                <v-col md="2">{{cuenta.haber}} </v-col>
            </v-row>
            <v-row class="full">
                <v-col md="2" class="ingCol left"><b>Total</b></v-col>
                <v-col md="6"></v-col>
                <v-col md="2" class="ingCol"><b>{{ingreso.totalDebe}} </b></v-col>
                <v-col md="2"><b>{{ingreso.totalHaber}} </b></v-col>
            </v-row>
            <v-row class="full">
                <v-col md="2" class="ingCol left"><b>Glosa </b></v-col>
                <v-col md="10">{{ingreso.ingGlosa}} </v-col>
            </v-row>              
        </v-container>
    </v-sheet>    
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(["ingresosSeleccionados","ingresoActual"]),
        ingreso(){
            if(this.$store.state.ingresosSeleccionados.length>=1){
                return this.ingresosSeleccionados[this.ingresoActual-1]
            }
            else{
                return {
                    "ingresoId": '',
                    "ingTitulo": '',
                    "ingRut": '',
                    "ingLugar": '',
                    "ingFecha": '',
                    "ingGlosa": '',
                    "cuotaSocios": [],
                    "cuotaCreditos": [],
                    "detalleCuentas": []
                }
            }            
        }
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


.ingHeader{
    background-color: #f09e6e;
}
.ingHeader.mid{
    background-color: #f09e6e;
    border-left: 1px black solid;
    border-right: 1px black solid;
}
</style>