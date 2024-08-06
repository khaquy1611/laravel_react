import axios from '@/configs/axios'

const pagination = async (queryString: string | null) => {
  const response = await axios.get(`/auth/users?${queryString}`)
  return response.data
}

export { pagination }
