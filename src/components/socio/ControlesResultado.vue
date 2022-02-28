<template>
    <v-sheet rounded="lg"
        min-height="218">
            <v-container>
                <v-row>
                    <v-col><v-btn block color="#70C1B3" @click="$router.push('Home')">Inicio</v-btn></v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn block @click="$router.push('Subir')">Subir otro</v-btn>
                    </v-col>
                </v-row>
                <br>
                <br>
                <v-row>
                    <v-col>
                        <v-dialog v-model="confirmarDialog"
                            persistent
                            width="300">
                            <v-card>
                                <v-card-title>
                                    ¿Está seguro?
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-btn color ="error" @click="deshacerCambios">Deshacer</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="confirmarDialog=false">Cancelar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-btn block color="error" 
                        @click="confirmarDeshacer"
                        :disabled="data.sociosGuardados.length==0"
                        v-if="data.exito"
                        >Deshacer</v-btn>
                    </v-col>
                </v-row>
            </v-container>
            

        </v-sheet>
</template>

<script>
import sociosService from '@/services/socio.service'
export default {
    props: {
        data: {
            default(){
                return {
                    sociosGuardados: []
                }
            }
        }
    },
    data(){
        return {
            confirmarDialog: false,
        }
    },
    methods:{
        confirmarDeshacer(){
            this.confirmarDialog = true;
        },
        deshacerCambios(){
            for(let socio of this.data.sociosGuardados){
                console.log("mandando a eliminar el nro: "+socio.nro_registro)
                sociosService.destroy(socio.nro_registro).then((response)=>{
                    console.log(response)
                    console.log("Eliminado! " +socio.nro_registro)
                })
            }
            this.confirmarDialog = false;
            this.$router.push("Subir")
        }
    },
    computed:{
        
    }
}
</script>