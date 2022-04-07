<template>
    <v-sheet class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="9">
            <v-sheet min-height="60" rounded="lg">
              <v-tabs fixed-tabs v-model="selected">
                <v-tab v-for="section of sections" :key="section.name">
                  {{section.name}}
                </v-tab>
              </v-tabs>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet min-height="60" rounded="lg"></v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="9"
          >
            <MainCreditos v-if="selected=='0'"/>
            <PagosSinCi v-if="selected=='2'"/>
          </v-col>

          <v-col
            cols="12"
            sm="12"
            md="3"
          >
            <div style="position: sticky; top: 76px">
            <Controles />
            </div>
          </v-col>
        </v-row>
      </v-container>
  </v-sheet>
</template>
<script>

export default {
    data(){
        return {
            selected: '',
            sections: [
              {
                name: "Vigentes"
              },
              {
                name: "Castigados"
              },
              {
                name: "Pagos sin CI"
              }
            ]
        }
    },
    components: {
        MainCreditos: () => import("@/components/credito/MainCreditos"),
        Controles: () => import("@/components/credito/ControlesCreditos"),
        PagosSinCi: () => import("@/components/credito/TablaPagosSinCi")
    },
    mounted(){
    }
    
}
</script>