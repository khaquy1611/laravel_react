import { UserType } from "./User"

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
  users : userColumn[]
}