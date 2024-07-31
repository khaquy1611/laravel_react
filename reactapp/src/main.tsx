import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from '@/App'
import { ToastContainer } from 'react-toastify'
import { ToastProvider } from '@/contexts/ToastContext'
import 'react-toastify/dist/ReactToastify.css'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ToastProvider>
        <App />
        <ToastContainer />
      </ToastProvider>
    </Provider>
  </QueryClientProvider>
)
