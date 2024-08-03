import { useEffect, useState } from 'react'
import PageHeading from '@/components/Heading'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { pagination } from '@/services/UserServices'
import { useQuery } from 'react-query'
import Paginate from '@/components/Paginate'
import { model } from '@/constants'
import CustomTable from '@/components/CustomTable'
import { tableColumn } from '@/constants'
import Filter from '@/components/Filter'
import useCheckBoxState from '@/hooks/useCheckBoxState'

const User = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get('page')
    ? parseInt(searchParams.get('page')!)
    : 1
  const [page, setPage] = useState<number | null>(currentPage)
  const navigate = useNavigate()

  const { isLoading, data, isError, refetch } = useQuery(['users', page], () =>
    pagination(page)
  )
  const {
    checkedState,
    checkedAllState,
    handleCheckedChange,
    handleChangeAll,
    isAnyChecked,
  } = useCheckBoxState(data, model['users'], isLoading)

  const totalItems = data ? data.total : 0
  const totalPages = Math.ceil(totalItems / 20)
  const somethingChecked = isAnyChecked()
  const handlePageChange = (page: number | null) => {
    setPage(page)
    navigate(`?page=${page}`)
  }

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() })
    refetch()
  }, [currentPage, page, refetch, setSearchParams])

  return (
    <>
      <PageHeading />
      <div className="container-fluid px-4">
        <Card className="rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[20px]">
            <CardTitle className="uppercase">
              QUẢN LÝ DANH SÁCH THÀNH VIÊN
            </CardTitle>
            <CardDescription className="text-xs text-[#f00000]">
              Hiển thị danh sách thành viên, sử dụng các chức năng bên dưới để
              lọc theo ý muốn
            </CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            <Filter isAnyChecked={somethingChecked} />
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
      </div>
    </>
  )
}

export default User
