import axios from '@/configs/axios'
import { baseSave, baseDestroy } from './BaseServices'
import {
  UserCataloguesType,
  UserCataloguePayloadInput,
} from '@/types/UserCatalogues'

const endpoint = '/auth/user_catalogues'
const pagination = async (queryString: string) => {
  const response = await axios.get(`${endpoint}?${queryString}`)
  return response.data
}

const save = async (
  payload: UserCataloguePayloadInput,
  updateParams: { action: string; id: string | undefined }
) => {
  return baseSave(endpoint, payload, updateParams)
}

const destroy = async (id: string) => {
  return baseDestroy(id, endpoint)
}

const getUserCatalogueById = async (
  id: string | undefined
): Promise<UserCataloguesType> => {
  const response = await axios.get(`${endpoint}/${id}`)
  return response.data
}

export { pagination, save, destroy, getUserCatalogueById }
