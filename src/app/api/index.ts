import Axios from "axios";

const BASE_URL = "https://meeting-app-server.onrender.com/api";

export const axiosPublic = Axios.create({
  baseURL: BASE_URL,
});



