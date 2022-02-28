import ApiService from "@/services/api.service";
const url = "socio";
export const service = {
    getAll() {
        return ApiService.get(url, { id: "" });
    },
    get(id) {
        console.log("get(id)")
        return ApiService.get(url, { slug: id });
    },
    getByName(token) {
        return ApiService.get(url+'/buscar/nombre', { slug: token });
    },
    getByApellido(token) {
        return ApiService.get(url+'/buscar/apellido', { slug: token });
    },
    create(params) {
        return ApiService.post(url, { params: params });
    },
    update( params) {
        return ApiService.update(url+'/editar', { params: params });
    },
    destroy(id) {
        return ApiService.delete(url+"/eliminar", { id: id });
    },
};
export default service;