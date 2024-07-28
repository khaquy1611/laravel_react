import { HiOutlineBars3CenterLeft } from 'react-icons/hi2'
import { IoIosSearch } from 'react-icons/io'
import { FiShoppingCart } from 'react-icons/fi'
import { GoBell } from 'react-icons/go'
import { BsFullscreenExit } from "react-icons/bs"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="app-header h-14 fixed w-full content-center items-center top-0 bg-white">
      <div className="main-header mx-auto px-15px h-full flex justify-between items-center">
        <HiOutlineBars3CenterLeft className="text-30px cursor-pointer" />
        <div className="header-right-content flex justify-between items-center">
          <IoIosSearch className="cursor-pointer text-xl" />
          <div className="cart-dropdown">
            <Link to="/" className="header-link">
              <FiShoppingCart />
              <span className="bage">5</span>
            </Link>
          </div>

          <div className="notification-dropdown">
            <Link to="/" className="header-link">
              <GoBell />
              <span className="bage">5</span>
            </Link>
          </div>

          <div className="shortcut-dropdown">
            <Link to="/" className="header-link">
              <BsFullscreenExit className="cursor-pointer"/>
              <span className="bage">5</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
