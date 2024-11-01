/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
/* COMPONENTS */
import PageHeading from '@/components/Heading'
import Paginate from '@/components/Paginate'
import Filter from '@/components/Filter'
import CustomTable from '@/components/CustomTable'

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
import 'ckeditor5/ckeditor5.css'

/* SETTINGS */
import { tableColumn, buttonActions } from '../settings'

import { Breadcrumb } from '@/types/Base'
import { filterItems } from '@/settings/globalSettings'
import { SelectConfig } from '@/components/CustomFilter'

/* SERVICE */
import { pagination, destroy } from '@/services/ProjectCatalogueService'

import 'ckeditor5/ckeditor5-content.css'
import { breadcrumbs, Models } from '@/constants'
import { useSearchParams } from 'react-router-dom'

const ProjectCatalogue = () => {
    const breadcrumbData: Breadcrumb = breadcrumbs.project_catalogues.index
    const model = Models.project_catalogues
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
  // const { isSheetOpen, openSheet, closeSheet } = useSheet()
  const [searchParams] = useSearchParams()
  const perPage = searchParams.get('perPage')
    ? parseInt(searchParams.get('perPage')!)
    : 10
  const totalItems = data ? data.total : 0
  const totalPages = Math.ceil(totalItems / perPage)
  const somethingChecked = isAnyChecked()

  const [customFilter] = useState<SelectConfig[]>([])
  console.log(data)
  return (
    <FilterProvider customFilters={customFilter}>
      <PageHeading breadcrumb={breadcrumbData} />

      <div className="container-fluid mx-6">
        <Card className="rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[20px]">
            <CardTitle className="uppercase">
              Quản lý danh sách loại dự án
            </CardTitle>
            <CardDescription className="text-xs text-[blue]">
              Hiển thị danh sách loại dự án, sử dụng các chức năng bên dưới để
              lọc theo mong muốn
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
              buttonText="Thêm mới loại dự án"
              to="/project/catalogue/create"
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
              // openSheet={openSheet}
              destroy={destroy}
              refetch={refetch}
              buttonActions={buttonActions}
            />
          </CardContent>
          <CardFooter>
            {!isLoading && data[model] && data.links ? (
              <Paginate links={data.links} pageChange={handlePageChange} totalPages={totalPages} />
            ) : null}
          </CardFooter>
        </Card>
      </div>
    </FilterProvider>
  )
}
export default ProjectCatalogue
