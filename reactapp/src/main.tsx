import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from '@/App'
import { ToastContainer } from 'react-toastify'
import { ToastProvider } from '@/contexts/ToastContext'
import 'react-toastify/dist/ReactToastify.css'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
        <ToastContainer />
      </ToastProvider>
    </Provider>
  </React.StrictMode>
)
