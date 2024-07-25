import AuthMiddleware from '@/middleware/AuthMiddleware'
import LoginMiddleware from '@/middleware/LoginMiddleware'
import { createBrowserRouter } from 'react-router-dom'
import Login from '@/pages/Login'
import User from '@/pages/user/User'
import Dashboard from '@/pages/Dashboard'
import Layout from '@/components/Layout'

const router = createBrowserRouter([
  {
    path: '/admin',
    element: (
      <LoginMiddleware>
        <Login />
      </LoginMiddleware>
    ),
  },
  {
    path: '/',
    element: (
      <AuthMiddleware>
        <Layout />
      </AuthMiddleware>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/user',
        element: <User />,
      },
    ],
  },
])

export default router
