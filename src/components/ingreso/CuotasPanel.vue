<template>
    <v-sheet
      min-height="125"
      rounded="lg"
    >
      <v-container>
        <v-row>
          <v-col>
            <!-- Dialog -->
            <v-dialog
                v-model="dialogSocio"
                width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn block
                    color="blue lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="agregarCuotaSocio"
                    >
                    Cuotas Socio
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title>
                    Agregar cuotas socio
                    </v-card-title>

                    <v-card-text >          
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Fin Dialog -->
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!-- Dialog -->
            <v-dialog
                v-model="dialogCred"
                width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn block
                    color="blue lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="agregarCuotaCredito"
                    >
                    Cuotas Cred
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title>
                    Agregar cuotas crédito
                    </v-card-title>

                    <v-card-text >          
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Fin Dialog -->
          </v-col>
        </v-row>
      </v-container>                
    </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data(){
        return{
            dialogCred: false,
        }
    },
    methods:{
        agregarCuotaSocio(){
        },
        agregarCuotaCredito(){
        }
    },
    
})
</script>