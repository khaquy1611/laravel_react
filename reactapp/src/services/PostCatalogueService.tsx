import axios from '@/configs/axios'
import { baseSave, baseDestroy } from './BaseServices'
import {
  PostCatalogue,
  PostCataloguePayloadInput,
} from '@/interfaces/types/PostCatalogue'

const endpoint = '/auth/post_catalogues'

const pagination = async (queryString: string) => {
  const response = await axios.get(`${endpoint}?${queryString}`)
  return response.data
}

const save = async (
  payload: PostCataloguePayloadInput,
  updateParams: { action: string; id: string | undefined }
) => {
  return baseSave(endpoint, payload, updateParams)
}

const destroy = async (id: string) => {
  return baseDestroy(id, endpoint)
}

const getPostCatalogueById = async (
  id: string | undefined
): Promise<PostCatalogue> => {
  const response = await axios.get(`${endpoint}/${id}`)
  return response.data
}

export { pagination, save, destroy, getPostCatalogueById }
