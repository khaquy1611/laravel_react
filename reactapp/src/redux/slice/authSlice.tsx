import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '@/types/User'
export interface AuthState {
  isAuthenticated: boolean
  user: UserType | null
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLogin: (state, action: PayloadAction<UserType | null>) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    setAuthLogout: state => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { setAuthLogin, setAuthLogout } = authSlice.actions

export default authSlice.reducer
