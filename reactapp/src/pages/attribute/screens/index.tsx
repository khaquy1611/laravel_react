/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react'
/* COMPONENTS */
import PageHeading from '@/components/Heading'
import Paginate from '@/components/Paginate'
import Filter from '@/components/Filter'
import CustomTable from '@/components/CustomTable'
import CustomSheet from '@/components/CustomSheet'
import ObjectStore from './include/store'

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
import { useQuery } from 'react-query'

/* SETTINGS */
import { tableColumn, buttonActions } from '../settings'

import { Breadcrumb } from '@/types/Base'
import { filterItems } from '@/settings/globalSettings'
import { SelectConfig } from '@/components/CustomFilter'

import { AttributeCatalogue } from '@/types/AttributeCatalogues'
import { queryKey } from '@/constants/query'

/* SERVICE */
import { pagination, destroy } from '@/services/AttributeService'
import { pagination as attributeCataloguePagination } from '@/services/AttributeCatalogueService'
import { useSearchParams } from 'react-router-dom'
import { breadcrumbs, Models } from '@/constants'

const Attribute = () => {
  const breadcrumbData: Breadcrumb = breadcrumbs.attribute.index
  const model = Models.attributes
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

  const {
    data: dataAttributeCatalogues,
    isLoading: isAttributeCatalogueLoading,
  } = useQuery([queryKey.attributeCatalogues], () =>
    attributeCataloguePagination('?sort=name,asc')
  )

  const attributeCatalogues = useMemo(() => {
    if (!isAttributeCatalogueLoading && dataAttributeCatalogues) {
      return dataAttributeCatalogues[queryKey.attributeCatalogues].map(
        (attributeCatalogueItem: AttributeCatalogue) => ({
          value: String(attributeCatalogueItem.id),
          label: String(attributeCatalogueItem.name),
        })
      )
    }

    return []
  }, [dataAttributeCatalogues, isAttributeCatalogueLoading])

  return (
    <FilterProvider customFilters={customFilter}>
      <PageHeading breadcrumb={breadcrumbData} />

      <div className="container-fluid mx-6">
        <Card className="rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[20px]">
            <CardTitle className="uppercase">
              Quản lý danh sách thuộc tính
            </CardTitle>
            <CardDescription className="text-xs text-[blue]">
              Hiển thị danh sách thuộc tính, sử dụng các chức năng bên dưới để
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
              openSheet={openSheet}
              items={filterItems}
              buttonText="Thêm mới thuộc tính"
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
              buttonActions={buttonActions}
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
                ? breadcrumbs.attribute.update.title
                : breadcrumbs.attribute.create.title
            }
            description="Nhập đầy đủ các thông tin dưới đây. Các mục có dấu (*) là bắt buộc"
            isSheetOpen={isSheetOpen.open}
            closeSheet={closeSheet}
            className="w-[500px] sm:w-[500px]"
          >
            <ObjectStore
              refetch={refetch}
              closeSheet={closeSheet}
              id={isSheetOpen.id || undefined}
              action={isSheetOpen.action}
              attributeCatalogues={attributeCatalogues}
            />
          </CustomSheet>
        )}
      </div>
    </FilterProvider>
  )
}
export default Attribute
