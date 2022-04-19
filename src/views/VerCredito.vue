<template>
    <v-sheet class="grey lighten-3">
    <v-container>
    <v-row>
    <v-col>
        <v-sheet
            min-height="80"
            rounded="lg"          
        >
            <v-container >
                <v-row class="text-caption font-weight-bold">
                    <v-col cols="3">Nombre</v-col>
                    <v-col>Nro Socio</v-col>
                    <v-col cols="2">Rut</v-col>
                    <v-col>Valor cuota</v-col>
                    <v-col>Nro Cuotas</v-col>
                    <v-col>Monto</v-col>
                    <v-col>Interes</v-col>
                    <v-col>Folio</v-col>
                </v-row>
                <v-row class="text-caption">
                    <v-col cols="3">{{creditoSeleccionado.socio.nombre1}} {{creditoSeleccionado.socio.apellido1}} {{creditoSeleccionado.socio.apellido2}}</v-col>
                    <v-col>{{creditoSeleccionado.socio.nro_registro}}</v-col>
                    <v-col cols="2">{{creditoSeleccionado.socio.rut}}</v-col>
                    <v-col>{{creditoSeleccionado.valor_cuota}}</v-col>
                    <v-col>{{creditoSeleccionado.nro_cuotas}}</v-col>
                    <v-col>{{creditoSeleccionado.monto}}</v-col>
                    <v-col>{{creditoSeleccionado.interes}} %</v-col>
                    <v-col>{{creditoSeleccionado.nroFolio}}</v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </v-col>
    </v-row>
    <v-row>
    <v-col>
        <v-sheet
            min-height="160"
            rounded="lg"
        >
            <v-container>
                <v-row>
                    <v-col>
                        <v-row class="font-weight-black">
                            <v-col cols="3">Fecha de pago</v-col>
                            <v-col>CI</v-col>
                            <v-col>Cuota</v-col>
                            <v-col>Abono</v-col>
                            <v-col>Saldo</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3"></v-col>
                            <v-col></v-col>
                            <v-col></v-col>
                            <v-col></v-col>
                            <v-col>{{creditoSeleccionado.monto}}</v-col>
                        </v-row>
                        <v-row v-for="(pago, index) in creditoSeleccionado.pagosJuntos" :key="index">
                            <v-col cols="3">{{pago.fecha}}</v-col>
                            <v-col>{{pago.ingresoId}}</v-col>
                            <v-col>{{pago.nroCuota}}</v-col>
                            <v-col>{{pago.interes + pago.amortizacion}}</v-col>
                            <v-col>{{pago.saldo}}</v-col>
                        </v-row>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col>
                        <v-row class="font-weight-black">
                            <v-col>Cuota</v-col>
                            <v-col>Interes</v-col>
                            <v-col>Amortizacion</v-col>
                            <v-col>Saldo</v-col>
                        </v-row>
                        <v-row>
                            <v-col></v-col>
                            <v-col></v-col>
                            <v-col></v-col>
                            <v-col>{{creditoSeleccionado.montoEntregado}}</v-col>
                        </v-row>
                        <v-row v-for="(pago, index) in creditoSeleccionado.pagosJuntos" :key="index">
                            <v-col>{{pago.nroCuota}}</v-col>
                            <v-col>{{pago.interes}}</v-col>
                            <v-col>{{pago.amortizacion}}</v-col>
                            <v-col>{{pago.saldoAmort}}</v-col>
                        </v-row>
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
import { mapState } from 'vuex'
export default {
    data(){
        return {

        }
    },
    computed: {
        ...mapState("creditos", ["creditoSeleccionado"])
    }
}
</script>