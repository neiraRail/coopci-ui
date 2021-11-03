<template>
    <v-sheet 
        min-height="160"
        rounded="lg">
        <v-container>
            <v-row>
                <v-col md="8">[Centrar| más ancho] Comprobante de Ingreso</v-col>
                <v-col md="2">Nro </v-col>
                <v-col md="2">{{ingreso.ingresoId}}</v-col>
            </v-row>
            <v-row>
                <v-col md="2">Nombre</v-col>
                <v-col md="5">{{ingreso.ingTitulo}} </v-col>
                <v-col md="1">Rut</v-col>
                <v-col md="4">{{ingreso.ingRut}} </v-col>
            </v-row>  
            <v-row>
                <v-col md="2">Lugar</v-col>
                <v-col md="4">{{ingreso.ingLugar}}</v-col>
                <v-col md="2">Fecha</v-col>
                <v-col md="4">{{ingreso.ingFecha}}</v-col>
            </v-row>  
            <v-row>
            </v-row>  
            <v-row>
                <v-col md="2">Cuenta</v-col>
                <v-col md="6">Por el concepto de</v-col>
                <v-col md="2">Debe</v-col>
                <v-col md="2">Haber</v-col>
            </v-row>  
            <v-row v-for="(cuenta, index) in ingreso.detalleCuentas" :key="index">
                <v-col md="2">{{cuenta.cuenta.cuentaId}}</v-col>
                <v-col md="6">{{cuenta.cuenta.cuentaNombre}} </v-col>
                <v-col md="2">{{cuenta.debe}} </v-col>
                <v-col md="2">{{cuenta.haber}} </v-col>
            </v-row>
            <v-row>
                <v-col md="2">Total</v-col>
                <v-col md="6"></v-col>
                <v-col md="2">{{ingreso.totalDebe}} </v-col>
                <v-col md="2">{{ingreso.totalHaber}} </v-col>
            </v-row>
            <v-row>
                <v-col md="2">Glosa</v-col>
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
                return [{
                    "ingresoId": '',
                    "ingTitulo": '',
                    "ingRut": '',
                    "ingLugar": '',
                    "ingFecha": '',
                    "ingGlosa": '',
                    "cuotaSocios": [],
                    "cuotaCreditos": [],
                    "detalleCuentas": []
                }]
            }            
        }
    }
}
</script>