/* eslint-disable react-hooks/rules-of-hooks */
/* React */
import React from 'react'
import { Link } from 'react-router-dom'

/* COMPONENTS */
import { Input } from '@/components/ui/input'

/* SETTINGS */
import { PostCatalogue } from '@/types/PostCatalogues'
import { formatCatalogueName } from '@/helpers/myHelper'

/* SERVICE */
import { sort } from '@/services/BaseServices'

/* HOOKS */
// import { Sheet } from "@/hooks/useSheet";
import useDebounce from '@/hooks/useDebounce'
import { Models } from '@/constants'

export const model = Models.post_catalogues
export const redirectIfSuccess = '/post/catalogue/index'

interface tableColumn {
  name: string
  render: (item: PostCatalogue) => JSX.Element
}

export const tableColumn: tableColumn[] = [
  {
    name: 'Tên nhóm bài viết',
    render: (item: PostCatalogue) => (
      <span>
        <Link to={`/post/index?page=1&post_catalogue_id=${item.id}`}>
          {formatCatalogueName(item)}
        </Link>
      </span>
    ),
  },
  {
    name: 'Số lượng',
    render: (item: PostCatalogue) => (
      <span className="text-center">{item.posts_count}</span>
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
