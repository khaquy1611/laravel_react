import AuthMiddleware from '@/middleware/AuthMiddleware'
import LoginMiddleware from '@/middleware/LoginMiddleware'
import { createBrowserRouter } from 'react-router-dom'
import Login from '@/pages/Login'
import View from '@/pages/user/screens/View'
import Dashboard from '@/pages/Dashboard'
import Layout from '@/components/Layout'
import UserCataloguesIndex from '@/pages/user_catalogues/screens/View'
import PostCataloguesIndex from '@/pages/post_catalogue/screens/View'
import PostCatalogueStore from '@/pages/post_catalogue/screens/Store'

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
      {
        path: '/post/catalogue/index',
        element: <PostCataloguesIndex />,
      },
      { path: '/post/catalogue/create', element: <PostCatalogueStore /> },
      { path: '/post/catalogue/update/:id', element: <PostCatalogueStore /> },
    ],
  },
])

export default router
