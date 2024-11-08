/* eslint-disable @typescript-eslint/no-explicit-any */
/* React */
import { Link } from 'react-router-dom'

/* COMPONENTS */
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'

/* SETTINGS */
/* INTERFACE & TYPE */
import { ActionParam, ButtonAction, OpenSheetFunction } from '@/types/Base'
import { AttributeCatalogue } from '@/types/AttributeCatalogues'

/* HOOKS */
// import { Sheet } from "@/hooks/useSheet";

interface tableColumn {
  name: string
  render: (item: AttributeCatalogue) => JSX.Element
}

export const tableColumn: tableColumn[] = [
  {
    name: 'Tên nhóm thuộc tính',
    render: (item: AttributeCatalogue) => (
      <span>
        <Link to={`/attribute/index?page=1&attribute_catalogue_id=${item.id}`}>
          {item.name}
        </Link>
      </span>
    ),
  },
  {
    name: 'Model',
    render: (item: AttributeCatalogue) => (
      <span className="text-center">{item.model}</span>
    ),
  },
  {
    name: 'Số lượng',
    render: (item: AttributeCatalogue) => (
      <span className="text-center">{item.attributes_count}</span>
    ),
  },
  {
    name: 'Mô tả',
    render: (item: AttributeCatalogue) => <span>{item.description}</span>,
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
