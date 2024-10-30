/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* React */
import React from 'react'
import { Link } from 'react-router-dom'

/* COMPONENTS */
import { Input } from '@/components/ui/input'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'

/* INTERFACE & TYPE */
import { ActionParam, ButtonAction, OpenSheetFunction } from '@/types/Base'

/* SETTINGS */
import { formatCatalogueName } from '@/helpers/myHelper'
import { PostCatalogue as ObjectCatalogue } from '@/types/PostCatalogues'

/* SERVICE */
import { sort } from '@/services/BaseServices'

/* HOOKS */
// import { Sheet } from "@/hooks/useSheet";
import useDebounce from '@/hooks/useDebounce'
import { Models } from '@/constants'

export const redirectIfSuccess = '/real_estate/catalogue/index'
const model = Models.real_estate_catalogues

interface tableColumn {
  name: string
  render: (item: ObjectCatalogue) => JSX.Element
}

export const tableColumn: tableColumn[] = [
  {
    name: 'Tên loại bất động sản',
    render: (item: ObjectCatalogue) => (
      <span>
        <Link
          to={`/real_estate/index?page=1&real_estate_catalogue_id=${item.id}`}
        >
          {formatCatalogueName(item)}
        </Link>
      </span>
    ),
  },
  {
    name: 'Số lượng',
    render: (item: ObjectCatalogue) => (
      <span className="text-center">{item.real_estates_count}</span>
    ),
  },
  {
    name: 'Sắp xếp',
    render: (item: ObjectCatalogue) => {
      const { debounce } = useDebounce()

      const debounceSort = debounce((value: string) =>
        sort(item.id, model, value)
      )

      return (
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            debounceSort(e.target.value)
          }
          type="text"
          defaultValue={item.order}
          className="w-[75px] text-center"
        />
      )
    },
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
    path: '/real_estate/catalogue/update',
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
