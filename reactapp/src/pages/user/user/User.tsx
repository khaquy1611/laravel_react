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

  const totalItems = data ? data.total : 0
  const totalPages = Math.ceil(totalItems / 20)

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
            {/* <Table className="border border-solid border-[#ebebeb]">
              <TableCaption>Danh sách thành viên.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">
                    <Checkbox className="text-white" />
                  </TableHead>
                  <TableHead className="w-[100px] text-center">ID</TableHead>
                  <TableHead className="text-center">Họ Tên</TableHead>
                  <TableHead className="text-center">Số điện thoại</TableHead>
                  <TableHead className="text-center">Email</TableHead>
                  <TableHead className="text-center">Địa chỉ</TableHead>
                  <TableHead className="text-center">Nhóm thành viên</TableHead>
                  <TableHead className="text-center">Tình trạng</TableHead>
                  <TableHead className="text-center">Tác vụ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center items-center">
                      <LoadingSpinner className="inline-block mr-[5px]" />
                      ...Loading
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center text-[12px] text-[#f00000]"
                    >
                      Có vấn đè trong quá trình xảy ra khi truy xuất dữ liệu.
                      Hãy thử lại sau
                    </TableCell>
                  </TableRow>
                ) : (
                  data.users &&
                  data.users.map((user: UserType, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-center">
                        <Checkbox className="text-white" />
                      </TableCell>
                      <TableCell className="text-center">{user.id}</TableCell>
                      <TableCell className="text-center">{user.name}</TableCell>
                      <TableCell className="text-center">
                        {user.phone}
                      </TableCell>
                      <TableCell className="text-center">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-center">
                        {user.address ?? '-'}
                      </TableCell>
                      <TableCell className="text-center">Admin</TableCell>
                      <TableCell className="text-center">
                        <Switch
                          value={user.id}
                          checked={columnState[user.id]?.publish}
                          onCheckedChange={() =>
                            handleChecked(user.id, 'publish', model['users'])
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center flex justify-center items-center">
                        <Button className="bg-[#5d78d1] flex mr-[5px]">
                          <Link to="/user/update">
                            <FaRegEdit className="text-white" />
                          </Link>
                        </Button>
                        <Button className="bg-[#ec4728] flex mr-[5px]">
                          <Link to="/user/delete">
                            <RiDeleteBinLine className="text-white" />
                          </Link>
                        </Button>
                        <Button className="bg-[#f8ac59]">
                          <Link to="/user/delete">
                            <MdLockReset className="text-white" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table> */}
            <CustomTable
              data={data}
              isLoading={isLoading}
              isError={isError}
              model={model['users']}
              tableColumn={tableColumn}
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
