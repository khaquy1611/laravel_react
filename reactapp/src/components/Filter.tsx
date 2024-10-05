/* REACT */
import { useEffect, memo } from 'react'

/* COMPONENT */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FaPlus } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CustomAlertDialog from '@/components/CustomAlertDialog'
import CustomFilter from './CustomFilter'
import { Link } from 'react-router-dom'
/* SETTINGS */
import { FilterProps } from '@/types/Base'
import { perpages, publishs, sort } from '@/constants/general'

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
  isSheetOpen,
  items,
  buttonText,
  ...restProps
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
    if (openSheet) {
      openSheet({ open: true, action: '', id: null })
    }
  }

  useEffect(() => {
    handleQueryString({ ...filters, keyword: keyword })
    console.log(openSheet)
  }, [filters, keyword])

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
                  onValueChange={value => handleFilter(value, 'perpage')}
                  defaultValue={filters.perPage}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn số bản ghi" />
                  </SelectTrigger>
                  <SelectContent>
                    {perpages &&
                      perpages.map((perpage, index) => (
                        <SelectItem key={index} value={perpage}>
                          {perpage} bản ghi
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
                      {sort &&
                        sort.map((item, index) => (
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
            </div>
          </div>
          <div>
            {isSheetOpen ? (
              <Button
                className="p-0 primary-bg text-white px-[15px] flex justify-between items-center text-[12px]"
                onClick={() => detectButtonAction()}
              >
                <FaPlus className="mr-[5px]" />
                {buttonText}
              </Button>
            ) : (
              <Link
                to={restProps.to}
                className="p-0 primary-bg text-white px-[15px] flex justify-between items-center text-[13px] block p-[10px] rounded"
              >
                <Button className="p-0 primary-bg text-white px-[15px] flex justify-between items-center text-[12px]">
                  <FaPlus className="mr-[5px]" />
                  {buttonText}
                </Button>
              </Link>
            )}
          </div>
        </div>
        <CustomFilter handleFilter={handleFilter} />
      </div>
    </>
  )
}

export default memo(Filter)
