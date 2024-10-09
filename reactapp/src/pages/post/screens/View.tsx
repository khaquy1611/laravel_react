/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'
/* COMPONENTS */
import CustomTable from '@/components/CustomTable'
import Filter from '@/components/Filter'
import PageHeading from '@/components/Heading'
import Paginate from '@/components/Paginate'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

/* CONTEXT */
import { FilterProvider } from '@/contexts/FilterContext'

/* HOOKS */
import useCheckBoxState from '@/hooks/useCheckBoxState'
import useTable from '@/hooks/useTable'
import { useQuery } from 'react-query'

/* SETTINGS */
import { tableColumn } from '../settings'
import { breadcrumbs, Models, buttonPostsActions } from '@/constants/index'
import { queryKey } from '@/constants/query'
import { filterItems } from '@/settings/globalSettings'

/* SERVICE */
import { useCustomFilter } from '@/hooks/useCustomFilter'
import { pagination as postCataloguePagination } from '@/services/PostCatalogueService'
import { destroy, pagination } from '@/services/PostService'
import { Breadcrumb } from '@/types/Base'
import { useSearchParams } from 'react-router-dom'

const Post = () => {
  const breadcrumbData: Breadcrumb = breadcrumbs.posts.index
  const model = Models.posts
  const {
    isLoading,
    data,
    isError,
    refetch,
    handlePageChange,
    handleQueryString,
  } = useTable({ model, pagination })
  const {
    checkedState,
    checkedAllState,
    handleCheckedChange,
    handleCheckedAllChange,
    isAnyChecked,
  } = useCheckBoxState(data, model, isLoading)
  const [searchParams] = useSearchParams()
  const perPage = searchParams.get('perPage')
    ? parseInt(searchParams.get('perPage')!)
    : 10
  const totalItems = data ? data.total : 0
  const totalPages = Math.ceil(totalItems / perPage)
  const somethingChecked = isAnyChecked()

  const { data: postCatalogues, isLoading: isPostCatalogueLoading } = useQuery(
    [queryKey.postCatalogues],
    () => postCataloguePagination('')
  )

  const filterInitial = useMemo(
    () => [
      {
        name: 'post_catalogue_id',
        placeholder: 'Chọn nhóm bài viết',
        data: postCatalogues?.['post_catalogues'],
        isLoading: isPostCatalogueLoading,
        isNested: true,
        valueKey: 'id',
        labelKey: 'name',
      },
    ],
    [postCatalogues]
  )

  const customFilter = useCustomFilter(filterInitial)

  return (
    <FilterProvider customFilters={customFilter}>
      <PageHeading breadcrumb={breadcrumbData} />
      <div className="container-fluid mx-6">
        <Card className="rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[20px]">
            <CardTitle className="uppercase">
              Quản lý danh sách bài viết
            </CardTitle>
            <CardDescription className="text-xs text-[blue]">
              Hiển thị danh sách bài viết, sử dụng các chức năng bên dưới để lọc
              theo mong muốn
            </CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            <Filter
              isAnyChecked={somethingChecked}
              checkedState={checkedState}
              model={model}
              refetch={refetch}
              handleQueryString={(filters: any) => handleQueryString(filters)}
              items={filterItems}
              buttonText="Thêm mới bài viết"
              to="/post/create"
            />
            <CustomTable
              isLoading={isLoading}
              data={data}
              isError={isError}
              model={model}
              tableColumn={tableColumn}
              checkedState={checkedState}
              checkedAllState={checkedAllState}
              handleCheckedChange={handleCheckedChange}
              handleCheckedAllChange={handleCheckedAllChange}
              destroy={destroy}
              refetch={refetch}
              buttonActions={buttonPostsActions}
            />
          </CardContent>
          <CardFooter>
            {!isLoading && data[model] && data.links ? (
              <Paginate
                totalPages={totalPages}
                links={data.links}
                pageChange={handlePageChange}
              />
            ) : null}
          </CardFooter>
        </Card>
      </div>
    </FilterProvider>
  )
}
export default Post
