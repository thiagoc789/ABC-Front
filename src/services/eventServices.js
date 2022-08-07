import axios from "axios";
import ROUTES from "./apiRoutes";

class userServices {
  login(data){
    return axios.post(`${ROUTES.USER}/login/`, data)
  }
  logout(){
    return axios.post(`${ROUTES.USER}/logout/`)
  }
  getUsers() {    
    return axios.get(`${ROUTES.USER}/`);
  }
  createUser(values) {
    return axios.post(`${ROUTES.USER}/register/`, values);
  }
  updateUser(id, values) {
    return axios.put(`${ROUTES.USER}/${id}`, values);
  }
  getSingleUser(id) {
    return axios.get(`${ROUTES.USER}/${id}`);
    
  }
  deleteUser(id) {
    return axios.delete(`${ROUTES.USER}/${id}`);
  }
}

export default new userServices();