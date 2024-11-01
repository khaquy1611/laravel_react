/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
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
import { ProjectCatalogue } from '@/types/ProjectCatalogue'

/* SERVICE */
import { sort } from '@/services/BaseServices'

/* HOOKS */
// import { Sheet } from "@/hooks/useSheet";
import useDebounce from '@/hooks/useDebounce'
import { Models } from '@/constants'
export const redirectIfSuccess = '/project/index'

interface tableColumn {
  name: string
  render: (item: ProjectCatalogue) => JSX.Element
}
const model = Models.projects
export const tableColumn: tableColumn[] = [
  {
    name: 'Tên dự án',
    render: (item: ProjectCatalogue) => (
      <div className="flex items-center">
        <div className="block mr-[8px]">
          <img
            className="h-[60px] w-[100px] object-cover  rounded cursor-pointer"
            src={item.image}
            alt=""
          />
        </div>
        <div>
          <div className="name">
            <span>
              <Link
                to={`/project/index?page=1&project_catalogue_id=${item.id}`}
              >
                {item.name}
              </Link>
            </span>
          </div>
          <div className="catalogues-name">
            <span className="mr-[5px] text-[blue] text-[12px]">Danh mục: </span>
            {Array.isArray(item.cats) &&
              item.cats.map((catItem: string) => (
                <span
                  key={catItem}
                  className="cat-item-name mr-[10px] text-[#f00] text-[12px]"
                >
                  {catItem}
                </span>
              ))}
          </div>
        </div>
      </div>
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
    path: '/project/update',
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
