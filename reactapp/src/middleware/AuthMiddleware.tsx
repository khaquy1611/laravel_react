import { PropsWithChildren, useEffect } from 'react'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
type ProtectedRouteProps = PropsWithChildren

const AuthMiddleware = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  )
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated || user === null) {
      navigate('/admin')
    }
  }, [isAuthenticated, navigate, user])
  return isAuthenticated && user ? children : null
}

export default AuthMiddleware
