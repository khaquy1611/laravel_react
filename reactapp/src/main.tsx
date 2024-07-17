import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from '@/App'
import { ToastContainer } from 'react-toastify'
import { ToastProvider } from '@/contexts/ToastContext'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
      <ToastContainer />
    </ToastProvider>
  </React.StrictMode>
)
