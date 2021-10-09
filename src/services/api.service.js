import axios from "axios";
import { API_URL } from '@/common/config.js'
var swisApi = axios.create({ baseURL: API_URL });

const apiService = {
  setHeader() {
    var token = localStorage.getItem('jwt');
    swisApi.defaults.headers.common["Authorization"]
      = `Bearer ${token}`;
  },
  post(route, { params = " ", slug = "" }) {
    //this.setHeader();
    return swisApi.post(`${route}/${slug}`, params).catch(error => {
      throw new Error(error.response.data.message);
    });
  },
  update(route, { params = " ", slug = "" }) {
    //this.setHeader();
    return swisApi.put(`${route}/${slug}`, params).catch(error => {
      throw new Error(`ApiService Error: ${error}`);
    });
  },
  get(route, { slug = "" }) {
    //this.setHeader();
    return swisApi.get(`${route}/${slug}`).catch(error => {
      throw new Error(`ApiService Error: ${error}`);
    });
  },
  delete(route, { id = "", params="" }) {
    //this.setHeader();
    return swisApi.delete(`${route}/${id}`,{data: params}).catch(error => {
      throw new Error(error.response.data.message);
    });
  }
}
export default apiService;