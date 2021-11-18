<template>
<v-sheet
  min-height="70vh"
  rounded="lg"
>
  <v-container>
    <v-row>
      <v-col cols="2" md="2" class="nombre-dato arriba-all" rounded>Nombre</v-col> 
      <v-col cols="2" md="2" class="field" v-if="socioEditado.nombre1!=null">
        <v-text-field class="field" dense
          v-model="socioEditado.nombre1"
          :rules="[!/[^a-z]/i.test(socioEditado.nombre1)]"
        ></v-text-field>
      </v-col>
      <v-col cols="2" md="2" class="field" v-if="socioEditado.nombre1!=null">
        <v-text-field class="field" dense
          v-model="socioEditado.nombre2"
          :rules="[!/[^a-z]/i.test(socioEditado.nombre2)]"
        ></v-text-field>
      </v-col>
      <v-col cols="2" md="2" class="field" v-if="socioEditado.nombre1!=null">
        <v-text-field class="field" dense
          v-model="socioEditado.apellido1"
          :rules="[!/[^a-z]/i.test(socioEditado.apellido1)]"
        ></v-text-field>
      </v-col>
      <v-col cols="2" md="2" class="field" v-if="socioEditado.nombre1!=null">
        <v-text-field class="field" dense
          v-model="socioEditado.apellido2"
          :rules="[!/[^a-z]/i.test(socioEditado.apellido2)]"
        ></v-text-field>
      </v-col>
      <v-col cols="1" md="1" class="nombre-dato full-all">Nro</v-col> 
      <v-col cols="1" md="1" class="field">
        <v-text-field dense
          v-model="socioEditado.nro_registro"
          :rules="[!/([\D])/.test(socioEditado.nro_registro)]"
        ></v-text-field>
      </v-col>
    </v-row >
    <v-row>
      <v-col cols="3" md="2" class="nombre-dato">Rut</v-col> 
      <v-col cols="9" md="3" class="field">
        <v-text-field dense
          v-model="socioEditado.rut" 
          :rules="[/^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/.test(socioEditado.rut)]"
        ></v-text-field>
      </v-col>
      <v-col cols="3" md="2" class="nombre-dato arriba-md">Domicilio</v-col> 
      <v-col cols="9" md="5" class="field">
        <v-text-field dense
          v-model="socioEditado.direccion"
          >
        </v-text-field>
      </v-col>               
    </v-row>
    <v-row>
      <v-col cols="3" md="2" class="nombre-dato">Comuna</v-col> 
      <v-col cols="9" md="3" class="field">
        <v-combobox dense
          v-model="socioEditado.direccion_comuna"
          :items="comunas"
          item-text="comuna_nombre"
        ></v-combobox>
      </v-col>
      <v-col cols="3" md="2" class="nombre-dato">Pais</v-col> 
      <v-col cols="9" md="5" class="field">
        <v-combobox dense disabled v-if="socioEditado.direccion_comuna"
          v-model="socioEditado.direccion_comuna.region.pais.pais_nombre"
          item-text="region.pais.pais_nombre"          
        ></v-combobox>
      </v-col>                
    </v-row>
    <v-row>
      <v-col cols="3" md="2" class="nombre-dato">Telefono</v-col> 
      <v-col cols="9" md="3" class="field">
          <ul v-if="socioEditado.telefonos.length > 1">
              <li 
                v-for="(tel, index) in socioEditado.telefonos"
                :key="index"
              >
                {{tel.telefono}}
              </li>
          </ul>
      </v-col>
      <v-col cols="3" md="2" class="nombre-dato">e-mail</v-col> 
      <v-col cols="9" md="5" class="field">
          <ol v-if="socioEditado.correos.length > 1">
              <li
                v-for="(correo, index) in socioEditado.correos"
                :key="index"
              >
                {{correo.correo}}
              </li>
          </ol>
      </v-col>                 
    </v-row>
    <v-row>
      <v-col cols="3" md="2" class="nombre-dato">Sexo</v-col> 
      <v-col cols="9" md="3" class="field">
        <v-combobox dense
          v-model="socioEditado.sexo"
          :items="sexos"
          item-text="sexo_nombre"
        ></v-combobox>
      </v-col>
      <v-col cols="3" md="2" class="nombre-dato">Fecha Nac</v-col> 
      <v-col cols="9" md="5" class="field">
        <v-menu
          v-model="menu_date"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on,attrs }">
            <v-text-field
              v-model="socioEditado.fecha_nac"
              readonly
              label="Fecha de nacimiento"
              v-bind="attrs"
              v-on="on"
            >
            </v-text-field>
          </template>
          <v-date-picker
            v-model="socioEditado.fecha_nac"
            @input="menu_date = false"
            no-title
            locale="es"
          ></v-date-picker>
        </v-menu>
      </v-col>                 
    </v-row>
    <v-row>
      <v-col cols="3" md="2" class="nombre-dato">Educacion</v-col> 
      <v-col cols="9" md="3" class="field">
        <v-combobox dense
          v-model="socioEditado.nivel_educacional"
          :items="niveles"
          item-text="nivel_educacional_nombre"
        ></v-combobox>
      </v-col>
      <v-col cols="3" md="2" class="nombre-dato">Tipo persona</v-col> 
      <v-col cols="9" md="5" class="field">
        <v-combobox dense
          v-model="socioEditado.tipo_persona"
          :items="tipos"
          item-text="tipo_persona_nombre"
        ></v-combobox>
      </v-col>                 
    </v-row>
    <v-row>
      <v-col cols="3" md="2" class="nombre-dato abajo">Estado civil</v-col> 
      <v-col cols="9" md="3" class="field">
        <v-combobox dense
          v-model="socioEditado.estado_civil"
          :items="estados"
          item-text="estado_civil_nombre"
          >
        </v-combobox>
      </v-col>
      <v-col cols="3" md="2" class="nombre-dato abajo">Profesión</v-col> 
      <v-col cols="9" md="5" class="field">
        <v-text-field dense
          v-model="socioEditado.profesion_oficio"
        ></v-text-field>
      </v-col>                 
    </v-row>
    <v-row>
      <v-col cols="3" md="2" class="nombre-dato abajo-md">Motivacion</v-col> 
      <v-col cols="9" md="3" class="field">
      <!-- Dialog -->
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="blue lighten-2"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Ver
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              Motivacion
            </v-card-title>

            <v-card-text >
              <v-textarea dense outlined
                label="Motivacion"
                v-model="socioEditado.motivacion"
              >
              </v-textarea>           
            </v-card-text>
          </v-card>
        </v-dialog>
      <!-- Fin Dialog -->
      </v-col>
      <v-col cols="3" md="2" class="nombre-dato abajo-all">Part trafkin</v-col> 
      <v-col cols="9" md="5" class="field">
        <v-combobox dense
          v-model="socioEditado.part_trafkintun"
          :items="[true, false]">
        </v-combobox>
      </v-col>                 
    </v-row>
  </v-container>
  </v-sheet>
</template>
<script>
import enumsService from '@/services/enums.service'
export default {
  data(){
    return {
      socioEditado: {
        nro_registro: '',
        tipo_persona: {
            tipo_persona_nombre: ""
        },
        nombre1: "",
        nombre2: "",
        apellido1: "",
        apellido2: "",
        rut: "",
        direccion: "",
        direccion_comuna: {
            comuna_nombre: "",
            region: {
                region_nombre: "",
                pais: {
                    pais_nombre: ""
                }
            }
        },
        sexo: {
          sexo_nombre: ""
        },
        fecha_nac: "",
        estado_civil: {
            estado_civil_nombre: ""
        },
        nivel_educacional: {
            nivel_educacional_nombre: ""
        },
        profesion_oficio: "",
        sub_ocupacion: {
            ocupacion_id: '',
            ocupacion: "",
            macro_ocp_id: {
                macro_ocp_id: '',
                maco_ocp_nombre: ""
            }
        },
        motivacion: "",
        part_trafkintun: '',
        actividadProductiva: [],
        organizacionSocio: [],
        empleoSocio: [],
        intencionCredito: [],
        telefonos: [{
          telefono: "",
          tipo_tel:{
              tipo_tel_nombre: ""
          }  
        }],
        correos: [{
            correo: "",
            prioridad: ''
        }]
      },
      dialog: false,
      menu_date: false,
      comunas: [{
        comuna_nombre: "",
        region: {
          region_nombre: "",
          pais: {
            pais_nombre: ""
          }
        }
      }],
      niveles: [{
        nivel_educacional_nombre: ""
      }],
      tipos: [{
        tipo_persona_nombre: ""
      }],
      estados: [{
        estado_civil_nombre: ""
      }],
      sexos: [{
        sexo_nombre: ""
      }]
    }
  },
  watch:{
    socioEditado:{
      handler(val){
        this.$store.commit('socios/setSocioEditado', val)
      },
      deep: true
    },
    "$store.state.socios.socioEditado":{
      handler(val){
        this.socioEditado = val
      },
      deep: true
    }
  },
  methods: {
    fetchComunas(){
      enumsService.getComunas().then((response)=>{
        this.comunas = response.data;
      })
    },
    fetchNivelEducacionales(){
      enumsService.getNivelEducacionales().then((response)=>{
        this.niveles = response.data;
      })
    },
    fetchEstadosCiviles(){
      enumsService.getEstadoCiviles().then((response)=>{
        this.estados = response.data;
      })
    },
    fetchTipos(){
      enumsService.getTipoPersonas().then((response)=>{
        this.tipos = response.data;
      })
    },
    fetchSexos(){
      enumsService.getSexos().then((response)=>{
        this.sexos = response.data;
      })
    }
  },
  mounted(){
    this.fetchComunas()
    this.fetchNivelEducacionales()
    this.fetchEstadosCiviles()
    this.fetchTipos()    
    this.fetchSexos()
  }      
}
</script>

<style scoped>
  .field{
    padding-top: 0;
    padding-bottom: 0;
  }
</style>