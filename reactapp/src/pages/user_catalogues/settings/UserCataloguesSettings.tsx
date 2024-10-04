/* SETTINGS */
import { UserCataloguesType } from '@/types/UserCatalogues'

/* INTERFACE & TYPE */
import {
  tableColumnProps,
} from '@/types/Base'
import { Link } from 'react-router-dom'

/* HOOKS */

export const tableColumn: tableColumnProps<UserCataloguesType>[] = [
  {
    name: 'Tên nhóm thành viên',
    render: (item: UserCataloguesType) => <span><Link to={`/user/index?page=1&user_catalogue_id=${item.id}`}>{item.name}</Link></span>,
  },
  {
    name: 'Số lượng',
    render: (item: UserCataloguesType) => <span className="text-center">{item.users_count}</span>
  },
  {
    name: 'Mô tả',
    render: (item: UserCataloguesType) => <span>{item.description ?? '-'}</span>,
  },
]


