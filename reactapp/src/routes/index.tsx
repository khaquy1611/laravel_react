import AuthMiddleware from '@/middleware/AuthMiddleware'
import LoginMiddleware from '@/middleware/LoginMiddleware'
import { createBrowserRouter } from 'react-router-dom'
import Login from '@/pages/Login'
import View from '@/pages/user/screens/View'
import Dashboard from '@/pages/Dashboard'
import Layout from '@/components/Layout'
import UserCataloguesIndex from '@/pages/user_catalogues/screens/View'

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
        path: '/user/index',
        element: <View />,
      },
      {
        path: '/user/catalogue/index',
        element: <UserCataloguesIndex />,
      },
    ],
  },
])

export default router
