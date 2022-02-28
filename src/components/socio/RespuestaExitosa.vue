<template>
    <v-sheet
            min-height="160"
            rounded="lg"
        >
            <v-container>
                <v-row>
                    <v-col>
                        <h1 class="text-center">
                            Se subieron {{data.sociosGuardados.length}} socios
                        </h1>
                        <br>

                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h3>Socios Guardados</h3>
                        <v-data-table
                            :headers="headers"
                            :items="data.sociosGuardados"
                            item-key="nro_ingreso"
                            >

                        </v-data-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h3>Socios Repetidos</h3>
                        <v-data-table
                            :headers="headers"
                            :items="data.sociosRepetidos"
                            item-key="nro_ingreso"
                            >

                        </v-data-table>
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
                    errores: [],
                    sociosGuardados: [],
                    sociosRepetidos: []
                    
                }
            }
        }
    },
    data(){
        return {
            headers: [
                {text: 'Nro', value: 'nro_registro'},
                {text: 'Nombre', value: 'nombre1'},
                {text: 'Rut',  value: 'rut'},
                {text: 'Correo',  value: 'correos[0].correo'}
            ]
        }
    }
}
</script>