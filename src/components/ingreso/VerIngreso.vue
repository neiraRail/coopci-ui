<template>
    <v-sheet 
        min-height="160"
        rounded="lg">
        <v-container>
            <v-row>
                <v-col>
                    {{ingreso.ingTitulo}}
                </v-col>
            </v-row>            
        </v-container>
    </v-sheet>    
</template>

<script>
export default {
    props: ['ingreso']
}
</script>