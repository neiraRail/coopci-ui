<template>
    <v-sheet>
        <h5>Hola</h5>
        <v-file-input accept=".xlsx" label="Select File..." v-model="file"></v-file-input>
        <v-btn @click="subirArchivo">Subir</v-btn>
    </v-sheet>
    
</template>

<script>

export default {
    data(){
        return {
            file: ''
        }
    },
    methods:{
        subirArchivo(){
            alert("hola")
        }
    }
    
}
</script>