import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const BulkInstance = axios.create({ baseURL });
BulkInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token"); //import.meta.env.VITE_REACT_APP_TOKEN;
    
    console.log(token, "token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
   
    
    return config;
  },
  (error) => {
    Promise.reject(error);
    console.log(error);
  }
);

export default BulkInstance;
