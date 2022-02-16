<template>
    <v-sheet>
        <h5>Hola</h5>
        <v-file-input accept=".xlsx" label="Select File..." v-model="file"></v-file-input>
        <v-btn @click="subirArchivo">Subir</v-btn>
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