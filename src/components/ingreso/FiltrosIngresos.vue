<template>
  <v-sheet 
    min-height="160"
    rounded="lg"
  >
    <v-container>
      <v-form>
        <v-row>
          <v-col>
            <v-combobox
              v-model="filtro_mes"
              :items="meses"
              label="Mes"
              item-text="nombre"
              dense clearable
              @change="cambiarMes"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-combobox
              v-model="filtro_año"
              :items="años"
              label="Año"
              dense
              @change="cambiarMes"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6"><v-btn @click="antMes">Ant</v-btn></v-col>
          <v-col cols="6"><v-btn @click="sigMes">Sig</v-btn></v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-sheet>    
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data(){
      return {
        meses: [
          {nombre: "Enero", nro: "1"},
          {nombre: "Febrero", nro: "2"},
          {nombre: "Marzo", nro: "3"},
          {nombre: "Abril", nro: "4"},
          {nombre: "Mayo", nro: "5"},
          {nombre: "Junio", nro: "6"},
          {nombre: "Julio", nro: "7"},
          {nombre: "Agosto", nro: "8"},
          {nombre: "Septiembre", nro: "9"},
          {nombre: "Octubre", nro: "10"},
          {nombre: "Noviembre", nro: "11"},
          {nombre: "Diciembre", nro: "12"},
        ],
        años: []
      }
    },
    computed: {
      filtro_mes: {
        get(){
          return this.$store.state.ingresos.filtro_mes
        },
        set(value){
          this.$store.commit('ingresos/setFiltroMes', value)
        }
      },
      filtro_año: {
        get(){
          return this.$store.state.ingresos.filtro_año
        },
        set(value){
          this.$store.commit('ingresos/setFiltroAño', value)
        }
      }
    },
    methods:{
      sigMes(){
        //Si es diciembre cambiar a enero del año siguiente
        if(this.filtro_mes.nro == 12){
          this.$store.commit('ingresos/setFiltroMes', this.meses[0])
          //Cambiar a año siguiente o al principio si se llega al ultimo.
          this.$store.commit('ingresos/setFiltroAño', this.años[(this.filtro_año-2015)%(this.años.length)])
        }else{
          //Avanzar normalmente de mes
          this.$store.commit('ingresos/setFiltroMes', this.meses[this.filtro_mes.nro])
        }
        this.cambiarMes()
      },
      antMes(){
        //Si es ENERO hay que cambiar a diciembre del año anterior
        if(this.filtro_mes.nro == 1){
          //cambiar mes a diciembre
          this.$store.commit('ingresos/setFiltroMes', this.meses[11])
          //Cambiar a año anterior pero si el año es 2016 cambiar al último.
          this.$store.commit('ingresos/setFiltroAño', this.años[this.años.length-((this.años.length-(this.filtro_año-2016))%this.años.length)-1])
        }else{
          //Retroceder normalmente de mes
          this.$store.commit('ingresos/setFiltroMes', this.meses[this.filtro_mes.nro-2])
        }
        this.cambiarMes()
      },
      cambiarMes(){
        if(this.filtro_mes)
          this.fetchIngresosPorMes({mes: this.filtro_mes.nro, año: this.filtro_año})
      },
      ...mapActions('ingresos', ["fetchIngresosPorMes"])
    },
    mounted(){      
      const añoActual = new Date().getFullYear()
      for(let a = 2016; a<=añoActual; a++){
      this.años.push(a)
    }
    }
}
</script>