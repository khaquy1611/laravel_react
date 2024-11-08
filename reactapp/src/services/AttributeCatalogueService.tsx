/* eslint-disable @typescript-eslint/ban-types */
import axios from '@/configs/axios'
import { baseSave, baseDestroy } from '@/services/BaseServices'

import { AttributeCatalogue as Object } from '@/types/AttributeCatalogues'

const endpoint = '/auth/attribute_catalogues'
const pagination = async (queryString: string) => {
  const response = await axios.get(`${endpoint}?${queryString}`)
  return response.data
}

const save = async (
  payload: Object,
  updateParams: { action: string; id: string | undefined }
) => {
  return baseSave(`${endpoint}`, payload, updateParams)
}

const destroy = async (id: string) => {
  return baseDestroy(id, `${endpoint}`)
}

const findById = async (id: string | undefined): Promise<Object> => {
  const response = await axios.get(`${endpoint}/${id}`)
  return response.data
}

export { pagination, save, destroy, findById }
