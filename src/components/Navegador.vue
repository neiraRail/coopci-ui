<template>
    <v-sheet
    rounded="lg"
    min-height="170"
    >
    <!-- Botones de accion -->
    <v-container>
        <v-row >
            <v-col align="center">
                {{actual}}/{{sociosFiltrados.length}}
            </v-col>  
        </v-row>
        <v-row>
            <v-col>
                <v-btn block @click="siguienteResultado" :disabled="sociosFiltrados.length<=1"> Sig. </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn block @click="anteriorResultado" :disabled="sociosFiltrados.length<=1"> Ant. </v-btn>
            </v-col>
        </v-row>
        
    </v-container>
    </v-sheet>
</template>
<script>
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState(['actual','sociosFiltrados'])
    },
    methods: {
        siguienteResultado(){
            //Aumentar uno a menos que se llegue al máximo
            if(this.actual<this.sociosFiltrados.length){
                this.$store.commit('setActual', this.actual+1)
            }
            else{
                this.$store.commit('resetActual')
            }
            //Cerrar los paneles
            this.$store.commit('cerrarPaneles')     
        },
        anteriorResultado(){
            //Disminuir uno a menos que se llegue a 1
            if(this.actual>1){
                this.$store.commit('setActual',this.actual - 1)
            }
            else{
                this.$store('setActual', this.socios.length)
            }
            //Cerrar paneles
            this.$store.commit('cerrarPaneles') 
        },
    }
}
</script>