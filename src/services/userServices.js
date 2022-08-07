import axios from "axios";
import ROUTES from "./apiRoutes";

class userServices {

  async login(email, password){
    const res = await axios.get(`${ROUTES.USER}/`)
    const logged = res.data.find((element) => element.Email === email && element.Password === password)
    console.log(logged);
    return logged;
  }
  logout(){
    return axios.post(`${ROUTES.USER}/logout/`)
  }
  getUsers() {    
    return axios.get(`${ROUTES.USER}/`);
  }
  createUser(values) {
    return axios.post(`${ROUTES.USER}/`, values);
  }
  updateUser(id, values) {
    return axios.put(`${ROUTES.USER}/${id}/`, values);
  }
  async getSingleUser(id) {
    const res = await axios.get(`${ROUTES.USER}/`);
    const logged = res.data.find((element) => element.id === parseInt(id))
    return logged;
  }
  deleteUser(id, values) {
    const {State, ...rest} = values;
    const estado = !State
    const data = {State: estado, ...rest}
    return axios.put(`${ROUTES.USER}/${id}/`, data);
  }
}

export default new userServices();