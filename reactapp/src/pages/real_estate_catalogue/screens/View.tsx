/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
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

/* SETTINGS */
import { buttonActions, tableColumn } from '../settings'
import { breadcrumbs, Models } from '@/constants'
import { SelectConfig } from '@/components/CustomFilter'
import { filterItems } from '@/settings/globalSettings'
import { Breadcrumb } from '@/types/Base'

/* SERVICE */
import { destroy, pagination } from '@/services/RealEstateCatalogueService'
import { useSearchParams } from 'react-router-dom'

const RealEstateCatalogue = () => {
  const breadcrumbData: Breadcrumb = breadcrumbs.real_estate_catalogues.index
  const model = Models.real_estate_catalogues
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

  const [customFilter] = useState<SelectConfig[]>([])

  return (
    <FilterProvider customFilters={customFilter}>
      <PageHeading breadcrumb={breadcrumbData} />

      <div className="container-fluid mx-6">
        <Card className="rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[20px]">
            <CardTitle className="uppercase">
              Quản lý danh sách loại bất động sản
            </CardTitle>
            <CardDescription className="text-xs text-[blue]">
              Hiển thị danh sách loại bất động sản, sử dụng các chức năng bên
              dưới để lọc theo mong muốn
            </CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            <Filter
              isAnyChecked={somethingChecked}
              checkedState={checkedState}
              model={model}
              refetch={refetch}
              handleQueryString={(filters: any) => handleQueryString(filters)}
              // openSheet={openSheet}
              items={filterItems}
              buttonText="Thêm mới nhóm loại bất động sản"
              to="/real_estate/catalogue/create"
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
              buttonActions={buttonActions}
            />
          </CardContent>
          <CardFooter>
            {!isLoading && data[model] && data.links ? (
              <Paginate
                links={data.links}
                pageChange={handlePageChange}
                totalPages={totalPages}
              />
            ) : null}
          </CardFooter>
        </Card>
      </div>
    </FilterProvider>
  )
}
export default RealEstateCatalogue
