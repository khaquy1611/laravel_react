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
        links: [{ title: 'Quản lí thành viên', to: '/user' }],
      },
    ],
  },
]
