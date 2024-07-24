import { configureStore } from '@reduxjs/toolkit'
import toastReducer from '@/redux/slice/toastSlice'
import authReducer from '@/redux/slice/authSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
