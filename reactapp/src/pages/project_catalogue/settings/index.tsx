/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* React */
import React from 'react'
import { Link } from 'react-router-dom'

/* COMPONENTS */
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Input } from '@/components/ui/input'

/* INTERFACE & TYPE */
import { ButtonAction, ActionParam, OpenSheetFunction } from '@/types/Base'

/* SETTINGS */
import { ProjectCatalogue } from '@/types/ProjectCatalogue'
import { formatCatalogueName } from '@/helpers/myHelper'

/* SERVICE */
import { sort } from '@/services/BaseServices'

/* HOOKS */
// import { Sheet } from "@/hooks/useSheet";
import useDebounce from '@/hooks/useDebounce'
import { Models } from '@/constants'

export const model = Models.project_catalogues
export const redirectIfSuccess = '/project/catalogue/index'

interface tableColumn {
  name: string
  render: (item: ProjectCatalogue) => JSX.Element
}

export const tableColumn: tableColumn[] = [
  {
    name: 'Tên loại dự án',
    render: (item: ProjectCatalogue) => (
      <span>
        <Link to={`/project/index?page=1&project_catalogue_id=${item.id}`}>
          {formatCatalogueName(item)}
        </Link>
      </span>
    ),
  },
  {
    name: 'Số lượng',
    render: (item: ProjectCatalogue) => (
      <span className="text-center">{item.projects_count}</span>
    ),
  },
  {
    name: 'Sắp xếp',
    render: (item: ProjectCatalogue) => {
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
    path: '/project/catalogue/update',
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
