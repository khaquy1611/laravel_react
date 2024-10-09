/* React */

/* COMPONENTS */

/* SETTINGS */
import { TTag } from '@/types/Tags'

/* INTERFACE & TYPE */

/* HOOKS */
// import { Sheet } from "@/hooks/useSheet";

interface tableColumn {
  name: string
  render: (item: TTag) => JSX.Element
}

export const tableColumn: tableColumn[] = [
  {
    name: 'Tên Tag',
    render: (item: TTag) => <span>{item.name}</span>,
  },
  {
    name: 'Đường dẫn',
    render: (item: TTag) => <span>{item.canonical}</span>,
  },
  {
    name: 'Được chọn',
    render: (item: TTag) => (
      <span className="text-center">{item.posts_count}</span>
    ),
  },
]
