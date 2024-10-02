/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
/* COMPONENTS */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { LoadingSpinner } from '@/components/ui/loading'
import CustomAlertDialog from '@/components/CustomAlertDialog'
import CustomDialog from '@/components/CustomDialog'

/* HOOKS */
import useColumnState from '@/hooks/useColumnState'
import useDialog from '@/hooks/useDialog'

/* SETTINGS */

import { CustomTableProps, Row, ParamsToTuple } from '@/types/Base'

/* SERVICE */

const CustomTable = ({
  isLoading,
  data,
  isError,
  model,
  tableColumn,
  checkedState,
  checkedAllState,
  handleCheckedChange,
  handleCheckedAllChange,
  openSheet,
  destroy,
  refetch,
  buttonActions,
  ...restProps
}: CustomTableProps) => {
  const { columnState, handleChecked, setInitialColumnState } = useColumnState()
  const {
    confirmAction,
    openAlertDialog,
    closeAlertDialog,
    alertDialogOpen,
    isLoading: isDialogLoading,
  } = useDialog(refetch)

  const [DialogComponent, setDialogComponent] =
    useState<React.ComponentType<any> | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleAlertDialog = (id: string, callback: any) => {
    openAlertDialog(id, callback)
  }

  const handleDialog = (
    id: string,
    callback: Function,
    Component: React.ComponentType<any>
  ) => {
    setDialogComponent(() => (props: any) => (
      <Component id={id} callback={callback} {...props} />
    ))
    setIsDialogOpen(true)
  }

  useEffect(() => {
    if (!isLoading && data[model]) {
      setInitialColumnState(data[model], 'publish')
    }
  }, [isLoading, data])

  return (
    <>
      <Table className="border border-solid border-[#ebebeb]">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                className="text-white"
                checked={checkedAllState}
                onCheckedChange={() => handleCheckedAllChange()}
              />
            </TableHead>
            {tableColumn &&
              tableColumn.map((column, index) => (
                <TableHead key={index}>{column.name}</TableHead>
              ))}

            <TableHead className="text-center">Hoạt động</TableHead>
            <TableHead className="text-center">Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center items-center">
                <LoadingSpinner className="inline-block mr-[5px]" />
                Loading...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center text-[12px] text-[#f00000]"
              >
                Có vấn đề xảy ra trong quá trình truy xuất dữ liệu. Hãy thử lại
                sau
              </TableCell>
            </TableRow>
          ) : (data?.[model] ?? []).length > 0 ? (
            data[model].map((row: any, index: number) => (
              <TableRow
                key={index}
                className={checkedState[row.id] ? 'bg-[#ffc]' : ''}
              >
                <TableCell className="font-medium">
                  <Checkbox
                    className="text-white"
                    checked={checkedState[row.id] || false}
                    onCheckedChange={() => handleCheckedChange(row.id)}
                  />
                </TableCell>
                {tableColumn &&
                  tableColumn.map((column, index) => (
                    <TableCell key={index}>{column.render(row)}</TableCell>
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
                <TableCell className="flex justify-center">
                  {buttonActions &&
                    buttonActions.map((action, index) => (
                      <Button
                        key={index}
                        className={`${action.className} p-[15px]`}
                        onClick={
                          action.onClick && action.params
                            ? (e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault()
                                const args = action.params?.map(param => {
                                  if (
                                    typeof param === 'string' &&
                                    (param.endsWith(':f') ||
                                      param.endsWith(':pf') ||
                                      param.endsWith(':c'))
                                  ) {
                                    if (param.endsWith(':f')) {
                                      return eval(param.slice(0, -2))
                                    } else if (param.endsWith(':pf')) {
                                      const functionName = param.slice(0, -3)
                                      return restProps[functionName]
                                    } else if (param.endsWith(':c')) {
                                      return action.component
                                    }
                                  } else {
                                    return row[param as keyof Row]
                                  }
                                }) as ParamsToTuple<typeof action.params>

                                if (action.onClick) {
                                  action.onClick(...args)
                                }
                              }
                            : undefined
                        }
                      >
                        {action.icon}
                      </Button>
                    ))}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableColumn.length + 3}
                className="text-center text-[12px] text-[#f00]"
              >
                Không có dữ liệu phù hợp để hiển thị.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CustomAlertDialog
        isOpen={alertDialogOpen}
        title="Bạn có chắc chắn muốn thực hiện chức năng này?"
        description="Hành động này là không thể đảo ngược được. Hãy chắc chắn rằng bạn muốn thực hiện chức năng này"
        closeAlertDialog={closeAlertDialog}
        confirmAction={() => confirmAction()}
        isDialogLoading={isDialogLoading}
      />

      {isDialogOpen && DialogComponent && (
        <CustomDialog
          heading="Đổi mật khẩu"
          description="Nhập đầy đủ thông tin dưới đây, Các mục có dáu (*) là bắt buộc"
          buttonLoading={false}
          open={isDialogOpen}
          close={() => setIsDialogOpen(false)}
        >
          <DialogComponent close={() => setIsDialogOpen(false)} />
        </CustomDialog>
      )}
    </>
  )
}

export default CustomTable
