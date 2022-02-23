<template>
    <v-sheet class="grey lighten-3">
    <v-container>
    <v-row>
    <v-col>
        <v-sheet
            min-height="160"
            rounded="lg"
        >
            <v-container>
                <v-row>
                    <v-col>
                        <h1 class="text-center">Subir planilla de socios</h1>
                        <br>
                        <p style="width=10"> Utilizar la siguiente planilla para ingresar los datos de los socios
                            que requiera ingresar al sistema.
                        </p>
                        <v-btn
                            class="ma-2" 
                            color="success"
                            href="Planilla Socios.xlsx"
                            download>
                            Descargar Excel
                        </v-btn>
                        Planilla Socios.xlsx
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <p>
                            La que debe ser llenada de la siguiente forma y pintando de
                            un color las filas que se llenaron con datos.
                        </p>
                        <b>Ejemplo:</b>
                        <img src="Ejemplo de planilla con datos.png" alt="">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <b>Al llenarla súbala aqui:</b>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-file-input accept=".xlsx" label="Select File..." v-model="file"></v-file-input>
                    </v-col>
                    <v-col>
                        <v-btn
                          :disabled="dialog || !this.file"
                          :loading="dialog"
                          @click="subirArchivo"
                        >
                            Subir
                            </v-btn>
                            <v-dialog
                              v-model="dialog"
                              hide-overlay
                              persistent
                              width="300"
                            >
                            <v-card
                              color="primary"
                              dark
                            >
                                <v-card-text>
                                Procesando...
                                <v-progress-linear
                                  indeterminate
                                  color="white"
                                  class="mb-1"
                                ></v-progress-linear>
                                </v-card-text>
                            </v-card>
                            </v-dialog>
                    </v-col>
                    <v-col>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </v-col>
    </v-row>
    </v-container>
        

        
    </v-sheet>
    
</template>

<script>
import fileService from '@/services/file.service'
export default {
    data(){
        return {
            file: null,
            dialog : false
        }
    },
    methods:{
        subirArchivo(){
            this.dialog = true;
            fileService.upload(this.file).then((response)=>{
                this.file = null;
                //gpasar la respuesta de alguna manera
                setTimeout(()=>{
                    this.$router.push({name: 'resultadosubir', params: {respuesta: response}})
                    console.log(response)
                    this.dialog = false
                }, 500)                
            }).catch((error)=>{
                setTimeout(()=>{
                    this.dialog = false
                }, 500)
                console.log(error)
            })
        }
    }
    
}
</script>