import axios from '@/configs/axios'

const pagination = async (page: number | null) => {
  const response = await axios.get(`/auth/users?page=${page}`)
  return response.data
}

export { pagination }
