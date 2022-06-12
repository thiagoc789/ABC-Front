import axios from "axios";
import ROUTES from "./apiRoutes";

class userServices {
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