/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/configs/axios'
import { handleAxiosError } from '@/helpers/axiosHelper'
import { UpdateStatusByFieldParam } from '@/types/Base'

const updateStatusByField = async ({
  id,
  value,
  column,
  model,
}: UpdateStatusByFieldParam) => {
  try {
    const response = await axios.put(`/auth/${model}/${id}/status`, {
      value,
      column,
    })
    return response
  } catch (error) {
    handleAxiosError(error)
  }
}

const deleteAll = async (ids: string[], model: string, refetch: any) => {
  try {
    const response = await axios.delete('/auth/records/delete/batch', {
      data: {
        ids,
        model,
      },
    })
    refetch()
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

const updateFieldByParams = async (
  action: string,
  ids: string[],
  model: string,
  selectedValue: string,
  refetch: any
) => {
  try {
    const response = await axios.put('/auth/records/update/batch', {
      ids: ids,
      model: model,
      field: action,
      value: selectedValue,
    })
    refetch()
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

const getLocationData = async (
  locationType: string,
  parentId: string | undefined
) => {
  const response = await axios.get(
    `/auth/location?locationType=${locationType}${
      parentId !== undefined ? `&parent_id=${parentId}` : ''
    }`
  )
  return response.data
}

export interface PayloadInput<T> {
  [key: string]: T
}

const baseSave = async <T,>(
  apiUrl: string,
  payload: PayloadInput<T>,
  updateParams: { action: string; id: string | undefined }
) => {
  const formData = new FormData()
  const keys = Object.keys(payload) as Array<keyof PayloadInput<T>>
  let hasFile = false

  keys.forEach(key => {
    const value = payload[key]
    if (value instanceof FileList && value.length) {
      if (value.length === 1) {
        formData.append(key as string, value[0])
      } else {
        for (let i = 0; i < value.length; i++) {
          formData.append(`${key}[]`, value[i])
        }
      }
      hasFile = true
    } else if (value instanceof File) {
      formData.append(key as string, value)
      hasFile = true
    } else {
      formData.append(key as string, String(value))
    }
  })

  if (updateParams.action === 'update' && updateParams.id) {
    formData.append('_method', 'PUT')
    apiUrl = `${apiUrl}/${updateParams.id}`
  }

  const headers: HeadersInit = {}
  if (hasFile) {
    headers['Content-Type'] = 'multipart/form-data'
  }

  const response = await axios.post(apiUrl, formData, {
    headers: headers,
  })
  return response.data
}

const baseDestroy = async (id: string, model: string) => {
  const apiUrl = `${model}/${id}`
  const response = await axios.delete(apiUrl)
  return response.data
}

const sort = async (id: string, model: string, value: string) => {
  const response = await axios.post('/auth/sort', {
    id,
    model,
    value,
  })
  return response.data
}

export {
  updateStatusByField,
  updateFieldByParams,
  deleteAll,
  getLocationData,
  baseSave,
  baseDestroy,
  sort,
}
