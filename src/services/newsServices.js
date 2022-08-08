import axios from "axios";
import ROUTES from "./apiRoutes";

class newsServices {
  getNews() {
    return axios.get(`${ROUTES.NEWS}/`)
  }
  createNews(values) {
    return axios.post(`${ROUTES.NEWS}/`, values)
  }
  updateNews(id, values){
    return axios.put(`${ROUTES.NEWS}/${id}/`, values)
  }
}

export default new newsServices();