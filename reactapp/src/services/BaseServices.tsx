import axios from 'axios'
import { handleAxiosError } from '@/helpers/axiosHelper'
import { UpdateStatusByFieldParam } from '@/types/Base'

const UpdateStatusByField = async ({
  id,
  column,
  value,
  model,
}: UpdateStatusByFieldParam) => {
  try {
    const response = await axios.put(`/auth/${model}/${id}/status`, { column, value })
    console.log(response)
  } catch (error) {
    handleAxiosError(error)
  }
}

export { UpdateStatusByField }
