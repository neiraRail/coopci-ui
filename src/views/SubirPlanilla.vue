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
                        <h1 class="text-center">Subir planilla de socios</h1>
                        <br>
                        <p style="width=10"> Utilizar la siguiente planilla para ingresar los datos de los socios
                            que requiera ingresar al sistema.
                        </p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-file-input accept=".xlsx" label="Select File..." v-model="file"></v-file-input>
                    </v-col>
                    <v-col>
                        <v-btn @click="subirArchivo" :disabled="file==null">Subir</v-btn>
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
import fileService from '@/services/file.service'
export default {
    data(){
        return {
            file: null
        }
    },
    methods:{
        subirArchivo(){
            fileService.upload(this.file);
            alert("subiendo archivo")
        }
    }
    
}
</script>