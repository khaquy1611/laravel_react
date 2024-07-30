import { HiOutlineBars3CenterLeft, HiOutlineCog6Tooth } from 'react-icons/hi2'
import { IoIosSearch, IoMdClose } from 'react-icons/io'
import { FiShoppingCart } from 'react-icons/fi'
import { GoBell } from 'react-icons/go'
import { BsFullscreenExit } from 'react-icons/bs'
import { IoGridOutline } from 'react-icons/io5'
import { IoExitOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type ToggleMenu = {
  isOpen: boolean
  toggleMenu: () => void
}

const Header: React.FC<ToggleMenu> = ({ isOpen, toggleMenu }) => {
  return (
    <header className="app-header h-14 fixed w-full content-center items-center top-0 bg-white border-b border-[#e7eaec]">
      <div className="main-header mx-auto px-15px h-full flex justify-between items-center">
        <div className="toggle-menu" onClick={() => toggleMenu()}>
          {isOpen ? (
            <IoMdClose className="text-30px cursor-pointer" />
          ) : (
            <HiOutlineBars3CenterLeft className="text-30px cursor-pointer" />
          )}
        </div>
        <div className="header-right-content flex justify-between items-center">
          <div className="header-search">
            <Link to="/" className="header-link flex relative">
              <IoIosSearch className="cursor-pointer header-link-icon text-xl" />
            </Link>
          </div>

          <div className="cart-dropdown">
            <Link to="/" className="header-link flex relative">
              <FiShoppingCart className="cursor-pointer  header-link-icon" />
              <span className="bage absolute top-[2px] right-[2px] text-xs w-[14px] h-[15px] text-[10px] text-white font-semibold text-center rounded-full bg-primary-rgb">
                5
              </span>
            </Link>
          </div>

          <div className="notification-dropdown">
            <Link to="/" className="header-link flex relative">
              <GoBell className="cursor-pointer  header-link-icon" />
              <span className="bage absolute top-[2px] right-[2px] text-xs w-[14px] h-[15px] text-[10px] text-white font-semibold text-center rounded-full bg-second-rgb">
                5
              </span>
            </Link>
          </div>

          <div className="shortcut-dropdown">
            <Link to="/" className="header-link flex">
              <IoGridOutline className="cursor-pointer  header-link-icon" />
            </Link>
          </div>

          <div className="full-screen">
            <Link to="/" className="header-link flex">
              <BsFullscreenExit className="cursor-pointer  header-link-icon" />
            </Link>
          </div>

          <div className="profile">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex">
                <Avatar className="mr-3">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="profile-content text-left">
                  <div className="font-semibold">Nguyễn Khả Qúy</div>
                  <div className="role text-xs text-[#536485]">
                    Administrator
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="top-[1px]">
                <DropdownMenuLabel>Cài đặt tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center text-[#333335]  cursor-pointer">
                  <CgProfile className="mr-2 text-[18px]" />
                  Thay đổi thông tin
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center text-[#333335] cursor-pointer">
                  <IoExitOutline className="mr-2 text-[18px]" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="header-settings">
            <div className="header-link flex">
              <HiOutlineCog6Tooth className="cursor-pointer header-link-icon animate-spin spin-slow" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
