import ApiService from "@/services/api.service";
const url = "ingreso";
export const service = {
    getAllByMes(mes) {
        return ApiService.get(url+'/mes', { slug: mes });
    },
    get(id) {
        return ApiService.get(url, { slug: id });
    },
    create(params) {
        return ApiService.post(url, { params: params });
    },
    update( params) {
        return ApiService.post(url, { params: params });
    },
    destroy(id) {
        return ApiService.delete(url, { id: id });
    },
};
export default service;