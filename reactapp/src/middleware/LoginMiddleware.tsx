import { PropsWithChildren, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchUser } from '@/services/AuthServices'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/redux/store'
type ProtectedRouteProps = PropsWithChildren

const LoginMiddleware = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  )
  const [checkedAuth, setCheckdAuth] = useState<boolean>(false)
  useEffect(() => {
    const checkAuthenticate = async () => {
      const userData = await fetchUser()
      try {
        if (userData !== null) {
          navigate('/dashboard')
        } else {
          setCheckdAuth(true)
        }
      } catch (error) {
        setCheckdAuth(true)
      }
    }
    if (!isAuthenticated || user === null) {
      checkAuthenticate()
    } else {
      navigate('/dashboard')
      return
    }
  }, [isAuthenticated, navigate, user])
  return checkedAuth ? children : null
}

export default LoginMiddleware
