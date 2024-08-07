/* eslint-disable react-hooks/exhaustive-deps */
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
import { perPage, publishs, sorts } from '@/constants'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { useSearchParams } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { FilterProps } from '@/types/Base'
import useFilterHooksActions from '@/hooks/useFilterHooksActions'
import CustomAlertDialog from './CustomAlertDialog'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '@/helpers/myHelper'
import { clearToast } from '@/redux/slice/toastSlice'
import { FilterParams } from '@/types/User'
import useDebounce from '@/hooks/useDebounce'

const Filter = ({
  isAnyChecked,
  checkedState,
  model,
  refetch,
  handleQueryString,
  openSheet,
}: FilterProps) => {
  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false)
  const [actionSelectedValue, setActionSelectedValue] = useState(``)
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState<FilterParams>({
    sort: searchParams.get('sort') || '',
    perPage: searchParams.get('perPage') || '10',
    publish: searchParams.get('publish') || '0',
    parent_id: searchParams.get('parent_id') || '0',
  })
  const [keyword, setKeyword] = useState<string>(
    searchParams.get('keyword') || ''
  )
  const { actionSwitch } = useFilterHooksActions()
  const { debounce } = useDebounce()
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

  const handlerFilter = (value: string, field: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [field]: value }))
  }
  const debounceInputSearch = debounce((value: string) => {
    setKeyword(value)
  }, 300)
  useEffect(() => {
    handleQueryString({ ...filters, keyword })
  }, [filters, keyword])

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
            {isAnyChecked && (
              <div className="mr-[10px]">
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
              </div>
            )}
            <div className="mr-[10px]">
              <Select
                onValueChange={value => handlerFilter(value, 'perPage')}
                defaultValue={filters.perPage}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn số bản ghi" />
                </SelectTrigger>
                <SelectContent>
                  {perPage &&
                    perPage.map((perPage, index) => (
                      <SelectItem
                        key={index}
                        className="cursor:pointer flex"
                        value={perPage}
                      >
                        {perPage} bản ghi
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mr-[10px]">
              <Select
                onValueChange={value => handlerFilter(value, 'publish')}
                defaultValue={filters.publish}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {publishs &&
                    publishs.map(publish => (
                      <SelectItem
                        key={publish.id}
                        className="cursor:pointer flex"
                        value={String(publish.id)}
                      >
                        {publish.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mr-[10px]">
              <Select
                onValueChange={value => handlerFilter(value, 'parent_id')}
                defaultValue={filters.parent_id}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn danh mục cha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Tất cả danh mục</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mr-[10px]">
              <Select
                onValueChange={value => handlerFilter(value, 'sort')}
                defaultValue={filters.sort}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  {sorts &&
                    sorts.map(sort => (
                      <SelectItem
                        key={sort.name}
                        className="cursor:pointer flex"
                        value={String(sort.value)}
                      >
                        {sort.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mr-[10px]">
              <Input
                type="email"
                className="w-[200px]"
                placeholder="Nhập từ khóa..."
                onChange={e => {
                  e.preventDefault()
                  debounceInputSearch(e.target.value)
                }}
                defaultValue={keyword}
              />
            </div>
          </div>
          <div>
            <Button
              className="p-0 bg-primary-bg text-white px-[15px] flex justify-between items-center text-[12px]"
              onClick={() => openSheet()}
            >
              <FaPlus className="mr-[5px]" />
              Thêm mới thành viên
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter
