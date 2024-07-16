import axiosIntance from "../configs/axios"
type LoginPayload = {
    email: string
    password: string
}


const login = async (payload: LoginPayload) => {
    try {
        const response = await axiosIntance.post('/auth/login', {
            email: payload.email,
            password: payload.password
        })
        console.log(response)
    }catch(error) {
        console.log(error)
    }
}

export { login }