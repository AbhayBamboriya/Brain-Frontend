import axios from "axios";
const   BASE_URL='http://localhost:5000/api'
// const changePasswordUrl='localhost:4051/api/v1/user/password'
const axiosInstance=axios.create();
// axiosInstance.defaults.changeUrl=changePasswordUrl
axiosInstance.defaults.baseURL=BASE_URL
axiosInstance.defaults.withCredentials=true
export default axiosInstance