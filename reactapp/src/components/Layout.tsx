import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { showToast } from '@/helpers/myHelper'
import { RootState } from '@/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { clearToast } from '@/redux/slice/toastSlice'
import Header from './Header'
import Aside from './Aside'
import '@/assets/scss/Style.scss'

const Layout: React.FC = () => {
  const { message, type } = useSelector((state: RootState) => state.toast)
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    showToast(message, type)
    dispatch(clearToast())
  }, [dispatch, message, type])

  return (
    <div className="page">
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <Aside isOpen={isOpen} />
      <div className="main-content transition-transform duration-300" style={isOpen ? { marginLeft: '0' } : { marginLeft: '240px' }}>
            <Outlet />
      </div>
    </div>
  )
}

export default Layout
