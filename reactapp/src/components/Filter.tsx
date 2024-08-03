import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FaXmark } from 'react-icons/fa6'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { FaRegCircleXmark } from 'react-icons/fa6'
import { perPage } from '@/constants'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { FilterProps } from '@/types/Base'

const Filter = ({ isAnyChecked }: FilterProps) => {
  return (
    <>
      <div className="mb-[15px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-[10px]">
              {isAnyChecked && (
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn Thao Tác" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor:pointer" value="deleteAll">
                      <div className="flex items-center">
                        <FaXmark className="mr-[5px] " />
                      </div>
                    </SelectItem>
                    <SelectItem className="cursor:pointer" value="publish|2">
                      <div className="flex">
                        <IoCheckmarkOutline className="mr-[5px] " />
                        Xuất bản
                      </div>
                    </SelectItem>
                    <SelectItem className="cursor:pointer" value="publish|1">
                      <div className="flex">
                        <FaRegCircleXmark className="mr-[5px] " />
                        Ngừng xuất
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="mr-[10px]">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn số bản ghi" />
                </SelectTrigger>
                <SelectContent>
                  {perPage &&
                    perPage.map((perpage, index) => (
                      <SelectItem
                        key={index}
                        className="cursor:pointer flex"
                        value={perpage}
                      >
                        {perpage} bản ghi
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mr-[10px]">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn danh mục cha" />
                </SelectTrigger>
                <SelectContent></SelectContent>
              </Select>
            </div>

            <div className="mr-[10px]">
              <Input
                type="email"
                className="w-[200px]"
                placeholder="Nhập từ khóa..."
              />
            </div>
          </div>
          <div>
            <Button className="p-0 bg-primary-bg">
              <Link
                to="/user/create"
                className="text-white px-[15px] flex justify-between items-center"
              >
                <FaPlus className="mr-5" />
                Thêm mới thành viên
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter
