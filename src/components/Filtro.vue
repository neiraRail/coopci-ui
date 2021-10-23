<template>
    <v-sheet 
        min-height="160" 
        class="panel-filtros"
        rounded="lg">
        <v-container>
            <v-form>
                <v-row>
                    <v-col>
                        <v-combobox 
                            v-model="filtro_columna" 
                            :items="filtros"
                            item-text="text" 
                            dense clearable
                            label="Filtro"
                            @change="filtro_valor=''"
                            :disabled="socios.length<=1"
                            >
                            
                        </v-combobox>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-combobox 
                            v-model="filtro_valor"  
                            dense multiple small-chips clearable
                            label="Opcion"
                            text="text"
                            :disabled="filtro_columna=='' || filtro_columna==null || itemsOpcion.length<=1"
                            :items="itemsOpcion"
                            >
                        </v-combobox>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </v-sheet>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data(){
        return{
            filtro_valor: [],
            filtro_columna: '',
            filtros: [
              {
                text: 'Comuna',
                attr: 'direccion_comuna.comuna_nombre',
                check: 'direccion_comuna',
                metodo: (val)=>{return val},
                opciones: []
              },
              {
                text: 'Nivel educacion', 
                attr: 'nivel_educacional.nivel_educacional_nombre',
                check: 'nivel_educacional', 
                metodo: (val)=>{return val},
                opciones: []
              },
              {
                text: 'Part trafkintun', 
                attr: 'part_trafkintun',
                check: 'part_trafkintun', 
                metodo: (val)=>{return val ? 'Si' : 'No'},
                opciones: []
              },
              {
                text: 'Tipo persona',
                attr: 'tipo_persona.tipo_persona_nombre',
                check: 'tipo_persona',
                metodo: (val)=>{return val},
                opciones: []
              },
              {
                text: 'Estado civil',
                attr: 'estado_civil.estado_civil_nombre',
                check: 'estado_civil',
                metodo: (val)=>{return val},
                opciones: []
              }
            ]
        }
    },
    methods: {
        limpiarFiltros(){
            this.filtro_columna = ''
            this.filtro_valor = ''
        },
        numeroFiltrados(filtro){
          return this.socios.filter(socio=>{
              //Obtener el valor del atributo que está en formato string en filtro_columna.attr
              let arr = this.filtro_columna.attr.split('.')
              while(arr.length && socio!=null){
                socio = socio[arr.shift()];
              }              
              //Se compara con el valor del filtro
              return socio == filtro
            }).length
        },
    },
    watch: {
        filtro_valor(val){
            //Reset actual
            this.$store.commit('resetActual')
            //Filtrar si los combobox no están vacios
            if(this.filtro_columna && val.length>0){  
                let filtrados = []
                console.log("hay un filtro")
                for(let opcion of val){
                    filtrados = filtrados.concat(this.socios.filter(socio=>{
                        let arr = this.filtro_columna.attr.split('.') 
                        while(arr.length && socio!=null){
                            socio = socio[arr.shift()];
                        }              
                        //[0] porque se toma el primer elemento de la lista de valores
                        return socio == opcion.valor
                    }))                    
                }
                this.$store.commit('setSociosFiltrados', filtrados)
                
            }else{
                //Esto puede ser un clear, o deseleccionar todo.
                this.$store.commit('setSociosFiltrados', this.socios)
            }
        },
    },
    computed: {
        itemsOpcion(){
            //Devuelve listado de valores disponibles para el atributo que se quiere filtrar.
            if(this.filtro_columna){
                let opciones = this.posiblesFiltros[this.filtro_columna.attr]
                return opciones.sort((valor1, valor2)=>{
                    return valor2.count - valor1.count
                })
            }
            else
                return []
        },
        posiblesFiltros(){
            //Calcula un objeto de pares key-value donde la key es el atributo que se quiere filtrar
            //y el value es un listado de valores disponibles en ese atributo.
            //Este objeto es accedido e indexado por itemsOpcion()

            let posibles = {}
            for(let filtro of this.filtros){
                let opciones = []
                for(let socio of this.socios){
                    
                    let check = socio
                    let arr = filtro.check.split('.') 
                    while(arr.length && check!=null){
                        check = check[arr.shift()];
                    }
                    let arr2 = filtro.attr.split('.') 
                    while(arr2.length && socio!=null){
                        socio = socio[arr2.shift()];
                    }
                    let opcion = socio
                    if(check){
                        opciones.push({
                            'valor': opcion,
                            'text': ''+filtro.metodo(opcion)+' - '+this.numeroFiltrados(opcion),
                            'count': this.numeroFiltrados(opcion)
                        });
                    }else{
                        opciones.push({
                            'valor': opcion,
                            'text': 'Sin Respuesta - '+this.numeroFiltrados(opcion),
                            'count': this.numeroFiltrados(opcion)
                        });
                    }       
                }
                posibles[filtro.attr] = opciones
            }
            return posibles
        },
        ...mapState(['socios','sociosFiltrados'])
        
    }
    
}
</script>

<style>
    .panel-filtros{
        margin-top: 12px;
    }
</style>