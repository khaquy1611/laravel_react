import axios from '@/configs/axios'
import { PayloadInput, UserType } from '@/types/User'
import { baseSave } from './BaseServices'

const save = async (payload: PayloadInput, updateParams: { action: string, id: string | null }) => {
  return  baseSave('/auth/users', payload, updateParams)
}
const pagination = async (queryString: string | null) => {
  const response = await axios.get(`/auth/users?${queryString}`)
  return response.data
}

const getUserById = async (userId: string | null): Promise<UserType> => {
  const response = await axios.get(`users/${userId}`)
  return response.data
}


export { pagination, save, getUserById }
