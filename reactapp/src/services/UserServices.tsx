import axios from '@/configs/axios'
// import { handleAxiosError } from '@/helpers/axiosHelper'

const pagination = async (page: number | null) => {
    const response = await axios.get(`/auth/users?page=${page}`)
    return response.data
}

export { pagination }