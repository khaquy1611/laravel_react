/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserType } from '@/types/User'
import { FaHome, FaRegEdit, FaUser } from 'react-icons/fa'
import { tableColumnType } from '@/types/Base'
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
  },
  ['user/create']: {
    id: 'userCreate',
    title: 'Thêm mới thành viên',
    route: '/user/create',
  },
}

export const model = {
  users: `users`,
}

export const tableColumn: tableColumnType = {
  users: [
    {
      name: `ID`,
      render: (item: UserType) => <span>{item.id}</span>,
    },
    {
      name: `Họ tên`,
      render: (item: UserType) => <span>{item.name}</span>,
    },
    {
      name: `Số điện thoại`,
      render: (item: UserType) => <span>{item.phone}</span>,
    },
    {
      name: `Email`,
      render: (item: UserType) => <span>{item.email}</span>,
    },
    {
      name: `Địa Chỉ`,
      render: (item: UserType) => <span>{item.address}</span>,
    },
    {
      name: `Nhóm`,
      render: () => <span>{'-'}</span>,
    },
  ],
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
