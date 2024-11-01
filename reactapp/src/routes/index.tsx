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
import PostIndex from '@/pages/post/screens/View'
import PostStore from '@/pages/post/screens/Store'
import TagIndex from '@/pages/tag/screens/View'
import RealEstateTypeIndex from '@/pages/real_estate_type/screens/View'
import RealEstateCatalogueIndex from '@/pages/real_estate_catalogue/screens/View'
import RealEstateCatalogueStore from '@/pages/real_estate_catalogue/screens/store'
import RealEstateIndex from '@/pages/real_estate/screens/View'
import RealEstateStore from '@/pages/real_estate/screens/store'
import ProjectCatalogueIndex from '@/pages/project_catalogue/screens/View'
import ProjectCatalogueStore from '@/pages/project_catalogue/screens/store'

import ProjectIndex from '@/pages/project/screens/index'
import ProjectStore from '@/pages/project/screens/store'

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
      { path: '/post/index', element: <PostIndex /> },
      { path: '/post/create', element: <PostStore /> },
      { path: '/post/update/:id', element: <PostStore /> },
      { path: '/tag/index', element: <TagIndex /> },
      { path: '/real_estate/type/index', element: <RealEstateTypeIndex /> },
      {
        path: '/real_estate/catalogue/index',
        element: <RealEstateCatalogueIndex />,
      },
      {
        path: '/real_estate/catalogue/create',
        element: <RealEstateCatalogueStore />,
      },
      {
        path: '/real_estate/catalogue/update/:id',
        element: <RealEstateCatalogueStore />,
      },
      { path: '/project/catalogue/index', element: <ProjectCatalogueIndex /> },
      { path: '/project/catalogue/create', element: <ProjectCatalogueStore /> },
      {
        path: '/project/catalogue/update/:id',
        element: <ProjectCatalogueStore />,
      },
      { path: '/project/index', element: <ProjectIndex /> },
      { path: '/project/create', element: <ProjectStore /> },
      { path: '/project/update/:id', element: <ProjectStore /> },

      { path: '/real_estate/index', element: <RealEstateIndex /> },
      { path: '/real_estate/create', element: <RealEstateStore /> },
      { path: '/real_estate/update/:id', element: <RealEstateStore /> },
    ],
  },
])

export default router
