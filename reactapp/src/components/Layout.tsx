import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { showToast } from '@/helpers/myHelper'
import { RootState } from '@/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { clearToast } from '@/redux/slice/toastSlice'
import { fetchUser } from '@/services/AuthServices'

const Layout: React.FC = () => {
  const { message, type } = useSelector((state: RootState) => state.toast)
  const dispatch = useDispatch()
  useEffect(() => {
    showToast(message, type)
    dispatch(clearToast())
  }, [dispatch, message, type])
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <>
      Đây là trang Layout tổng
      <Outlet />
    </>
  )
}

export default Layout
