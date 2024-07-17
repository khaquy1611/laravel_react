import React, { createContext, useState, useContext, ReactNode } from 'react'

export type ToastType =  'success' | 'warning' | 'error' | null

interface ToastContextType {
  message: string
  type: ToastType
  setMessage: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProp {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProp> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: ToastType }>({
    message: '',
    type: null,
  })
  const setMessage = (message: string, type: ToastType = null) => {
    setToast({ message, type })
  }
  return (
    <ToastContext.Provider value={{ ...toast, setMessage }}>
      {children}
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('Có vấn đề xảy ra')
  }
  return context
}
