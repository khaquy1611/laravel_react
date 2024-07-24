import axios from "axios"

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

axios.defaults.withCredentials  = true
axios.defaults.baseURL = 'https://laravelreact/api/v1'
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios