import { createBrowserRouter } from 'react-router-dom'
import Login from '@/pages/Login'
import User from '@/pages/User'
import Dashboard from '@/pages/Dashboard'

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Login />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
])

export default router
