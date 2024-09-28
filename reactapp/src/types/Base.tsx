/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserType } from './User'
export interface UpdateStatusByFieldParam {
  id: string | number
  column: string
  value: string | number | boolean
  model: string | null
}

export interface tableColumnProps {
  name: string
  render: (item: UserType) => JSX.Element
}
export interface CheckStateInterface {
  checkedState: { [key: number]: boolean }
}

export type CheckState = {
  [key: number]: boolean
}
export interface FilterProps extends CheckStateInterface, SheetProps {
  isAnyChecked: boolean
  model: string
  refetch: any
  handleQueryString: any
  items: BaseFilterItem[]
  buttonText: string
}

export interface SheetProps {
  isSheetOpen?: boolean
  closeSheet?: () => void
  openSheet: ({ action, id }: Sheet) => void
  children?: any
  title?: string | undefined | any
  className?: string | undefined | any
  description?: string | undefined | any
}
export interface CustomTableProps extends SheetProps {
  data: any
  isLoading: boolean
  isError: boolean
  model: string
  tableColumn: Array<{ name: string; render: (item: any) => JSX.Element }>
  checkedState: { [key: number]: boolean }
  checkedAllState: boolean
  handleCheckedChange: (id: number) => void
  handleCheckedAllChange: () => void
  destroy: (id: string) => void
  refetch: any
  buttonActions: ButtonAction<ActionParam[]>[]
  [key: string]: any
}

export interface CustomAlertDialogProps {
  isOpen: boolean
  title: string
  description: string
  closeAlertDialog: () => void
  confirmAction?: () => void
  isDialogLoading?: boolean
}
export interface FilterParamsProps {
  [key: string]: string | number
}

export interface InputProps {
  label: string | undefined | any
  id: string
  type: string | undefined | any
  register: any
}

export interface Option {
  value: string | undefined
  label: string | undefined
}

export interface CustomSelectBoxProps {
  title?: string | undefined
  placeholder?: string | undefined
  options?: Option[]
  defaultValue?: Option
  onSelectChange?: (value: string | undefined) => void
  isLoading?: boolean
  value: Option | null

  rules?: object
  name: string
  register?: any
  control?: any
  errors?: any
  // value: string | undefined
}
export interface LoadingButtonProps {
  loading?: boolean
  text?: string | undefined
}

export interface Inputs {
  email: string
  password: string
}

export interface CustomInputProps {
  register: any
  errors: any
  label: string
  name: string
  type: string | undefined
  defaultValue?: string | null | undefined
}
export interface Sheet {
  open: boolean
  action: string
  id: string | null
}

export interface SelectBoxItem {
  title: string | undefined
  placeholder: string | undefined
  options: Option[]
  value: Option | string | undefined | null
  name: string
  control: any
  onSelectChange?: (value: string | undefined) => void
  isLoading?: boolean
}
export interface StoreProps {
  refetch: any
  closeSheet: () => void
  id: string | null
  action: string
}

export type Row = Record<string, any>
export type OpenSheetFunction = (sheet: Sheet) => void
export type ActionParam =
  | keyof Row
  | `${string}:f`
  | `${string}:c`
  | `${string}:pf` // pf: prop function:

export type ParamToType<T extends ActionParam> = T extends `${string}:f`
  ? () => void
  : T extends `${string}:pf`
  ? () => void
  : T extends `${string}:c`
  ? React.ComponentType<any>
  : T extends keyof Row
  ? Row[T]
  : never

export type ParamsToTuple<T extends ActionParam[]> = {
  [K in keyof T]: ParamToType<T[K]>
}
export interface ButtonAction<T extends ActionParam[]> {
  onClick?: (...agrs: ParamsToTuple<T>) => void
  params?: T
  className?: string
  icon?: React.ReactNode
  path?: string
  method?: string
  component?: React.ComponentType<any>
}

export interface SelectOption {
  value: string
  label: string
}

export interface Select {
  placeholder: string
  id?: string
  items: SelectOption[]
}

export interface BaseFilterItem {
  value: string
  label: string
  icon: React.ReactNode
}

export type Breadcrumb = {
  title: string
  route: string
}
