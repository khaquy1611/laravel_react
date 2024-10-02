/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaHome, FaRegEdit, FaUser } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdLockReset } from 'react-icons/md'
import { UserType } from '@/types/User'
import { ActionParam, ButtonAction, OpenSheetFunction } from '@/types/Base'
import Recovery from '@/pages/user/screens/include/Recovery'

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

export const breadcrumbs = {
  users : {
    index: {
      title: 'Quản lý thành viên',
      route: '/user/index',
    },
    create: {
      title: 'Thêm mới thành viên',
    },
    update: {
      title: 'Cập nhật thông tin',
    },
  },
  user_catalogues: {
    index: {
      title: 'Quản lý nhóm thành viên',
      route: '/user/catalogue/index',
    },
    create: {
      title: 'Thêm mới nhóm thành viên',
    },
    update: {
      title: 'Cập nhật nhóm thông tin',
    },
  }
}


export const Models = {
  users : `users`,
  user_catalogues : `user_catalogues`
};


export const buttonUserActions: ButtonAction<ActionParam[]>[] = [
  {
    icon: <FaRegEdit className="text-white" />,
    className: 'flex mr-[5px]',
    method: 'update',
    params: ['id', 'name', 'openSheet:f'],
    onClick: (id: string, name: string, openSheet: OpenSheetFunction) => {
      openSheet({ open: true, action: 'update', id: id })
    },
  },
  {
    icon: <RiDeleteBin5Line className="text-white" />,
    className: 'bg-[#ec4758] mr-[5px]',
    method: 'delete',
    params: ['id', 'handleAlertDialog:f', 'destroy:f'],
    onClick: (id: string, handleAlertDialog: any, destroy: any) => {
      handleAlertDialog(id, destroy)
    },
  },
  {
    icon: <MdLockReset className="text-white" />,
    className: 'bg-[#f8ac59]',
    method: 'reset',
    params: ['id', 'changePassword:pf', 'handleDialog:f', 'Recovery:c'],
    component: Recovery,
    onClick: (
      id: string,
      changePassword: Function,
      handleDialog: Function,
      Recovery: React.ComponentType<any>
    ) => {
      handleDialog(id, changePassword, Recovery)
    },
  },
]

export const buttonUserCataloguesActions: ButtonAction<ActionParam[]>[] = [
  {
    path: '/user/update',
    icon: <FaRegEdit className="text-white" />,
    className: 'flex mr-[5px]',
    method: 'update',
    params: ['id', 'name', 'openSheet:f'],
    onClick: (id: string, name: string, openSheet: OpenSheetFunction) => {
      openSheet({ open: true, action: 'update', id: id })
    },
  },
  {
    path: '/user/delete',
    icon: <RiDeleteBin5Line className="text-white" />,
    className: 'bg-[#ec4758] mr-[5px]',
    method: 'delete',
    params: ['id', 'handleAlertDialog:f', 'destroy:f'],
    onClick: (id: string, handleAlertDialog: any, destroy: any) => {
      handleAlertDialog(id, destroy)
    },
  },
]

export const formField = (action: string, data?: UserType | undefined) => {
  const showPasswordField = action !== 'update'
  const baseField = [
    {
      label: 'Họ Tên *',
      name: 'name',
      type: 'text',
      defaultValue: data && data.name,
    },
    {
      label: 'Email *',
      name: 'email',
      type: 'text',
      defaultValue: data && data.email,
    },
    {
      label: 'Điện thoại *',
      name: 'phone',
      type: 'text',
      defaultValue: data && data.phone,
    },
  ]

  const passwordFields = [
    {
      label: 'Mật khẩu (*)',
      name: 'password',
      type: 'password',
      defaultValue: '',
    },
    {
      label: 'Nhập lại mk (*)',
      name: 'confirmPassword',
      type: 'password',
      defaultValue: '',
    },
  ]

  return showPasswordField ? [...baseField, ...passwordFields] : baseField
}
export const perPages = ['10', '20', '50', '100', '200', '400', '600']

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
