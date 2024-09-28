/* REACT */
import { useEffect } from 'react'

/* COMPONENT */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { FaPlus } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CustomAlertDialog from '@/components/CustomAlertDialog'
import CustomFilter from './CustomFilter'
/* SETTINGS */
import { FilterProps } from '@/types/Base'
import { perPages, publishs, sorts } from '@/constants/index'

/* HOOKS */
import useFilterAction from '@/hooks/useFilterAction'
import useDebounce from '@/hooks/useDebounce'

const Filter = ({
  isAnyChecked,
  checkedState,
  model,
  refetch,
  handleQueryString,
  openSheet,
  items,
  buttonText,
}: FilterProps) => {
  const { debounce } = useDebounce()
  const {
    alertDialogOpen,
    closeAlertDialog,
    openAlertDialog,
    actionSelectedValue,
    confirmAction,
    keyword,
    filters,
    handleFilter,
    debounceInputSearch,
  } = useFilterAction(checkedState, model, refetch, debounce)

  const detectButtonAction = () => {
    openSheet({ open: true, action: '', id: null })
  }

  useEffect(() => {
    handleQueryString({ ...filters, keyword: keyword })
  }, [filters, handleQueryString, keyword])

  return (
    <>
      <div className="mb-[15px]">
        {alertDialogOpen && (
          <CustomAlertDialog
            isOpen={alertDialogOpen}
            title="Bạn có chắc chắn muốn thực hiện chức năng này?"
            description="Hành động này là không thể đảo ngược được. Hãy chắc chắn rằng bạn muốn thực hiện chức năng này"
            closeAlertDialog={closeAlertDialog}
            confirmAction={() => confirmAction(actionSelectedValue)}
          />
        )}
        <div className="flex justify-between items-center">
          <div className="filter-action">
            <div className="flex items-center">
              {isAnyChecked && (
                <div className="mr-[10px]">
                  <Select onValueChange={value => openAlertDialog(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn thao tác" />
                    </SelectTrigger>
                    <SelectContent>
                      {items &&
                        items.map(item => (
                          <SelectItem value={item.value} className="flex">
                            <div className="flex items-center">
                              {item.icon}
                              {item.label}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="mr-[10px]">
                <Select
                  onValueChange={value => handleFilter(value, 'perPage')}
                  defaultValue={filters.perPage}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn số bản ghi" />
                  </SelectTrigger>
                  <SelectContent>
                    {perPages &&
                      perPages.map((perPage, index) => (
                        <SelectItem key={index} value={perPage}>
                          {perPage} bản ghi
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mr-[10px]">
                <Select
                  onValueChange={value => handleFilter(value, 'publish')}
                  defaultValue={filters.publish}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    {publishs &&
                      publishs.map((publish, index) => (
                        <SelectItem key={index} value={String(publish.id)}>
                          {publish.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              {
                <div className="mr-[10px]">
                  <Select
                    onValueChange={value => handleFilter(value, 'sort')}
                    defaultValue={filters.sort}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sắp xếp theo" />
                    </SelectTrigger>
                    <SelectContent>
                      {sorts &&
                        sorts.map((item, index) => (
                          <SelectItem key={index} value={String(item.value)}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              }
              <div className="mr-[10px]">
                <Input
                  type="email"
                  placeholder="Nhập từ khóa...."
                  className="w-[200px]"
                  onChange={e => {
                    debounceInputSearch(e.target.value)
                  }}
                  defaultValue={keyword}
                />
              </div>

              <CustomFilter handleFilter={handleFilter} />
            </div>
          </div>
          <div>
            <Button
              className="p-0 bg-primary-bg text-white px-[15px] flex justify-between items-center text-[12px]"
              onClick={() => detectButtonAction()}
            >
              <FaPlus className="mr-[5px]" />
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter
