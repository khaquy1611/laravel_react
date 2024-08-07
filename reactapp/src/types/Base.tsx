/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserType } from './User'
export interface UpdateStatusByFieldParam {
  id: string | number
  column: string
  value: string | number | boolean
  model: string | null
}

interface userColumn {
  name: string
  render: (item: UserType) => JSX.Element
}

export interface tableColumnType {
  users: userColumn[]
}

export interface CheckStateInterface {
  checkedState: { [key: number]: boolean }
}

export interface FilterProps extends CheckStateInterface {
  isAnyChecked: boolean
  model: string
  refetch: any
  handleQueryString: any
  openSheet: () => void
}

export interface SheetProps {
  isSheetOpen?: boolean
  closeSheet: () => void
  openSheet?: () => void
  children: any
  title: string | undefined | any
  className:  string | undefined | any
}

export interface CustomAlertDialogType {
  isOpen: boolean
  title: string
  desciption: string
  closeAlertDialog: () => void
  confirmAction: () => void
}
export interface FilterParamsType {
  [key: string]: string | number
}
