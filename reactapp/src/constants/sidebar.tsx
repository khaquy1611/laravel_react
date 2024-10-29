import { BsFileEarmarkPost } from 'react-icons/bs'
import { FaHome, FaRegBuilding, FaUser } from 'react-icons/fa'
import { CiShoppingTag } from 'react-icons/ci'

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
      {
        icon: <BsFileEarmarkPost className="text-sm mr-2" />,
        active: ['post'],
        label: 'QL Bài Viết',
        links: [
          { title: 'QL Nhóm Bài Viết', to: '/post/catalogue/index' },
          { title: 'QL Bài viết', to: '/post/index' },
        ],
      },
      {
        icon: <CiShoppingTag className="text-sm mr-2" />,
        active: ['tag'],
        label: 'QL Tag',
        // path: '/tag/index'
        links: [
          { title: 'Danh sách tag', to: '/tag/index' },
          // { title: 'QL Bài viết', to: '/post/index' },
        ],
      },
      {
        icon: <FaRegBuilding className="text-sm mr-2" />,
        active: ['real_estate', 'project'],
        label: 'Bất động sản',
        links: [
            { title: 'QL Loại BĐS', to: '/real_estate/catalogue/index' },
            { title: 'QL Tin đăng', to: '/real_estate/index' },
            { title: 'QL loại tin BĐS', to: '/real_estate/type/index' },
            { title: 'QL loại dự án', to: '/project/catalogue/index' },
            { title: 'QL dự án', to: '/project/index' },
        ]
    },
    ],
  },
]
