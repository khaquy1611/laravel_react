/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/configs/axios'
import { baseSave, baseDestroy } from './BaseServices'
import { PostCatalogue } from '@/types/PostCatalogues'

const endpoint = '/auth/posts'

const pagination = async (queryString: string) => {
  const response = await axios.get(`${endpoint}?${queryString}`)
  return response.data
}

interface Tag {
  value: string
  label: string
}

export type PostPayloadInput = {
  name: string
  description?: string | null
  content?: string | null
  canonical: string
  meta_title?: string
  meta_keyword?: string
  meta_description?: string
  post_catalogue_id?: number | undefined
  publish?: number | undefined
  follow?: number | undefined
  image?: any
  icon?: any
  tags?: Tag[]
  // icon?: File,
}

export type PostPayloadForSubmit = Omit<PostPayloadInput, 'tags'> & {
  tags?: string[]
}

const save = async (
  payload: PostPayloadInput,
  updateParams: { action: string; id: string | undefined }
) => {
  const payloadSubmit: PostPayloadForSubmit = {
    ...payload,
    tags: payload.tags ? payload.tags.map((tag: Tag) => tag.value) : undefined,
  }

  return baseSave(endpoint, payloadSubmit, updateParams)
}

const destroy = async (id: string) => {
  return baseDestroy(id, endpoint)
}

const findById = async (id: string | undefined): Promise<PostCatalogue> => {
  const response = await axios.get(`${endpoint}/${id}`)
  return response.data
}

export { pagination, save, destroy, findById }
