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
import useFilterHooksActions from '@/hooks/useFilterHooksActions'
import CustomAlertDialog from './CustomAlertDialog'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '@/helpers/myHelper'
import { clearToast } from '@/redux/slice/toastSlice'

const Filter = ({
  isAnyChecked,
  checkedState,
  model,
  refetch,
}: FilterProps) => {
  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false)
  const [actionSelectedValue, setActionSelectedValue] = useState(``)
  const { actionSwitch } = useFilterHooksActions()
  const dispatch = useDispatch()
  const openAlertDialog = (value: string) => {
    setAlertDialogOpen(true)
    setActionSelectedValue(value)
  }

  const closeAlertDialog = () => {
    setAlertDialogOpen(false)
    setActionSelectedValue(``)
  }
  const confirmAction = async (value: string): Promise<void> => {
    const [action, selectedValue] = value.split('|')
    const response = await actionSwitch(
      action,
      selectedValue,
      { checkedState },
      model,
      refetch
    )
    closeAlertDialog()
    showToast(response?.message, 'success')
    dispatch(clearToast())
  }
  return (
    <>
      <div className="mb-[15px]">
        <CustomAlertDialog
          title="Bạn có chắc muốn thực hiện chức năng này?"
          desciption="Hành động này là không thể đảo ngược được. Dữ liệu của bạn sẽ bị xóa hoàn toàn khỏi hệ thống."
          isOpen={alertDialogOpen}
          confirmAction={() => confirmAction(actionSelectedValue)}
          closeAlertDialog={closeAlertDialog}
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-[10px]">
              {isAnyChecked && (
                <Select onValueChange={value => openAlertDialog(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn Thao Tác" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor:pointer" value="deleteAll">
                      <div className="flex items-center">
                        <FaXmark className="mr-[5px] " />
                        Xóa
                      </div>
                    </SelectItem>
                    <SelectItem className="cursor:pointer" value="publish|2">
                      <div className="flex items-center">
                        <IoCheckmarkOutline className="mr-[5px] " />
                        Xuất bản
                      </div>
                    </SelectItem>
                    <SelectItem className="cursor:pointer" value="publish|1">
                      <div className="flex items-center">
                        <FaRegCircleXmark className="mr-[5px] " />
                        Ngừng xuất bản
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
