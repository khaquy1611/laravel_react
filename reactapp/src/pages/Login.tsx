import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { login } from '@/services/AuthServices'
import { useNavigate } from 'react-router-dom'
import { setToast } from '@/redux/slice/toastSlice'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  // const { setMessage } = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const [loading, setLoading] = useState<boolean>(false)
  const loginHanlder: SubmitHandler<Inputs> = async payload => {
    setLoading(true)
    try {
      const logged = await login(payload)
      dispatch(
        setToast({
          message: 'Đăng nhập vào hệ thống thành công',
          type: 'success',
        })
      )
      logged && navigate('/dashboard')
    } catch (err) {
      /* empty */
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h1>
        <form action="" onSubmit={handleSubmit(loginHanlder)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:{' '}
            </label>
            <input
              type="text"
              id="email"
              {...register('email', { required: true })}
              name="email"
              placeholder="Nhập vào email của bạn...."
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus-blue-200 h-11"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                Bạn phải nhập vào email (*)
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mật khẩu:{' '}
            </label>
            <input
              type="password"
              {...register('password', { required: true })}
              name="password"
              id="password"
              placeholder="Nhập vào mật khẩu của bạn...."
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus-blue-200 h-11"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                Bạn phải nhập mật khẩu (*)
              </span>
            )}
          </div>

          <div className="mb-2">
            <Button
              disabled={loading}
              className="text-xs w-full bg-blue-500 text-white hover:bg-blue-700 hover:text-white py-2 shadow-button rounded-md"
              variant="outline"
            >
              {loading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {loading ? 'Đang xử lí' : 'Đăng nhập'}
            </Button>
          </div>
          <p className="text-gray-700">
            <a href="/" className="text-blue-700">
              Quên mật khẩu?
            </a>
          </p>

          <p className="text-gray-700 text-sm">
            Chào mừng bạn đến với web hệ thống bất động sản version 1.0
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
