import ApiService from "@/services/api.service";
const url = "socio/excel";
export const service = {
    upload(file) {
        return ApiService.postFile(url, file);
    },
}
export default service;