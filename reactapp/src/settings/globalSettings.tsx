/* React */

/* COMPONENTS */
import { FaXmark } from 'react-icons/fa6'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { FaRegCircleXmark } from 'react-icons/fa6'

/* SETTINGS */

/* INTERFACE & TYPE */
import { BaseFilterItem } from '@/types/Base'

export const filterItems: BaseFilterItem[] = [
  { value: 'deleteAll', label: 'Xóa', icon: <FaXmark className="mr-[5px]" /> },
  {
    value: 'publish|2',
    label: 'Xuất bản',
    icon: <IoCheckmarkOutline className="mr-[5px]" />,
  },
  {
    value: 'publish|1',
    label: 'Ngừng xuất bản',
    icon: <FaRegCircleXmark className="mr-[5px]" />,
  },
]
