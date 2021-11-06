<template>
    <v-sheet
        rounded="lg"
        min-height="170"
    >
    <!-- Botones de accion -->
    <v-container>
        <v-row >
            <v-col align="center">
                {{socioActual}}/{{sociosFiltrados.length}}
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
        ...mapState('socios', ['socioActual','sociosFiltrados'])
    },
    methods: {
        siguienteResultado(){
            //Aumentar uno a menos que se llegue al máximo
            if(this.socioActual<this.sociosFiltrados.length){
                this.$store.commit('socios/setSocioActual', this.socioActual+1)
            }
            else{
                this.$store.commit('socios/resetSocioActual')
            }
            //Cerrar los paneles
            this.$store.commit('socios/cerrarPaneles')     
        },
        anteriorResultado(){
            //Disminuir uno a menos que se llegue a 1
            if(this.socioActual>1){
                this.$store.commit('socios/setSocioActual',this.socioActual - 1)
            }
            else{
                this.$store.commit('socios/setSocioActual', this.sociosFiltrados.length)
            }
            //Cerrar paneles
            this.$store.commit('socios/cerrarPaneles') 
        },
    }
}
</script>