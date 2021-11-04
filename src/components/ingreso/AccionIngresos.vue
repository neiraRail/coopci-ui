<template>
    <v-sheet 
        min-height="160"
        rounded="lg">
        <v-container>
            <v-row>
                <v-col>
                    <v-btn block> Crear </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn 
                        v-if="$router.currentRoute.path == '/Ingresos'"
                        block 
                        :disabled="ingresosSeleccionados.length==0" 
                        @click="ver"> Ver </v-btn>
                    <v-btn 
                        v-if="$router.currentRoute.path == '/Detalleingreso'"
                        block
                        @click="volver"> Volver </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>    
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
        }
    },
    computed:{
        ...mapState(["ingresosSeleccionados"])
        
    },
    methods:{
        ver(){
            this.$store.commit("setIngresoActual",1)
            this.$router.push("Detalleingreso")
        },
        volver(){
            this.$store.commit("setIngresoActual",1)
            this.$store.commit("resetIngresosSeleccionados")
            this.$router.push("Ingresos")
        }
    }
}
</script>