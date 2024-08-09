/* eslint-disable @typescript-eslint/no-explicit-any */
/* React */
import React from 'react'

/* COMPONENTS */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdLockReset } from 'react-icons/md'
import Recovery from '@/pages/user/screens/include/Recovery'

/* SETTINGS */
import { getInitialName } from '@/helpers/myHelper'
import { UserType } from '@/types/User'

/* INTERFACE & TYPE */
import {
  ButtonAction,
  ActionParam,
  OpenSheetFunction,
} from '@/types/Base'

/* HOOKS */

export const model = 'users'

export const breadcrumb = {
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
}

interface tableColumn {
  name: string
  render: (item: UserType) => JSX.Element
}

export const tableColumn: tableColumn[] = [
  {
    name: '',
    render: (item: UserType) => (
      <div className="flex items-center">
        <Avatar className="mr-[15px] ml-[15px] shadow-xl block">
          {item.image && item.image !== '' ? (
            <AvatarImage
              loading="lazy"
              className="object-cover shadow-lg"
              src={item.image}
              alt="avatar"
            />
          ) : (
            <AvatarFallback>{getInitialName(item.name)}</AvatarFallback>
          )}
        </Avatar>
      </div>
    ),
  },
  {
    name: 'Họ Tên',
    render: (item: UserType) => <span>{item.name}</span>,
  },
  {
    name: 'Số điện thoại',
    render: (item: UserType) => <span>{item.phone}</span>,
  },
  {
    name: 'Email',
    render: (item: UserType) => <span>{item.email}</span>,
  },
  {
    name: 'Địa chỉ',
    render: (item: UserType) => <span>{item.address ?? '-'}</span>,
  },
  {
    name: 'Nhóm User',
    render: () => <span>{'-'}</span>,
  },
]

export const buttonActions: ButtonAction<ActionParam[]>[] = [
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
  {
    path: '/user/recovery',
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
