import axiosIntance from "@/configs/axios"
import { handleAxiosError } from '@/helpers/axiosHelper'
type LoginPayload = {
    email: string
    password: string
}


const login = async (payload: LoginPayload) : Promise<boolean> => {
    try {
        await axiosIntance.post('/auth/login', {
            email: payload.email,
            password: payload.password
        })
        return true
    }catch(error) {
        handleAxiosError(error)
        return false
    }
}

export { login }