/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useCallback } from 'react'
/* COMPONENTS */
import PageHeading from '@/components/Heading'
import Paginate from '@/components/Paginate'
import Filter from '@/components/Filter'
import CustomTable from '@/components/CustomTable'
import CustomSheet from '@/components/CustomSheet'
import UserStore from '@/pages/user/screens/include/Store'

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
import { breadcrumbs, Models, buttonUserActions } from '@/constants/index'
import { tableColumn } from '@/pages/user/settings/userSettings'

import { Breadcrumb } from '@/types/Base'
import { filterItems } from '@/settings/globalSettings'
import { SelectConfig } from '@/components/CustomFilter'
import { UserCataloguesType } from '@/types/UserCatalogues'

/* SERVICE */
import { pagination, destroy, changePassword } from '@/services/UserServices'
import { pagination as userCataloguePagination } from '@/services/UserCataloguesServices'
import { useSearchParams } from 'react-router-dom'

const User = () => {
  const breadcrumbData: Breadcrumb = breadcrumbs.users.index
  const model = Models.users
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

  const { data: dataUserCatalogues, isLoading: isUserCatalogueLoading } =
    useQuery(['user_catalogues'], () =>
      userCataloguePagination('?sort=name,asc')
    )

  const userCatalogues = useMemo(() => {
    if (!isUserCatalogueLoading && dataUserCatalogues) {
      return dataUserCatalogues['user_catalogues'].map(
        (userCatalogueItem: UserCataloguesType) => ({
          value: String(userCatalogueItem.id),
          label: String(userCatalogueItem.name),
        })
      )
    }

    return []
  }, [dataUserCatalogues, isUserCatalogueLoading])

  const [customFilter, setCustomFilter] = useState<SelectConfig[]>([
    {
      name: 'user_catalogue_id',
      placeholder: 'Chọn Nhóm Thành Viên',
      options: [],
    },
  ])

  const setCustomFilterCallback = useCallback(
    (prevState: SelectConfig[]) =>
      prevState.map(item =>
        item.name === 'user_catalogue_id'
          ? {
              ...item,
              options: [
                { value: '0', label: 'Tất cả các nhóm' },
                ...userCatalogues,
              ],
            }
          : item
      ),
    [userCatalogues]
  )

  useEffect(() => {
    if (userCatalogues.length) {
      setCustomFilter(prevState => setCustomFilterCallback(prevState))
    }
  }, [userCatalogues, setCustomFilterCallback])

  return (
    <FilterProvider customFilters={customFilter}>
      <PageHeading breadcrumb={breadcrumbData} />

      <div className="container-fluid mx-6">
        <Card className="rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[20px]">
            <CardTitle className="uppercase">
              Quản lý danh sách thành viên
            </CardTitle>
            <CardDescription className="text-xs text-[blue]">
              Hiển thị danh sách thành viên, sử dụng các chức năng bên dưới để
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
              buttonText="Thêm mới thành viên"
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
              buttonActions={buttonUserActions}
              changePassword={changePassword}
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
                ? breadcrumbs.users.update.title
                : breadcrumbs.users.create.title
            }
            description="Nhập đầy đủ các thông tin dưới đây. Các mục có dấu (*) là bắt buộc"
            isSheetOpen={isSheetOpen.open}
            closeSheet={closeSheet}
            className="w-[500px] sm:w-[500px]"
          >
            <UserStore
              refetch={refetch}
              closeSheet={closeSheet}
              id={isSheetOpen.id || undefined}
              action={isSheetOpen.action}
              userCatalogueData={userCatalogues}
            />
          </CustomSheet>
        )}
      </div>
    </FilterProvider>
  )
}
export default User
