<template>
    <v-sheet 
        min-height="160" 
        class="panel-filtros"
        rounded="lg">
        <v-data-table
            :headers="headers"
            :items="ingresos"
            :items-per-page="5"
            class="elevation-1"
            :footer-props="{
                disableItemsPerPage: true
            }"
        >
        </v-data-table>
    </v-sheet>    
</template>

<script>
export default {
    data(){
      return {
        headers: [],
        ingresos: []
      }
    }
}
</script>