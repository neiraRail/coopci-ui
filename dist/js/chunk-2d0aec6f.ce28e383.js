(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aec6f"],{"0c06":function(o,t,s){"use strict";s.r(t);var i=function(){var o=this,t=o.$createElement,s=o._self._c||t;return s("v-sheet",{attrs:{rounded:"lg","min-height":"170"}},[s("v-container",[s("v-row",[s("v-col",{attrs:{align:"center"}},[o._v(" "+o._s(o.socioActual)+"/"+o._s(o.sociosFiltrados.length)+" ")])],1),s("v-row",[s("v-col",[s("v-btn",{attrs:{block:"",disabled:o.sociosFiltrados.length<=1},on:{click:o.siguienteResultado}},[o._v(" Sig. ")])],1)],1),s("v-row",[s("v-col",[s("v-btn",{attrs:{block:"",disabled:o.sociosFiltrados.length<=1},on:{click:o.anteriorResultado}},[o._v(" Ant. ")])],1)],1)],1)],1)},c=[],e=s("2f62"),a={computed:{...Object(e["d"])("socios",["socioActual","sociosFiltrados"])},methods:{siguienteResultado(){this.socioActual<this.sociosFiltrados.length?this.$store.commit("socios/setSocioActual",this.socioActual+1):this.$store.commit("socios/resetSocioActual"),this.$store.commit("socios/cerrarPaneles")},anteriorResultado(){this.socioActual>1?this.$store.commit("socios/setSocioActual",this.socioActual-1):this.$store.commit("socios/setSocioActual",this.sociosFiltrados.length),this.$store.commit("socios/cerrarPaneles")}}},l=a,r=s("2877"),n=s("6544"),u=s.n(n),d=s("8336"),h=s("62ad"),m=s("a523"),v=s("0fd9"),g=s("8dd9"),A=Object(r["a"])(l,i,c,!1,null,null,null);t["default"]=A.exports;u()(A,{VBtn:d["a"],VCol:h["a"],VContainer:m["a"],VRow:v["a"],VSheet:g["a"]})}}]);
//# sourceMappingURL=chunk-2d0aec6f.ce28e383.js.map