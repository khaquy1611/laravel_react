import { PropsWithChildren, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '@/services/AuthServices'
import { setAuthLogin, setAuthLogout } from '@/redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/redux/store'
type ProtectedRouteProps = PropsWithChildren

const AuthMiddleware = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  )
  useEffect(() => {
    const checkAuthenticate = async () => {
      if (isAuthenticated || user === null) {
        const userData = await fetchUser()
        if (userData) {
          dispatch(setAuthLogin(userData))
        } else {
          dispatch(setAuthLogout())
          navigate('/admin')
        }
      }
    }
    checkAuthenticate()
  }, [dispatch, isAuthenticated, navigate, user])

  return isAuthenticated && user ? children : null
}

export default AuthMiddleware
