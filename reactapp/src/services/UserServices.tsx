import axios from '@/configs/axios'
import { UserPayloadInput, UserType } from '@/types/User'
import { baseSave, baseDestroy } from './BaseServices'
import { handleAxiosError } from '@/helpers/axiosHelper'

const pagination = async (queryString: string) => {
  const response = await axios.get(`/auth/users?${queryString}`)
  return response.data
}

const save = async (
  payload: UserPayloadInput,
  updateParams: { action: string; id: string | undefined }
) => {
  return baseSave('/auth/users', payload, updateParams)
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

const getUserById = async (id: string | undefined): Promise<UserType> => {
  const response = await axios.get(`/auth/users/${id}`)
  return response.data
}

export { pagination, save, destroy, getUserById, changePassword }
