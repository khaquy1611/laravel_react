export interface UserType {
  id: number,
  name: string,
  email: string,
  image?: string | null,
  birthday?: string | null,
  phone: string | null,
  description? : string | null,
  address: string | null,
}

