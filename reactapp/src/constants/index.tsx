import { FaHome, FaUser } from 'react-icons/fa'
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
    title: 'Dashboard',
    route: '/dashboard',
    active: ['dashboard'],
  },
  {
    title: 'Quản lí thành viên',
    route: '/user/index',
    active: ['user'],
  },
]

export const breadcrumbLabelMap = {
  dashboard: 'Dashboard',
  user: 'Quản lí thành viên',
} as {
  [key: string]: string
}