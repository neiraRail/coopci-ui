<template>
    <v-sheet 
        min-height="160" 
        rounded="lg"
    >

    <v-container>
        <v-row>
            <v-col align="center">
                {{ingresoActual}}/{{ingresosSeleccionados.length}}
            </v-col> 
        </v-row>
        <v-row>
            <v-col>
                <v-btn block @click="siguienteIngreso" :disabled="ingresosSeleccionados.length<=1"> Sig. </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn block @click="anteriorIngreso" :disabled="ingresosSeleccionados.length<=1"> Ant. </v-btn>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col>
                <v-btn block @click="siguienteIngreso" :disabled="ingresosSeleccionados.length<=1"> CS </v-btn>
            </v-col>
        </v-row>
    </v-container>
    </v-sheet>    
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed:{
        ...mapState(["ingresoActual","ingresosSeleccionados"])
    },
    methods:{
        siguienteIngreso(){
            //Aumentar uno a menos que se llegue al máximo
            if(this.ingresoActual<this.ingresosSeleccionados.length){
                this.$store.commit('setIngresoActual', this.ingresoActual+1)
            }
            else{
                this.$store.commit('setIngresoActual', 1)
            }
        },
        anteriorIngreso(){
            //Disminuir uno a menos que se llegue a 1
            if(this.ingresoActual>1){
                this.$store.commit('setIngresoActual',this.ingresoActual - 1)
            }
            else{
                this.$store.commit('setIngresoActual', this.ingresosSeleccionados.length)
            }
        }
    }
}
</script>