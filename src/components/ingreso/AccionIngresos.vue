<template>
    <v-sheet 
        min-height="160"
        rounded="lg">
        <v-container>
            <v-row>
                <v-col>
                    <v-btn 
                        v-if="$router.currentRoute.path != '/EditorIngreso'"
                        block color="#70C1B3" @click="crear"> Crear </v-btn>
                    
                    <v-btn
                        v-if="$router.currentRoute.path == '/EditorIngreso'" 
                        block color="#70C1B3"> Guardar </v-btn>
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
                        v-if="$router.currentRoute.path != '/Ingresos'"
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
        ...mapState('ingresos', ["ingresosSeleccionados"])
        
    },
    methods:{
        ver(){
            this.$store.commit("ingresos/setIngresoActual",1)
            this.$router.push("Detalleingreso")
        },
        volver(){
            this.$store.commit("ingresos/setIngresoActual",1)
            this.$store.commit("ingresos/resetIngresosSeleccionados")
            this.$router.push("Ingresos")
        },
        crear(){
            this.$router.push("EditorIngreso")
        }
    }
}
</script>