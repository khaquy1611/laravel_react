/* eslint-disable @typescript-eslint/no-explicit-any */
/* React */

/* COMPONENTS */
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'

/* SETTINGS */
/* INTERFACE & TYPE */
import { ActionParam, ButtonAction, OpenSheetFunction } from '@/types/Base'
import { Attribute } from '@/types/Attribute'

/* HOOKS */
// import { Sheet } from "@/hooks/useSheet";

interface tableColumn {
  name: string
  render: (item: Attribute) => JSX.Element
}

export const tableColumn: tableColumn[] = [
  {
    name: 'Tên thuộc tính',
    render: (item: Attribute) => (
      <span className="text-[blue]">{item.name}</span>
    ),
  },
  {
    name: 'Từ khóa',
    render: (item: Attribute) => (
      <span className="text-center">{item.canonical}</span>
    ),
  },
  {
    name: 'Nhóm thuộc tính',
    render: (item: Attribute) => (
      <span className="text-center">{item?.attribute_catalogue?.name}</span>
    ),
  },
  {
    name: 'Mô tả',
    render: (item: Attribute) => <span>{item.description || '-'}</span>,
  },
]

export const buttonActions: ButtonAction<ActionParam[]>[] = [
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
