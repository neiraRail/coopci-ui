<template>
    <v-sheet class="grey lighten-3">
      <v-container >
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="10"
          >
            <TablaPagos/>
          </v-col>

          <v-col
            cols="12"
            sm="12"
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
        TablaPagos: ()=>import("@/components/credito/TablaPagosSinCi")
    }
}

</script>