/* eslint-disable @typescript-eslint/no-explicit-any */
/* React */
import React from 'react'

/* COMPONENTS */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


/* SETTINGS */
import { getInitialName } from '@/helpers/myHelper'
import { UserType } from '@/types/User'

/* INTERFACE & TYPE */
import {
  tableColumnProps,
} from '@/types/Base'

/* HOOKS */

export const tableColumn: tableColumnProps<UserType>[] = [
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
    render: (item: UserType) => <span>{ item.user_catalogue_name || 'N/A'}</span>
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
