import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '@/pages/Login'
import User from '@/pages/User'
import Dashboard from '@/pages/Dashboard'
import './index.css'


const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Login />
  },
  {
    path: "/user",
    element: <User />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
