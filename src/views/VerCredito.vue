<template>
    <v-sheet class="grey lighten-3">
    <v-container>
    <v-row>
    <v-col>
        <v-sheet
            min-height="160"
            rounded="lg"
        >
            <v-container>
                <v-row>
                    <v-col>
                        <h1 class="text-center">Folio {{credito.nroFolio}}</h1>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                    
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        
                    </v-col>
                    <v-col>
                        
                    </v-col>
                    <v-col>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </v-col>
    </v-row>
    </v-container>
    </v-sheet>
</template>
<script>
export default {
    props: {
        credito: {
            default(){
                return {
                    nroFolio: ''
                }
            }
        }
    },
    data(){
        return {

        }
    }
}
</script>