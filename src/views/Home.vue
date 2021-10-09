<template>
  <div class="home">
    <table>
      <tr>
        <td class="text">Nro de socio</td>
        <td>{{socio.nro_registro}}</td>
      </tr>
      <tr>
        <td class="text">Nombre</td>
        <td>{{socio.nombre1}} {{socio.nombre2}}</td>
      </tr>
      <tr>
        <td class="text">Apellido</td>
        <td>{{socio.apellido1}} {{socio.apellido2}}</td>
      </tr>
      <tr>
        <td class="text">Dirección</td>
        <td>{{socio.direccion}}</td>
      </tr>
      <tr>
        <td class="text">Comuna</td>
        <td>{{socio.direccion_comuna}}</td>
      </tr>
      <tr>
        <td class="text">Nivel educacional</td>
        <td>{{socio.nivel_educacional}}</td>
      </tr>
      <tr>
        <td class="text">Profesion oficio</td>
        <td>{{socio.profesion_oficio}}</td>
      </tr>
    </table>
    <br>
    <input type="number" v-model="numero">
    <button @click="fetchSocio(numero)">Buscar</button>
  </div>
  
</template>

<script>
// @ is an alias to /src
import socioService from '@/services/socio.service';

export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      socio: {},
      numero: 0
    }
  },
  methods:{
    fetchSocio(nro){
      socioService.get(nro).then(response => (this.socio = response.data));
      console.log("Traido nro"+nro)
    }
  },
  mounted(){
    this.fetchSocio(1);

  }
}
</script>

<style>
  table, td{
    border: 1px solid blueviolet;
    width: 50%;
    border-collapse: collapse;
  }

  .text{
    width: 30%;
    background-color:cornflowerblue;
    font-weight: bold;
  }

</style>
