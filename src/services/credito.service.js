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
};
export default service;