import axios from '@/configs/axios'
import { baseSave, baseDestroy } from './BaseServices'
import {
  UserCataloguesType,
  UserCataloguePayloadInput,
} from '@/types/UserCatalogues'

const pagination = async (queryString: string) => {
  const response = await axios.get(`/auth/user_catalogues?${queryString}`)
  return response.data
}

const save = async (
  payload: UserCataloguePayloadInput,
  updateParams: { action: string; id: string | undefined }
) => {
  return baseSave('/auth/user_catalogues', payload, updateParams)
}

const destroy = async (id: string) => {
  return baseDestroy(id, '/auth/user_catalogues')
}

const getUserCatalogueById = async (
  id: string | undefined
): Promise<UserCataloguesType> => {
  const response = await axios.get(`/auth/user_catalogues/${id}`)
  return response.data
}

export { pagination, save, destroy, getUserCatalogueById }
