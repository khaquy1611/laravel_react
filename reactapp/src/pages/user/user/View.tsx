import PageHeading from '@/components/Heading'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { pagination } from '@/services/UserServices'
import Paginate from '@/components/Paginate'
import { breadcrumb, model } from '@/constants'
import CustomTable from '@/components/CustomTable'
import { tableColumn } from '@/constants'
import Filter from '@/components/Filter'
import useCheckBoxState from '@/hooks/useCheckBoxState'
import useTable from '@/hooks/useTable'
import { FilterParamsProps } from '@/types/Base'
import { useSearchParams } from 'react-router-dom'
import useSheet from '@/hooks/useSheet'
import CustomSheet from '@/components/CustomSheet'
import UserStore from './Store'

const View = () => {
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
    handleChangeAll,
    isAnyChecked,
  } = useCheckBoxState(data, model['users'], isLoading)
  const { isSheetOpen, openSheet, closeSheet } = useSheet()
  const [searchParams] = useSearchParams()
  const perPage = searchParams.get('perPage')
    ? parseInt(searchParams.get('perPage')!)
    : 20
  const totalItems = data ? data.total : 0
  const totalPages = Math.ceil(totalItems / perPage)
  const somethingChecked = isAnyChecked()

  return (
    <>
      <PageHeading breadcrumb={breadcrumb} />
      <div className="container-fluid px-4">
        <Card className="rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[20px]">
            <CardTitle className="uppercase">
              QUẢN LÝ DANH SÁCH THÀNH VIÊN
            </CardTitle>
            <CardDescription className="text-xs text-[#0400f0]">
              Hiển thị danh sách thành viên, sử dụng các chức năng bên dưới để
              lọc theo ý muốn
            </CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            <Filter
              isAnyChecked={somethingChecked}
              checkedState={checkedState}
              model={model['users']}
              refetch={refetch}
              handleQueryString={(filters: FilterParamsProps) =>
                handleQueryString(filters)
              }
              openSheet={openSheet}
            />
            <CustomTable
              data={data}
              isLoading={isLoading}
              isError={isError}
              model={model['users']}
              tableColumn={tableColumn}
              checkedState={checkedState}
              checkedAllState={checkedAllState}
              handleCheckedChange={handleCheckedChange}
              handleChangeAll={handleChangeAll}
            />
          </CardContent>
          <CardFooter>
            {!isLoading && data[model['users']] && data.links.length ? (
              <Paginate
                totalPages={totalPages}
                links={data.links}
                pageChange={handlePageChange}
              />
            ) : null}
          </CardFooter>
        </Card>
        <CustomSheet
          className="w-[500px] sm:w-[500px]"
          title={breadcrumb}
          isSheetOpen={isSheetOpen}
          closeSheet={closeSheet}
          description="Nhập đầy đủ các thông tin dưới đây , các mục có dấu (*) là bắt buộc"
        >
          <UserStore />
        </CustomSheet>
      </div>
    </>
  )
}

export default View