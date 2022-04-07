<template>
     <v-sheet
        rounded="lg"
        min-height="170"
    >
    <!-- Botones de accion -->
    <v-container>
        <v-row>
            <v-col>
                <v-btn block @click="$router.push('/Editor')" :disabled="sociosFiltrados.length<1"> Editar </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn block @click="$router.push('/Subir')"> Subir </v-btn>
            </v-col>
        </v-row>
    </v-container>
    </v-sheet>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapState('socios', ['sociosFiltrados'])
    }
}
</script>