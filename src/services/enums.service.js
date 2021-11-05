import ApiService from "@/services/api.service";
const url = "enums";
export const service = {
    getComunas() {
        return ApiService.get(url+"/comunas", { id: "" });
    },
    getNivelEducacionales() {
        return ApiService.get(url+"/educ", { id: "" });
    },
    getTipoPersonas() {
        return ApiService.get(url+"/tipoPersona", { id: "" });
    },
    getEstadoCiviles() {
        return ApiService.get(url+"/estadoCivil", { id: "" });
    },
    getSexos() {
        return ApiService.get(url+"/sexo", {id: ""});
    },
    getCuentas() {
        return ApiService.get(url+"/cuenta", {id: ""});
    }
};
export default service;