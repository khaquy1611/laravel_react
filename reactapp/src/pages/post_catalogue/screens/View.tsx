/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
/* COMPONENTS */
import PageHeading from '@/components/Heading'
import Paginate from '@/components/Paginate'
import Filter from '@/components/Filter'
import CustomTable from '@/components/CustomTable'
// import Store from '@/pages/post_catalogue/screens/Store'
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
import useSheet from '@/hooks/useSheet'

/* SETTINGS */
import { tableColumn } from '../settings/PostCatalogueSettings'
import {
  breadcrumbs,
  Models,
  buttonPostCatalogueActions,
} from '@/constants/index'

import { Breadcrumb } from '@/types/Base'
import { filterItems } from '@/settings/globalSettings'
import { SelectConfig } from '@/components/CustomFilter'

/* SERVICE */
import { pagination, destroy } from '@/services/PostCatalogueService'

import 'ckeditor5/ckeditor5.css'
import 'ckeditor5/ckeditor5-content.css'
// import CustomSheet from '@/components/CustomSheet'

const PostCatalogue = () => {
  const breadcrumbData: Breadcrumb = breadcrumbs.post_catalogues.index
  const model = Models.post_catalogues
  const {
    isLoading,
    data,
    isError,
    refetch,
    handlePageChange,
    handleQueryString,
  } = useTable({ model, pagination })
  const { openSheet } = useSheet()
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

  const [customFilter] = useState<SelectConfig[]>([])

  return (
    <FilterProvider customFilters={customFilter}>
      <PageHeading breadcrumb={breadcrumbData} />

      <div className="container-fluid mx-6">
        <Card className="rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[20px]">
            <CardTitle className="uppercase">
              Quản lý danh sách nhóm bài viết
            </CardTitle>
            <CardDescription className="text-xs text-[blue]">
              Hiển thị danh sách nhóm bài viết, sử dụng các chức năng bên dưới
              để lọc theo mong muốn
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
              buttonText="Thêm mới nhóm nhóm bài viết"
              to="/post/catalogue/create"
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
              openSheet={openSheet}
              destroy={destroy}
              refetch={refetch}
              buttonActions={buttonPostCatalogueActions}
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
        {/* {isSheetOpen && (
          <CustomSheet
            title={
              isSheetOpen.action === 'update'
                ? breadcrumbs.post_catalogues.update.title
                : breadcrumbs.post_catalogues.create.title
            }
            description="Nhập đầy đủ các thông tin dưới đây. Các mục có dấu (*) là bắt buộc"
            isSheetOpen={isSheetOpen.open}
            closeSheet={closeSheet}
            className="w-[1280px] sm:w-[1280px] bg-[#f3f3f4]"
          >
            <Store
              refetch={refetch}
              closeSheet={closeSheet}
              id={isSheetOpen.id}
              action={isSheetOpen.action}
            />
          </CustomSheet>
        )} */}
      </div>
    </FilterProvider>
  )
}
export default PostCatalogue
