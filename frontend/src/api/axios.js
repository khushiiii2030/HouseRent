import axios from "axios";

const api = axios.create({
  baseURL: "https://houserent-1-qdgk.onrender.com/api",
});

export default api;