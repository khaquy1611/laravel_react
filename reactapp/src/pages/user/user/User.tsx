import PageHeading from '@/components/Heading'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { UserType } from '@/types/User'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Switch } from '@/components/ui/switch'
import { MdLockReset } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FaRegEdit } from 'react-icons/fa'
import { pagination } from '@/services/UserServices'
import { useQuery } from 'react-query'
import { LoadingSpinner } from '@/components/ui/loading'

const User = () => {
  const { isLoading, data, isError } = useQuery('users', pagination)

  return (
    <>
      <PageHeading />
      <div className="container">
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
            <Table className="border border-solid border-[#ebebeb]">
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
                  data.users.data &&
                  data.users.data.map((user: UserType, index: number) => (
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
                        <Switch checked={true} />
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
            </Table>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default User
