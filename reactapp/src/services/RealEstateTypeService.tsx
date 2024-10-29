import axios from '@/configs/axios'
import { baseDestroy, baseSave } from './BaseServices'

export interface IObject {
  name: string
  canonical: string
  [key: string]: string | undefined
}

const endpoint = '/auth/real_estate_types'

const pagination = async (queryString: string) => {
  const response = await axios.get(`${endpoint}?${queryString}`)
  return response.data
}

const save = async (
  payload: IObject,
  updateParams: { action: string; id: string | undefined }
) => {
  return baseSave(endpoint, payload, updateParams)
}

const destroy = async (id: string) => {
  return baseDestroy(id, endpoint)
}

const getObjectById = async (id: string | undefined): Promise<IObject> => {
  const response = await axios.get(`${endpoint}/${id}`)
  return response.data
}

export { destroy, getObjectById, pagination, save }
