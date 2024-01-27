import Axios from "axios";

//const BASE_URL = "https://server.masterymap.online:8000/api";
const BASE_URL = "http://localhost:8000/api";

export const axiosPublic = Axios.create({
  baseURL: BASE_URL,
});



