/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserType {
  id: number
  name: string
  email: string
  image: string | null
  phone: string | null
  address: string | null
  created_at: string | null
  user_catalogue_id: string
  province_id: string | null
  district_id: string | null
  ward_id: string | null
}

export interface UserState {
  [userId: string]: {
    [columnName: string]: boolean
  }
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

export interface FilterParams {
  sort?: string | undefined
  keyword?: string | undefined
  perPage?: string | undefined
  publish?: string | undefined
  parent_id?: string | undefined
}

export type PayloadInput = {
  name: string
  email: string
  phone: string
  password?: string | undefined
  confirmPassword?: string | undefined
  user_catalogue_id: string
  // image?:  FileList | string | undefined,
  image?: any
  province_id: string
  district_id: string
  ward_id: string
  address?: string
}

export interface ImageUploadResult {
  file: File
  preview: string
}

export interface PayloadInputType<T> {
  [key: string]: T
}
