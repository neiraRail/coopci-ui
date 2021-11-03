<template>
    <v-sheet
      min-height="70vh"
      rounded="lg"
    >
      <!-- Datos socio-->
      <v-container>
        <v-row>
          <v-col cols="3" md="2" class="nombre-dato arriba-all" rounded>Nombre</v-col> 
          <v-col cols="5" md="8" v-if="socio.nombre1!=null"><span>{{socio.nombre1 + " " + socio.nombre2 + " " + socio.apellido1 + " " + socio.apellido2}}</span></v-col>
          <v-col cols="2" md="1" class="nombre-dato full-all">Nro</v-col> 
          <v-col cols="2" md="1"><span>{{socio.nro_registro}}</span></v-col>
        </v-row >
        <v-row>
          <v-col cols="3" md="2" class="nombre-dato">Rut</v-col> 
          <v-col cols="9" md="3"><span v-if="socio.rut!=null" >{{socio.rut}}</span></v-col>
          <v-col cols="3" md="2" class="nombre-dato arriba-md">Domicilio</v-col> 
          <v-col cols="9" md="5"><span v-if="socio.direccion!=null" >{{socio.direccion}}</span></v-col>               
        </v-row>
        <v-row>
          <v-col cols="3" md="2" class="nombre-dato">Comuna</v-col> 
          <v-col cols="9" md="3"><span v-if="socio.direccion_comuna!=null" >{{socio.direccion_comuna.comuna_nombre}}</span></v-col>
          <v-col cols="3" md="2" class="nombre-dato">Pais</v-col> 
          <v-col cols="9" md="5">
            <span v-if="socio.direccion_comuna==null">
            </span>
            <span v-else-if="socio.direccion_comuna.region==null" >
              {{socio.direccion_comuna.comuna_nombre}}
            </span>
            <span v-else>
              {{socio.direccion_comuna.region.pais.pais_nombre}}
            </span>
          </v-col>                
        </v-row>
        <v-row>
          <v-col cols="3" md="2" class="nombre-dato">Telefono</v-col> 
          <v-col cols="9" md="3">
              <ul v-if="socio.telefonos.length > 1">
                  <li 
                    v-for="(tel, index) in socio.telefonos"
                    :key="index"
                  >
                    {{tel.telefono}}
                  </li>
              </ul>
              <span v-else-if="socio.telefonos.length == 1">{{socio.telefonos[0].telefono}}</span>
          </v-col>
          <v-col cols="3" md="2" class="nombre-dato">e-mail</v-col> 
          <v-col cols="9" md="5">
              <ol v-if="socio.correos.length > 1">
                  <li
                    v-for="(correo, index) in socio.correos"
                    :key="index"
                  >
                    {{correo.correo}}
                  </li>
              </ol>
              <span v-else-if="socio.correos.length == 1">{{socio.correos[0].correo}}</span>
          </v-col>                 
        </v-row>
        <v-row>
          <v-col cols="3" md="2" class="nombre-dato">Sexo</v-col> 
          <v-col cols="9" md="3"><span>{{socio.sexo.sexo_nombre}}</span></v-col>
          <v-col cols="3" md="2" class="nombre-dato">Fecha Nac</v-col> 
          <v-col cols="9" md="5"><span>{{socio.fecha_nac}}</span></v-col>                 
        </v-row>
        <v-row>
          <v-col cols="3" md="2" class="nombre-dato">Educacion</v-col> 
          <v-col cols="9" md="3"><span v-if="socio.nivel_educacional" >{{socio.nivel_educacional.nivel_educacional_nombre}}</span></v-col>
          <v-col cols="3" md="2" class="nombre-dato">Tipo persona</v-col> 
          <v-col cols="9" md="5"><span v-if="socio.tipo_persona">{{socio.tipo_persona.tipo_persona_nombre}}</span></v-col>                 
        </v-row>
        <v-row>
          <v-col cols="3" md="2" class="nombre-dato abajo">Estado civil</v-col> 
          <v-col cols="9" md="3"><span v-if="socio.estado_civil" >{{socio.estado_civil.estado_civil_nombre}}</span></v-col>
          <v-col cols="3" md="2" class="nombre-dato abajo">Profesión</v-col> 
          <v-col cols="9" md="5"><span v-if="socio.profesion_oficio">{{socio.profesion_oficio}}</span></v-col>                 
        </v-row>
        <v-row>
          <v-col cols="3" md="2" class="nombre-dato abajo-md">Motivacion</v-col> 
          <v-col cols="9" md="3">
          <!-- Dialog -->
            <v-dialog
              v-model="dialog"
              width="500"
              v-if="socio.motivacion"
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
                  {{socio.motivacion}}                  
                </v-card-text>
              </v-card>
            </v-dialog>
          <!-- Fin Dialog -->
          </v-col>
          <v-col cols="3" md="2" class="nombre-dato abajo-all">Part trafkin</v-col> 
          <v-col cols="9" md="5"><span>{{socio.part_trafkintun}}</span></v-col>                 
        </v-row>
        <!-- Paneles -->
        <v-row >
          <v-col>
            <v-expansion-panels accordion v-model="paneles">
              <v-expansion-panel :disabled="socio.actividadProductiva.length == 0">
                <v-expansion-panel-header>Productivo</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- Datos productivos -->
                  <v-expansion-panels accordion>
                      <v-expansion-panel
                        v-for="(act, index) in socio.actividadProductiva"
                        :key="index"
                      >
                        <v-expansion-panel-header>{{act.act_prod_nombre}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-row>
                                    <v-col>Sector productivo</v-col>
                                    <v-col>{{act.sectorProductivo.sector_prod_nombre}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col>Nivel productivo</v-col>
                                    <v-col>{{act.nivelProductivo.nivel_prod_nombre}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col>Iniciacion de actividades</v-col>
                                    <v-col>{{act.iniciacionReq.iniciacion_req_nombre}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col>Resolución sanitaria</v-col>
                                    <v-col>{{act.resolucionReq.res_sanit_req_nombre}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col>Financiamiento</v-col>
                                    <v-col>{{act.finan_act_prod}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col>Credito</v-col>
                                    <v-col>{{act.act_prod_credito}}</v-col>
                                </v-row>
                            </v-container>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                  </v-expansion-panels>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel :disabled="socio.organizacionSocio.length == 0">
                <v-expansion-panel-header>Participación</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- Datos organizativos -->
                  <v-expansion-panels accordion>
                      <v-expansion-panel
                        v-for="(org, index) in socio.organizacionSocio"
                        :key="index"
                      >
                        <v-expansion-panel-header>{{org.org_nombre}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-row>
                                    <v-col>Tipo organizacion</v-col>
                                    <v-col>{{org.tipo_org.tipo_org_nombre}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col>Comuna</v-col>
                                    <v-col v-if="org.comuna != null">{{org.comuna.comuna_nombre}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col>Pais</v-col>
                                    <v-col v-if="org.comuna != null">{{org.comuna.region.pais.pais_nombre}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col>Rol</v-col>
                                    <v-col>{{org.org_rol}}</v-col>
                                </v-row>
                            </v-container>
                        </v-expansion-panel-content>                        
                      </v-expansion-panel>
                  </v-expansion-panels>

                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel :disabled="socio.intencionCredito.length == 0">
                <v-expansion-panel-header>Intención crédito</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- Datos Intencion crédito -->
                  <v-expansion-panels accordion>
                      <v-expansion-panel
                        v-for="(int, index) in socio.intencionCredito"
                        :key="index"
                      >
                        <v-expansion-panel-header>{{index+1}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-row>
                                    <v-col>Intencion futura</v-col>
                                    <v-col>{{int.inten_credito_futuro}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col>Intencion anterior</v-col>
                                    <v-col>{{int.tipoUsoCredito.tipo_uso_ant_nombre}}</v-col>
                                </v-row>
                            </v-container>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                  </v-expansion-panels>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel :disabled="socio.empleoSocio.length == 0"> 
                <v-expansion-panel-header>Empleo</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- Datos Intencion crédito -->
                  <v-expansion-panels accordion>
                      <v-expansion-panel
                        v-for="(emp, index) in socio.empleoSocio"
                        :key="index"
                      >
                        <v-expansion-panel-header>{{emp.empl_nombre_empresa}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-row>
                                    <v-col>Relacion empleo</v-col>
                                    <v-col>{{emp.relacionEmpleo.empleo_relac_nombre}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col>Tipo contrato</v-col>
                                    <v-col>{{emp.empl_tipo_contrato}}</v-col>
                                </v-row>
                            </v-container>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                  </v-expansion-panels>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    props: ['socio']
    ,
    data() {
        return {
          tabs: null,
          dialog: false
        }
    },
    methods: {
        ...mapMutations(['cerrarPaneles'])
    },
    computed:{
      correosOrd(){
        console.log("computed")
        let newArray = this.socio.correos
        newArray.sort((correo1, correo2)=>{
            return correo1.prioridad - correo2.prioridad
        });

        return newArray;
      },
      paneles: {
        get(){
          return this.$store.state.paneles
        },
        set(value){
          this.$store.commit('setPaneles',value)
        }
      }
      
    }
    
}
</script>


<style>
@media (min-width: 960px) {
     
    .nombre-dato.arriba-md{
        border-radius: 0.4rem 0.4rem 0% 0%;
    }

    .nombre-dato.abajo-md{
        border-radius: 0% 0% 0.4rem 0.4rem;
    }

    .nombre-dato.intermedio{
        border-radius: 0.4rem 0% 0% 0%;
    }
}


.nombre-dato.abajo-all{
  border-radius: 0% 0% 0.4rem 0.4rem;
}

.nombre-dato.arriba-all{
  border-radius: 0.4rem 0.4rem 0% 0%;
}

.nombre-dato.full-all{
        border-radius: 0.4rem;
    }
</style>