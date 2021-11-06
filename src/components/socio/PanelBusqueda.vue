<template>
    <v-sheet
        rounded="lg"
        min-height="268"
    >
    <!-- Buscador -->
        <v-container>
            <v-form 
            ref="formulario" 
            lazy-validation
            v-model="valido">
                <v-row>
                    <v-col>
                        <v-text-field
                        label="Nro socio"
                        clearable
                        v-model="cb_nroSocio"
                        :disabled="(cb_apellido!='' && cb_apellido!=null) || (cb_nombre!='' && cb_nombre!=null)"
                        :rules="[!/([\D])/.test(cb_nroSocio) || cb_nroSocio===null]"
                        @keydown.enter="fetchSocios"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                        label="Nombre"
                        clearable
                        v-model="cb_nombre"
                        :disabled="(cb_apellido!='' && cb_apellido!=null) || (cb_nroSocio!='' && cb_nroSocio!=null)"
                        :rules="[!/[^a-z]/i.test(cb_nombre)]"
                        @keydown.enter="fetchSocios"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                        label="Apellido"
                        clearable
                        v-model="cb_apellido"
                        :disabled="(cb_nombre!='' && cb_nombre!=null) || (cb_nroSocio!='' && cb_nroSocio!=null)"
                        :rules="[cb_apellido => !/[^a-z]/i.test(cb_apellido)]"
                        @keydown.enter="fetchSocios"
                        ></v-text-field>                  
                    </v-col>                  
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn 
                        block
                        :disabled="((cb_nombre=='' || cb_nombre==null) && (cb_nroSocio=='' || cb_nroSocio==null) && (cb_apellido=='' || cb_apellido==null)) || !valido"
                        @click="fetchSocios"
                        >
                        Buscar
                        </v-btn>
                    </v-col>
                </v-row> 
            </v-form>
        </v-container>
    </v-sheet>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{
          valido: true,
          cb_nombre: '',
          cb_apellido: '',
          cb_nroSocio: '',
        }
    },
    methods: {
        fetchSocios(){
            //Validar el formulario
            if (this.$refs.formulario.validate()){
            //Resetear el número actual
            this.$store.commit('socios/resetSocioActual')
            //Si se buscó por el nro de socio
            if((this.cb_nombre === null || this.cb_nombre ==='') && (this.cb_apellido === null || this.cb_apellido === '')){
                this.fetchSocioPorId(this.cb_nroSocio);
            }
            //Si se buscó por apellido
            else if(this.cb_nombre === null || this.cb_nombre===''){
                this.fetchSociosPorApellido(this.cb_apellido);
            }
            //Si se buscó por nombre
            else if(this.cb_apellido === null || this.cb_apellido === ''){
                this.fetchSociosPorNombre(this.cb_nombre);
            }
            }
            else{
            //Si no valida el formulario. En principio no se puede llegar acá, pues botón se inhabilita
            console.log("error in validation")
            }
            //Cerrar los paneles
            this.$store.commit('socios/cerrarPaneles')
            //Evento para limpiar filtros  
            this.$emit('fetch')           
        }, 
        ...mapActions('socios', ['fetchSocioPorId','fetchSociosPorApellido','fetchSociosPorNombre']) 
    }
    
}
</script>