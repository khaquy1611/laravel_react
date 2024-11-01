import axios from '@/configs/axios'
import { baseSave, baseDestroy } from './BaseServices'

import {
  ProjectCatalogue,
  ProjectCataloguePayloadInput,
} from '@/types/ProjectCatalogue'

const endpoint = '/auth/project_catalogues'

const pagination = async (queryString: string) => {
  const response = await axios.get(`${endpoint}?${queryString}`)
  return response.data
}

const save = async (
  payload: ProjectCataloguePayloadInput,
  updateParams: { action: string; id: string | undefined }
) => {
  return baseSave(endpoint, payload, updateParams)
}

const destroy = async (id: string) => {
  return baseDestroy(id, endpoint)
}

const findById = async (id: string | undefined): Promise<ProjectCatalogue> => {
  const response = await axios.get(`${endpoint}/${id}`)
  return response.data
}

export { pagination, save, destroy, findById }
