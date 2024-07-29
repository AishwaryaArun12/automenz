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
    console.log(error,'lllllllll');
    if(error.response.status == 401){
      window.location.href = 'https://automenz.onrender.com/login'
    }
  }
);
BulkInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access detected. Redirecting to login...');
      window.location.replace('https://automenz.onrender.com/login');
    }
    
    return Promise.reject(error);
  }
);


export default BulkInstance;
