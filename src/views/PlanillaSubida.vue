<template>
    <v-sheet class="grey lighten-3">
    <v-container>
    <v-row>
    <v-col md="10">
        <RespuestaExitosa v-if="respuesta.data.exito" :data="respuesta.data"/>   
        <RespuestaError v-if="!respuesta.data.exito" :data="respuesta.data"/>        
    </v-col>
    <v-col md="2">
        <ControlesResultado :data="respuesta.data"/>
        
    </v-col>
    </v-row>
    </v-container>       
        
    </v-sheet>
</template>
<script>
export default {
    props: {
        respuesta: {
            default() {
                return { 
                    data: {
                        exito: '',
                        errores: [],
                        sociosGuardados: [],
                        sociosRepetidos: []
                    } 
                }
            }
        }
    },
    data(){
        return {
            
        }
    },
    components: {
        RespuestaExitosa: () => import("@/components/socio/RespuestaExitosa"),
        RespuestaError: () => import("@/components/socio/RespuestaError"),
        ControlesResultado: () => import("@/components/socio/ControlesResultado")
    }
    
}
</script>