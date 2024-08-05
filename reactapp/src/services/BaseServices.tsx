/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { handleAxiosError } from '@/helpers/axiosHelper'
import { UpdateStatusByFieldParam } from '@/types/Base'

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

const updateFieldByParams = async (
  action: string,
  selectedValue: string,
  ids: string[],
  model: string,
  refetch: any,
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

export { updateStatusByField, updateFieldByParams, deleteAll }
