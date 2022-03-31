import ApiService from "@/services/api.service";
const url = "creditos";
export const service = {
    getAll() {
        return ApiService.get(url+"/todos", { id: "" });
    },
    get(id) {
        console.log("get(id)")
        return ApiService.get(url, { slug: id });
    },
    create(params) {
        return ApiService.post(url, { params: params });
    },
    update( params) {
        return ApiService.update(url, { params: params });
    },
    destroy(id) {
        return ApiService.delete(url, { id: id });
    },
    simularAbono(params){
        return ApiService.post(url+"/simularAbono", {params: params})
    },
    abonar(params){
        return ApiService.post(url+"/abonar", {params: params})
    },
    abonarSinCi(params){
        return ApiService.post(url+"/abonarSinCi", {params: params})
    },
    getAllPagosSinCi(){
        return ApiService.get(url+"/pagosSinCi", {id: ''})
    }
};
export default service;