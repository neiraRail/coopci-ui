<template>
  <v-sheet class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="2"
        >
          <PanelFiltrosIngreso/>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="8"
          order-sm="12"
        >
          <TablaIngresos/>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="2"
          order-md="last"
        >
          <PanelAccionIngreso/>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script>
export default {
    components: {
      TablaIngresos: () => import("@/components/ingreso/TablaIngresos"),
      PanelFiltrosIngreso: () => import("@/components/ingreso/PanelFiltrosIngreso"),
      PanelAccionIngreso: () => import("@/components/ingreso/PanelAccionIngreso")
    }
}
</script>