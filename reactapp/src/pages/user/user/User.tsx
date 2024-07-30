import PageHeading from '@/components/Heading'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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

const User = () => {
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
                <TableRow>
                  <TableCell className="font-medium text-center">
                    <Checkbox className="text-white" />
                  </TableCell>
                  <TableCell className="text-center">01</TableCell>
                  <TableCell className="text-center">Nguyễn Khả Qúy</TableCell>
                  <TableCell className="text-center">0969608090</TableCell>
                  <TableCell className="text-center">
                    khaquy1611@gmail.com
                  </TableCell>
                  <TableCell className="text-center">Hà Nội</TableCell>
                  <TableCell className="text-center">Admin</TableCell>
                  <TableCell className="text-center">
                    <Switch />
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
