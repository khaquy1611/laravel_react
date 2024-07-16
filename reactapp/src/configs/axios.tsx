import axios from "axios"

const axiosIntance = axios.create({
    baseURL: 'https://laravelreact/api/v1',
    headers: {
        'Content-Type' : 'application/json'
    }
})

axiosIntance.interceptors.response.use(
    response => {
        return response.data ? response.data : response
    },
    error => {
        const { response } = error
        if (response.status === 401) {
            // refresh token ở đây
        }
        return Promise.reject(error)
    }
)
export default axiosIntance