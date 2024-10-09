import axios from '@/configs/axios'
import { baseSave, baseDestroy } from './BaseServices'

export interface ITag {
  name: string
  canonical: string
  [key: string]: string | undefined
}

const endpoint = '/auth/tags'

const pagination = async (queryString: string) => {
  const response = await axios.get(`${endpoint}?${queryString}`)
  return response.data
}

const save = async (
  payload: ITag,
  updateParams: { action: string; id: string | undefined }
) => {
  return baseSave(endpoint, payload, updateParams)
}

const destroy = async (id: string) => {
  return baseDestroy(id, endpoint)
}

// const update = async (payload: ITag) => {
//   const formData = new FormData()
// }

const getTagById = async (id: string | undefined): Promise<ITag> => {
  const response = await axios.get(`${endpoint}/${id}`)
  return response.data
}

export { pagination, save, destroy, getTagById }
