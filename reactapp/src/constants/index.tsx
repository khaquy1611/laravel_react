/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdLockReset } from 'react-icons/md'
import Recovery from '@/pages/user/screens/include/Recovery'
import { ActionParam, ButtonAction, OpenSheetFunction } from '@/types/Base'
import { UserType } from '@/types/User'

export const breadcrumbs = {
  users: {
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
  },
  post_catalogues: {
    index: {
      title: 'Quản lý nhóm bài viết',
      route: '/post/catalogue/index',
    },
    create: {
      title: 'Thêm mới nhóm bài viết',
    },
    update: {
      title: 'Cập nhật nhóm bài viết',
    },
  },
  posts: {
    index: {
      title: 'Quản lý bài viết',
      route: '/post/index',
    },
    create: {
      title: 'Thêm mới bài viết',
    },
    update: {
      title: 'Cập nhật bài viết',
    },
  },
  tags: {
    index: {
      title: 'Quản lý Tag',
      route: '/tag/index',
    },
    create: {
      title: 'Thêm mới Tag',
    },
    update: {
      title: 'Cập nhật thông tin',
    },
  },
}

export const Models = {
  users: `users`,
  user_catalogues: `user_catalogues`,
  post_catalogues: `post_catalogues`,
  posts: `posts`,
  tags: `tags`,
}

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
      changePassword: any,
      handleDialog: any,
      Recovery: React.ComponentType<any>
    ) => {
      handleDialog(id, changePassword, Recovery)
    },
  },
]

export const buttonUserCatalogueActions: ButtonAction<ActionParam[]>[] = [
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
]
export const buttonPostCatalogueActions: ButtonAction<ActionParam[]>[] = [
  {
    path: '/post/catalogue/update',
    icon: <FaRegEdit className="text-white" />,
    className: 'flex mr-[5px]',
    method: 'update',
    params: ['id', 'name', 'openSheet:f'],
    onClick: (id: string, name: string, openSheet: OpenSheetFunction) => {
      openSheet({ open: true, action: 'update', id: id })
    },
  },
  {
    path: '/post/catalogue/delete',
    icon: <RiDeleteBin5Line className="text-white" />,
    className: 'bg-[#ec4758] mr-[5px]',
    method: 'delete',
    params: ['id', 'handleAlertDialog:f', 'destroy:f'],
    onClick: (id: string, handleAlertDialog: any, destroy: any) => {
      handleAlertDialog(id, destroy)
    },
  },
]
export const buttonPostsActions: ButtonAction<ActionParam[]>[] = [
  {
    path: '/post/update',
    icon: <FaRegEdit className="text-white" />,
    className: 'flex mr-[5px]',
    method: 'update',
    params: ['id', 'name', 'openSheet:f'],
    onClick: (id: string, name: string, openSheet: OpenSheetFunction) => {
      openSheet({ open: true, action: 'update', id: id })
    },
  },
  {
    path: '/post/delete',
    icon: <RiDeleteBin5Line className="text-white" />,
    className: 'bg-[#ec4758] mr-[5px]',
    method: 'delete',
    params: ['id', 'handleAlertDialog:f', 'destroy:f'],
    onClick: (id: string, handleAlertDialog: any, destroy: any) => {
      handleAlertDialog(id, destroy)
    },
  },
]

export const buttonTagsActions: ButtonAction<ActionParam[]>[] = [
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
