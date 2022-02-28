<template>
    <v-sheet
        min-height="160"
        rounded="lg">

        <v-container>
            <v-row>
                <v-col>
                    <h1 class="text-center">Error de validación</h1>
                    <br>
                    <p>
                        Algunos de los datos entregados no cumplen los criterios
                        de validación para ser ingresados a la base de datos.
                    </p>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <h4>Los errores son los siguientes: </h4>
                    <br>
                    <v-data-table 
                        :headers="headers"
                        :items="data.errores"
                    ></v-data-table>
                </v-col>
            </v-row>
        </v-container>

    </v-sheet>
</template>
<script>
export default {
    props:{
        data: {
            default() {
                return {                    
                    exito: null,
                    errores: []
                    
                }
            }
        }
    },
    data(){
        return{
            headers: [
                {text: 'Fila', value: 'fila'},
                {text: 'Campo', value: 'campo'},
                {text: 'Valor',  value: 'valor'},
                {text: 'Causa',  value: 'causa'}
            ],
        }
        
    }
}
</script>