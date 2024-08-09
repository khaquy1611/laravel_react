/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { handleAxiosError } from '@/helpers/axiosHelper'
import { UpdateStatusByFieldParam } from '@/types/Base'
import { PayloadInputType } from '@/types/User'

const updateStatusByField = async ({
  id,
  column,
  value,
  model,
}: UpdateStatusByFieldParam) => {
  try {
    const response = await axios.put(`/auth/${model}/${id}/status`, {
      column,
      value,
    })
    console.log(response)
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

const updateFieldByParams = async (
  action: string,
  selectedValue: string,
  ids: string[],
  model: string,
  refetch: any
) => {
  try {
    const response = await axios.put('/auth/records/update/batch', {
      ids,
      selectedValue,
      model,
      field: action,
    })
    refetch()
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

const baseSave = async <T,>(
  apiUrl: string,
  payload: PayloadInputType<T>,
  updateParams: { action: string; id: string | null }
) => {
  const formData = new FormData()
  const keys = Object.keys(payload) as Array<keyof PayloadInputType<T>>
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
      console.log(567)
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

export {
  updateStatusByField,
  updateFieldByParams,
  deleteAll,
  getLocationData,
  baseSave,
}
