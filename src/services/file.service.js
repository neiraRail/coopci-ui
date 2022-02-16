import ApiService from "@/services/api.service";
const url = "files";
export const service = {
    upload(file) {
        return ApiService.postFile(url, file);
    },
}
export default service;