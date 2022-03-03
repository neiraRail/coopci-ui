import Vue from 'vue'
import Vuex from 'vuex'
import socioService from "@/services/socio.service";
import ingresoService from "@/services/ingreso.service";
import creditoService from '@/services/credito.service'
import { auth } from './auth.module';
var cloneDeep = require('lodash.clonedeep');

Vue.use(Vuex)

const creditos = {
  namespaced: true,
  state: ()=> ({
    creditos: [{
      "nroFolio": '',
      "socio": {
          "nro_registro": '',
          "nombre1": "",
          "nombre2": "",
          "apellido1": "",
          "apellido2": "",
          "rut": "",
          "telefonos": [],
          "correos": []
      },
      "nro_cuotas": '',
      "monto": '',
      "interes": '',
      "fecha_otorgamiento": "7",
      "fecha_vencimiento": "",
      "comision": 0,
      "valor_cuota": '',
      "estado": {
          "estado_id": 1,
          "estado_nombre": "Vigente"
      },
      "tablaDesarrollo": [{'vencimiento': ''}],
      "pagos": [],
      "ultimaPagada": 0,
      "diasRetraso": '',
      "montoEntregado": ''
  }],
    creditosFiltrados: [{}],
    creditoEditado: {},
    criterioOrden: "Retraso"
  }),
  mutations: {
    setCreditos(state, value){
      state.creditos = value
    },
    ordenarPorFolio(state){
      state.creditos = state.creditos.sort((a,b) => b.nroFolio-a.nroFolio)
    },
    ordenarPorRetraso(state){
      state.creditos = state.creditos.sort((a,b)=> b.diasRetraso-a.diasRetraso)
    },
    ordenarPorMonto(state){
      state.creditos = state.creditos.sort((a,b)=> b.montoEntregado-a.montoEntregado)
    },
    cambiarOrden(state){
      state.creditos.reverse()
    },
    setCriterioOrden(state, value){
      state.criterioOrden = value
    }
  },
  actions: {
    fetchTodosLosCreditos({state, commit}){
      commit('setCargando', true, {root: true})
      creditoService.getAll().then((response)=>{
        commit("setCreditos", response.data)
        state.creditos.forEach((credito)=>{
            credito.tablaDesarrollo = credito.tablaDesarrollo.sort((a,b)=>a.nro_cuota-b.nro_cuota)

            credito.ultimaPagada = Math.floor(credito.pagos.reduce((prv, curr)=>{
                return prv + curr.interes + curr.amortizacion 
            }, 0) / credito.valor_cuota)

            let vencimiento = new Date(credito.tablaDesarrollo[credito.ultimaPagada].vencimiento)
            let difference = Date.now() - vencimiento.getTime()
            //Solo si es positivo
            let retraso = Math.floor(difference/(1000*3600*24))
            credito.diasRetraso = retraso > 0 ? retraso : 0

            //Codigo para calcular monto entregado. Esto deberia estar en la base de datos:
            credito.montoEntregado = credito.tablaDesarrollo.reduce((prv, curr)=>{
                return prv + curr.interes
            }, 0)
        })
        
        commit("setCreditos", state.creditos.sort((a,b) => b.diasRetraso-a.diasRetraso))
        commit("setCargando", false, {root:true})
    })
    }
  }
}

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
              macro_ocp_nombre: ""
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
              macro_ocp_nombre: ""
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
              macro_ocp_nombre: ""
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
      commit('setCargando', true, {root: true})
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
        commit('setCargando', false, {root: true})
      })      
    },
    fetchSociosPorApellido({commit, state},apellido){
      commit('setCargando', true, {root: true})
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
        commit('setCargando', false, {root: true})
      });
    },
    fetchSociosPorNombre({commit, state},nombre){
      commit('setCargando', true, {root: true})
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
        commit('setCargando', false, {root: true})
      }); 
    },
    restablecerEdicion({commit, state}){
      let clone = cloneDeep(state.sociosFiltrados[state.socioActual-1])
      commit("setSocioEditado", clone)
    },
    editarSocio({dispatch, commit, state}){
      //Llamar a servicio editar.
      socioService.update(state.socioEditado).then((response) => {
        console.log(response)
      })
      console.log("editar")
      console.log(state.socioEditado)
      //Volver al principio o algo asi, volver a fetchear podria ser por el mismo id
      dispatch('fetchSocioPorId',state.sociosFiltrados[state.socioActual-1].nro_registro)
      commit('resetSocioActual')  
    },
    eliminarSocio({state}){
      console.log("eliminar "+state.sociosFiltrados[state.socioActual-1].nro_registro)
      socioService.destroy(state.sociosFiltrados[state.socioActual-1].nro_registro)
    }
  }
}
const ingresos = {
  namespaced: true,
  state: () => ({
    ingresosMes: [],
    ingresosSeleccionados: [],
    ingresoEditado: {
      ingresoId: '',
      ingTitulo: '',
      ingRut: '',
      ingLugar: 'Temuco',
      ingFecha: '',
      ingGlosa: '',
      cuotaSocios: [],
      cuotaCreditos: [],
      detalleCuentas: []
  },
    ingresoActual: 1,
    filtro_mes: null,
    filtro_año: null
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
    setFiltroMes(state, value){
      state.filtro_mes = value
    },
    setFiltroAño(state, value){
      state.filtro_año = value
    }    
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
    cargando: false
  },
  mutations: {
    setCargando(state, value){
      state.cargando = value;
    }
  },
  actions: {
    
  },
  modules: {
    socios: socios,
    ingresos: ingresos,
    auth,
    creditos: creditos
  }
})
