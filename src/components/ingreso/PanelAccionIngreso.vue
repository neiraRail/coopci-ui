<template>
    <v-sheet 
        min-height="160" 
        class="panel-filtros"
        rounded="lg">
        <v-container>
            <v-row>
                <v-col>
                    <v-btn block :disabled="selected"> Ver </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>    
</template>

<script>
export default {
    data(){
        return{
            selected: false,
            ver: false
        }
    }
}
</script>