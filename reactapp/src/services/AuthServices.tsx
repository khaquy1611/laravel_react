import axios from '@/configs/axios'
import { handleAxiosError } from '@/helpers/axiosHelper'
import { LoginPayload, UserType } from '@/types/User'

const login = async (payload: LoginPayload): Promise<UserType | null> => {
  try {
    const response = await axios.post('/auth/login', {
      email: payload.email,
      password: payload.password,
    })
    return response.data.user
  } catch (error) {
    handleAxiosError(error)
    return null
  }
}

const fetchUser = async (): Promise<UserType | null> => {
  try {
    const response = await axios.get('/auth/me')
    return response.data
  } catch (error) {
    handleAxiosError(error)
    return null
  }
}
export { login, fetchUser }
