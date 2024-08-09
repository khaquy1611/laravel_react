/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaHome, FaRegEdit, FaUser } from 'react-icons/fa'
import { RiDeleteBinLine } from 'react-icons/ri'
import { MdLockReset } from 'react-icons/md'

export const MenuConfig = [
  {
    label: 'MAIN',
    items: [
      {
        icon: <FaHome className="text-sm mr-2" />,
        label: 'Dashboard',
        active: ['dashboard'],
        links: [
          { title: 'Thống kê chung', to: '/dashboard' },
          { title: 'Thống kê đơn hàng', to: '/dashboard/order' },
        ],
      },
    ],
  },
  {
    label: 'FUNCTION',
    items: [
      {
        icon: <FaUser className="text-sm mr-2" />,
        label: 'Quản lí thành viên',
        active: ['user'],
        links: [
          { title: 'Quản lí nhóm thành viên', to: '/user/catalogue/index' },
          { title: 'Quản lí thành viên', to: '/user/index' },
        ],
      },
    ],
  },
]

export const breadcrumb: any = {
  ['dashboard']: {
    id: 'dashboard',
    title: 'Thống kê chung',
    route: '/dashboard',
  },
  ['user/index']: {
    id: 'user',
    title: 'Danh sách thành viên',
    route: '/user/index',
    create: {
      id: 'userCreate',
      title: 'Thêm mới thành viên',
      route: '/user/create',
    },
  },
}

export const model = {
  users: `users`,
}

export const buttonActions = {
  users: [
    {
      path: '/user/update',
      icon: <FaRegEdit className="text-white" />,
      className: 'bg-primary-bg flex mr-[5px]',
    },
    {
      path: '/user/delete',
      icon: <RiDeleteBinLine className="text-white" />,
      className: 'bg-[#ec4728] flex mr-[5px]',
    },
    {
      path: '/user/reset',
      icon: <MdLockReset className="text-white" />,
      className: 'bg-[#f8ac59]',
    },
  ],
}

export const perPage = ['10', '20', '50', '100', '200', '400', '600']

export const publishs = [
  {
    id: 0,
    name: 'Tất cả',
  },
  {
    id: 1,
    name: 'Không xuất bản',
  },
  {
    id: 2,
    name: 'Xuất bản',
  },
]

export const sorts = [
  {
    value: 'id,desc',
    name: 'Sắp xếp bản ghi mới - cũ',
  },
  {
    value: 'id,asc',
    name: 'Sắp xếp bản ghi cũ - mới',
  },
  {
    value: 'id,asc',
    name: 'Sắp xếp tên từ A - Z',
  },
  {
    value: 'id,desc',
    name: 'Sắp xếp tên từ Z - A',
  },
]

export const selectBox = [
  {
    title: 'Nhóm User',
    placeholder: 'Chọn Nhóm Thành Viên',
    options: [{ value: '1', label: 'Super Admin' }],
  },
  {
    title: 'Thành Phố',
    placeholder: 'Chọn Thành Phố',
    options: [{ value: '1', label: 'Hà Nội' }],
  },
  {
    title: 'Quận/Huyện',
    placeholder: 'Chọn Quận/Huyện',
    options: [{ value: '1', label: 'Hà Nội' }],
  },
  {
    title: 'Phường Xã',
    placeholder: 'Chọn Phường Xã',
    options: [{ value: '1', label: 'Hà Nội' }],
  },
]
export const store = [
  {
    label: 'Họ tên',
    id: 'fullName',
    type: 'text',
  },
  {
    label: 'Email (*)',
    id: 'email',
    type: 'email',
  },
  {
    label: 'Điện thoại',
    id: 'phone',
    type: 'text',
  },
  {
    label: 'Mật khẩu (*)',
    id: 'password',
    type: 'password',
  },
  {
    label: 'Nhập lại mk (*)',
    id: 'confirmPassword',
    type: 'password',
  },
  {
    label: 'Ngày sinh',
    id: 'birthday',
    type: 'date',
  },
]
