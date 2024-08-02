/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Switch } from '@/components/ui/switch'

import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { UserType } from '@/types/User'
import useColumnState from '@/hooks/useColumn'
import { tableColumnType } from '@/types/Base'
import { buttonActions } from '@/constants'

type CustomTableProps = {
  data: any
  isLoading: boolean
  isError: boolean
  model: string
  tableColumn: tableColumnType
}

const CustomTable = ({
  data,
  isLoading,
  isError,
  model,
  tableColumn,
}: CustomTableProps) => {
  const { columnState, handleChecked } = useColumnState(
    data && data[model],
    'publish',
    isLoading
  )

  return (
    <Table className="border border-solid border-[#ebebeb]">
      <TableCaption>Danh sách thành viên.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">
            <Checkbox className="text-white" />
          </TableHead>
          {tableColumn?.users &&
            tableColumn.users.map((column, index) => (
              <TableHead className="text-center" key={index}>
                {column.name}
              </TableHead>
            ))}
          <TableHead className="text-center">Tình trạng</TableHead>
          <TableHead className="text-center">Tác vụ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center items-center">
              <LoadingSpinner className="inline-block mr-[5px]" />
              ...Loading
            </TableCell>
          </TableRow>
        ) : isError ? (
          <TableRow>
            <TableCell
              colSpan={9}
              className="text-center text-[12px] text-[#f00000]"
            >
              Có vấn đè trong quá trình xảy ra khi truy xuất dữ liệu. Hãy thử
              lại sau
            </TableCell>
          </TableRow>
        ) : (
          data[model] &&
          data[model].map((row: UserType, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">
                <Checkbox className="text-white" />
              </TableCell>
              {tableColumn?.users &&
                tableColumn?.users.map((column, index) => (
                  <TableCell className="text-center" key={index}>
                    {column.render(row)}
                  </TableCell>
                ))}
              <TableCell className="text-center">
                <Switch
                  value={row.id}
                  checked={columnState[row.id]?.publish}
                  onCheckedChange={() =>
                    handleChecked(row.id, 'publish', model)
                  }
                />
              </TableCell>
              <TableCell className="text-center flex justify-center items-center">
                {buttonActions.users &&
                  buttonActions.users.map((action, index) => (
                    <Button key={index} className={`${action.className} p-0`}>
                      <Link
                        className="block p-[15px]"
                        to={`${action.path}/${row.id}`}
                      >
                        {action.icon}
                      </Link>
                    </Button>
                  ))}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default CustomTable
