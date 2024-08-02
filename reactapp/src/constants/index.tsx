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

export const breadcrumb = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    route: '/dashboard',
    active: ['dashboard'],
  },
  {
    id: 'user',
    title: 'Quản lí thành viên',
    route: '/user/index',
    active: ['user'],
  },
]

export const breadcrumbLabelMap = {
  dashboard: 'Thống kê chung',
  user: 'Quản lí thành viên',
} as {
  [key: string]: string
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

export const perPage = [
  "10 bản ghi",
  "20 bản ghi",
  "50 bản ghi",
  "100 bản ghi",
  "200 bản ghi",
  "400 bản ghi",
  "600 bản ghi"
]