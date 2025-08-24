import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'http://round5-byway.huma-volve.com/api'
})
axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("auth_token");
     console.log("Token used in request:", token);
    if(token)
       config.headers.Authorization = `Bearer ${token}`;
    return config
})
export default axiosInstance;