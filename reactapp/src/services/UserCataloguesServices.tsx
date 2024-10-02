import axios from '@/configs/axios'
import { UserCataloguePayloadInput, UserCataloguesType } from '@/types/UserCatalogues'
import { baseDestroy, baseSave } from './BaseServices'

const save = async (
  payload: UserCataloguePayloadInput,
  updateParams: { action: string; id: string | null }
) => {
  return baseSave('/auth/user_catalogues', payload, updateParams)
}
const pagination = async (queryString: string | null) => {
  const response = await axios.get(`/auth/user_catalogues?${queryString}`)
  return response.data
}

const getUserCatalogueById = async (userId: string | null): Promise<UserCataloguesType> => {
  const response = await axios.get(`/auth/user_catalogues/${userId}`)
  return response.data
}

const destroy = async (id: string) => {
  return baseDestroy(id, '/auth/user_catalogues')
}



export { pagination, save, getUserCatalogueById, destroy }
