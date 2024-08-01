export interface UserType {
  id: number
  name: string
  email: string
  image?: string | null
  birthday?: string | null
  phone: string | null
  description?: string | null
  address: string | null
  publish?: number | null
  created_at?: string | null
}
interface UserLinks {
  url?: string | number | null
  label?: string | number | null
  active?: boolean
}
export interface DataUserResponse {
  current_page?: string | number | null
  last_page?: string | number | null
  total?: string | number | null
  links: UserLinks[]
  users: UserType[]
}

export interface PublishState {
  [id: string]: boolean
}
