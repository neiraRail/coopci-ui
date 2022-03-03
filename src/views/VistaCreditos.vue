<template>
    <v-sheet class="grey lighten-3">
      <v-container >
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="10"
          >
            <MainCreditos />
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="2"
          >
            
          </v-col>
        </v-row>
      </v-container>
  </v-sheet>
</template>
<script>

export default {
    data(){
        return {
            
        }
    },
    components: {
        MainCreditos: () => import("@/components/credito/MainCreditos")
    },
    mounted(){
    }
    
}
</script>