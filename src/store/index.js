import Vue from 'vue'
import Vuex from 'vuex'
import socioService from "@/services/socio.service";
import ingresoService from "@/services/ingreso.service";
var cloneDeep = require('lodash.clonedeep');

Vue.use(Vuex)

const socios = {
  namespaced: true,
  state: () => ({
    socioActual: 1,
    paneles: [],
    socios: [{
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
    }],
    sociosFiltrados: [{
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
    }],
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
    }
  }),
  mutations: {
    setSocioActual(state,act){
      state.socioActual = act
    },
    resetSocioActual(state){
      state.socioActual = 1 
    },
    setPaneles(state, value){
      state.paneles = value
    },
    cerrarPaneles(state){
      state.paneles = []
    },
    setSocios(state, value){
      state.socios = value
    },
    setSocioEditado(state, value){
      state.socioEditado = value
    },
    setSociosFiltrados(state, value){
      state.sociosFiltrados = value
    },
  },
  actions: {
    fetchSocioPorId({commit, state},id){
      socioService.get(id).then(response => {
        if(response.data.length == 0 || response.data === undefined){
          //Aqui prodia ir un mensaje especial
          console.log("len 0 o undefinedd")
          return
        }
        for(const atr in response.data){
          response.data[atr] = response.data[atr] || ""       
        }
        commit('setSocios', [response.data])
        //Guardar todos los socios como socios filtrados
        commit('setSociosFiltrados',state.socios)
      })      
    },
    fetchSociosPorApellido({commit, state},apellido){
      socioService.getByApellido(apellido).then(response => {
        //Si no hay resultados
        if(response.data.length == 0){
            //Aqui podria ir un mensaje especial
            return
        }
        //Ordenar los socios por su numero de socio
        response.data.sort((socio1, socio2)=>{
            return socio1.nro_registro - socio2.nro_registro
        })
        //Ordenar los correos de todos los socios
        for(let socio of response.data){
            for(const atr in socio){
              socio[atr] = socio[atr] || ""       
            }
            socio.correos.sort((correo1, correo2)=>{
              return correo1.prioridad - correo2.prioridad
          })
        }
        commit('setSocios',response.data)
        commit('setSociosFiltrados',state.socios)
      });
    },
    fetchSociosPorNombre({commit, state},nombre){
      socioService.getByName(nombre).then(response => {
        //Si no hay resultados
        if(response.data.length == 0){
            //Aqui podria ir un mensaje especial
            return
        }
        //Ordenar los socios por su numero de socio
        response.data.sort((socio1, socio2)=>{
            return socio1.nro_registro - socio2.nro_registro
        })
        //Ordenar los correos de todos los socios
        for(let socio of response.data){
          for(const atr in socio){
            socio[atr] = socio[atr] || ""       
          }
          socio.correos.sort((correo1, correo2)=>{
            return correo1.prioridad - correo2.prioridad
          })
        }

        commit('setSocios',response.data)
        commit('setSociosFiltrados',state.socios)
      }); 
    },
    restablecerEdicion({commit, state}){
      let clone = cloneDeep(state.sociosFiltrados[state.socioActual-1])
      commit("setSocioEditado", clone)
    },
    editarSocio({dispatch, commit, state}){
      //Llamar a servicio editar.
      console.log("editar")
      //Volver al principio o algo asi, volver a fetchear podria ser por el mismo id
      dispatch('fetchSocioPorId',state.sociosFiltrados[state.socioActual-1].nro_registro)
      commit('resetSocioActual')  
    }
  }
}
const ingresos = {
  namespaced: true,
  state: () => ({
    ingresosMes: [],
    ingresosSeleccionados: [],
    ingresoEditado: {},
    ingresoActual: 1,
  }),
  mutations: {
    setIngresosMes(state, value){
      state.ingresosMes = value
    },
    setIngresosSeleccionados(state, value){
      state.ingresosSeleccionados = value
    },
    resetIngresosSeleccionados(state){
      state.ingresosSeleccionados = []
    },
    setIngresoActual(state, value){
      state.ingresoActual = value
    },
    setIngresoEditado(state, value){
      state.ingresoEditado = value
    },
    resetIngresoEditado(state){
      state.ingresoEditado = {
        ingresoId: '',
        ingTitulo: '',
        ingRut: '',
        ingLugar: 'Temuco',
        ingFecha: '',
        ingGlosa: '',
        cuotaSocios: [],
        cuotaCreditos: [],
        detalleCuentas: []
      }
    },
    setIngresoEditado_ingresoId(state, value){
      state.ingresoEditado.ingresoId = value
    },
    setIngresoEditado_ingTitulo(state, value){
      state.ingresoEditado.ingTitulo = value
    },
    setIngresoEditado_ingRut(state, value){
      state.ingresoEditado.ingRut = value
    },
  },
  actions: {
    fetchIngresosPorMes({commit}, {mes, año}){
      ingresoService.getAllByMes(mes, año).then((response)=>{
        const reducerDebe = (pv, cv) => pv.debe + cv.debe
        const reducerHaber = (pv, cv) => pv.haber + cv.haber
        for(let ingreso of response.data){
          if(ingreso.detalleCuentas.length > 1){
            ingreso.totalDebe = ingreso.detalleCuentas.reduce(reducerDebe)
            ingreso.totalHaber = ingreso.detalleCuentas.reduce(reducerHaber)
          }
          else{
            ingreso.totalDebe = ingreso.detalleCuentas[0].debe
            ingreso.totalHaber = ingreso.detalleCuentas[0].haber
          }
        }
        commit('setIngresosMes', response.data)
      })
    }
  }
}

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    socios: socios,
    ingresos: ingresos
  }
})
