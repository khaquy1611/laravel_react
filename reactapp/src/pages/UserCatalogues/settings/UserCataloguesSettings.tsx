/* SETTINGS */
import { UserCataloguesType } from '@/types/UserCatalogues'

/* INTERFACE & TYPE */
import {
  tableColumnProps,
} from '@/types/Base'

/* HOOKS */

export const tableColumn: tableColumnProps<UserCataloguesType>[] = [
  {
    name: 'Tên nhóm thành viên',
    render: (item: UserCataloguesType) => <span>{item.name}</span>,
  },
  {
    name: 'Số lượng',
    render: (item: UserCataloguesType) => <span>{item.name ?? '-'}</span>,
  },
  {
    name: 'Mô tả',
    render: (item: UserCataloguesType) => <span>{item.description ?? '-'}</span>,
  },
]


