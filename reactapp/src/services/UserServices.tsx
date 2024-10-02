import axios from '@/configs/axios'
import { UserPayloadInput, UserType } from '@/types/User'
import { baseDestroy, baseSave } from './BaseServices'
import { handleAxiosError } from '@/helpers/axiosHelper'

const save = async (
  payload: UserPayloadInput,
  updateParams: { action: string; id: string | null }
) => {
  return baseSave('/auth/users', payload, updateParams)
}
const pagination = async (queryString: string | null) => {
  const response = await axios.get(`/auth/users?${queryString}`)
  return response.data
}

const getUserById = async (userId: string | null): Promise<UserType> => {
  const response = await axios.get(`/auth/users/${userId}`)
  return response.data
}

const destroy = async (id: string) => {
  return baseDestroy(id, '/auth/users')
}

const changePassword = async (
  id: string,
  payload: { password: string; confirmPassword: string }
) => {
  try {
    const response = await axios.put(`/auth/users/${id}/reset-password`, {
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    })

    return response.data
  } catch (error) {
    handleAxiosError(error)
    return error
  }
}

export { pagination, save, getUserById, destroy, changePassword }
