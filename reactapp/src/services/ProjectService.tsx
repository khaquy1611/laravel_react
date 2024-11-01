/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/configs/axios'
import { baseSave, baseDestroy } from './BaseServices'
import { ProjectCatalogue } from '@/types/ProjectCatalogue'

const endpoint = '/auth/projects'

const pagination = async (queryString: string) => {
  const response = await axios.get(`${endpoint}?${queryString}`)
  return response.data
}

interface Tag {
  value: string
  label: string
}

export type ProjectPayloadInput = {
  name: string
  description?: string | null
  content?: string | null
  canonical: string
  meta_title?: string
  meta_keyword?: string
  meta_description?: string
  project_catalogue_id?: number | undefined
  publish?: number | undefined
  follow?: number | undefined
  image?: any
  icon?: any
  tags?: Tag[]
  // icon?: File,
}

export type ProjectPayloadForSubmit = Omit<ProjectPayloadInput, 'tags'> & {
  tags?: string[]
}

const save = async (
  payload: ProjectPayloadInput,
  updateParams: { action: string; id: string | undefined }
) => {
  const payloadSubmit: ProjectPayloadForSubmit = {
    ...payload,
    tags: payload.tags ? payload.tags.map((tag: Tag) => tag.value) : undefined,
  }

  return baseSave(endpoint, payloadSubmit, updateParams)
}

const destroy = async (id: string) => {
  return baseDestroy(id, endpoint)
}

const findById = async (id: string | undefined): Promise<ProjectCatalogue> => {
  const response = await axios.get(`${endpoint}/${id}`)
  return response.data
}

export { pagination, save, destroy, findById }
