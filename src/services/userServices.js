import axios from "axios";
import ROUTES from "./apiRoutes";

class userServices {

  login(data){
    return axios.post(`${ROUTES.USER}/login/`, data)
  }
  getUserAuthenticated(){
    return axios.get(`${ROUTES.USER}/user-authenticated/`)
  }
  logout(){
    return axios.post(`${ROUTES.USER}/logout/`)
  }
  getUsers() {
    console.log(ROUTES.USER);
    return axios.get(`${ROUTES.USER}/`);
  }
  createUser(values) {
    return axios.post(`${ROUTES.USER}/`, values);
  }
  updateUser(id, values) {
    return axios.patch(`${ROUTES.USER}/${id}`, values);
  }
  getSingleUser(id) {
    return axios.get(`${ROUTES.USER}/${id}`);
  }
  deleteUser(id) {
    return axios.delete(`${ROUTES.USER}/${id}`);
  }
}

export default new userServices();