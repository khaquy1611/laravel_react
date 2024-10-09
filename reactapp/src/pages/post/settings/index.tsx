/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* React */
import React from 'react'
import { Link } from 'react-router-dom'

/* COMPONENTS */
import { Input } from '@/components/ui/input'

/* INTERFACE & TYPE */

/* SETTINGS */
import { PostCatalogue } from '@/types/PostCatalogues'

/* SERVICE */
import { sort } from '@/services/BaseServices'

/* HOOKS */
// import { Sheet } from "@/hooks/useSheet";
import useDebounce from '@/hooks/useDebounce'
import { Models } from '@/constants'

const model = Models.posts
export const redirectIfSuccess = '/post/index'

interface tableColumn {
  name: string
  render: (item: PostCatalogue) => JSX.Element
}

export const tableColumn: tableColumn[] = [
  {
    name: 'Tên bài viết',
    render: (item: PostCatalogue) => (
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
              <Link to={`/post/index?page=1&post_catalogue_id=${item.id}`}>
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
          <div className="catalogues-name">
            <span className="mr-[5px] text-[blue] text-[12px]">Tags: </span>
            {Array.isArray(item.tags) &&
              item.tags.map((tag: { label: string; value: string }) => (
                <span
                  key={tag.value}
                  className="cursor-pointer cat-item-name mr-[10px] text-[#fff] inline-block rounded px-[5px] py-[0px] p bg-[gray] text-[10px] leading-[15px]"
                >
                  {tag.label}
                </span>
              ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'Sắp xếp',
    render: (item: PostCatalogue) => {
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
