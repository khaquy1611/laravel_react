import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

export const baseURL = `http://127.0.0.1:8000/api/v1/`

const apiCall: AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const refreshToken = async () => {
  try {
    const response = await apiCall.post('auth/refresh')
    return response
  } catch (error) {
    throw new Error('Không thể khởi tạo lại access token')
  }
}

axios.interceptors.response.use(
  response => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await refreshToken()
        return apiCall(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

axios.defaults.withCredentials = true
axios.defaults.baseURL = baseURL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

export default axios
