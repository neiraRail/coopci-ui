<template>
    <v-sheet 
        min-height="160"
        rounded="lg">
        <v-container>
            <v-row>
                <v-col>
                    <v-combobox
                        v-model="preset"
                        :items="presets"
                        label="Preset"
                        item-text="nombre"
                        dense
                        @change="cambiarPreset"
                    ></v-combobox>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn block color="#70C1B3" @click="limpiar"> Limpiar </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>  
</template>
<script>
export default {
    data (){
        return{
            preset: {nombre: "Sin preset", plantilla: {}},
            default: {nombre: "Sin preset", plantilla: {}},
            // hacerlos en la bd
            presets:[
                {
                    nombre: "Credito1",
                    plantilla: {
                        ingresoId: '',
                        ingTitulo: '',
                        ingRut: '',
                        ingLugar: 'Temuco',
                        ingFecha: '',
                        ingGlosa: 'Pago cuota %% de crédito folio %%',
                        cuotaSocios: [],
                        cuotaCreditos: [],
                        detalleCuentas: [
                            {
                                cuenta: {
                                    cuentaId: 110002,
                                    cuentaNombre: "Banco Estado"
                                },
                                debe: 0,
                                haber: 0
                            }
                        ]
                    }
                },
            ]
        }
    },
    methods: {
        cambiarPreset(){
            this.$store.commit('ingresos/setIngresoEditado', this.preset.plantilla)
        },
        limpiar(){
            const nuevo = {
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
            this.$store.commit('ingresos/setIngresoEditado', nuevo)
            this.preset = this.default
        }
    }
}
</script>