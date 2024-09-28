import axios from 'axios'
import { showToast } from './myHelper'

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    showToast(error.response?.data.message, 'error')
  } else {
    console.log('Đã xảy ra lỗi không được xác định. Hãy thử lại sau', 'error')
  }
}

export { handleAxiosError }
