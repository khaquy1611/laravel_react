import { useState } from 'react'
/* COMPONENTS */
import PageHeading from '@/components/Heading'
import Paginate from '@/components/Paginate'
import Filter from '@/components/Filter'
import CustomTable from '@/components/CustomTable'
import CustomSheet from '@/components/CustomSheet'
import UserCataloguesStore from '@/pages/UserCatalogues/screens/include/Store'

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
import { breadcrumbs, Models, buttonUserCataloguesActions } from '@/constants/index'
import { tableColumn } from '@/pages/UserCatalogues/settings/UserCataloguesSettings'
import { filterItems } from '@/settings/globalSettings'
import { SelectConfig } from '@/components/CustomFilter'

/* SERVICE */
import { pagination, destroy } from '@/services/UserCataloguesServices'
import { Breadcrumb, FilterParamsProps } from '@/types/Base'
import { useSearchParams } from 'react-router-dom'

const UserCataloguesIndex = () => {
  const breadcrumbData: Breadcrumb = breadcrumbs.user_catalogues.index
  const model = Models.user_catalogues;
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
  const { isSheetOpen, openSheet, closeSheet } = useSheet()
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

      <div className="container-fluid mx-[20px]">
        <Card className="rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[20px]">
            <CardTitle className="uppercase">
              Quản lý danh sách nhóm thành viên
            </CardTitle>
            <CardDescription className="text-xs text-[blue]">
              Hiển thị danh sách nhóm thành viên, sử dụng các chức năng bên dưới để
              lọc theo mong muốn
            </CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            <Filter
              isAnyChecked={somethingChecked}
              checkedState={checkedState}
              model={model}
              refetch={refetch}
              handleQueryString={(filters: FilterParamsProps) =>
                handleQueryString(filters)
              }
              openSheet={openSheet}
              items={filterItems}
              buttonText="Thêm mới nhóm thành viên"
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
              buttonActions={buttonUserCataloguesActions}
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
        {isSheetOpen && (
          <CustomSheet
            title={
              isSheetOpen.action === 'update'
                ? breadcrumbs.user_catalogues.update.title
                : breadcrumbs.user_catalogues.create.title
            }
            description="Nhập đầy đủ các thông tin dưới đây. Các mục có dấu (*) là bắt buộc"
            isSheetOpen={isSheetOpen.open}
            closeSheet={closeSheet}
            openSheet={openSheet}
            className="w-[500px] sm:w-[500px]"
          >
            <UserCataloguesStore
              refetch={refetch}
              closeSheet={closeSheet}
              id={isSheetOpen.id}
              action={isSheetOpen.action}
            />
          </CustomSheet>
        )}
      </div>
    </FilterProvider>
  )
}
export default UserCataloguesIndex
