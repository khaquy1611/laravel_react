/* eslint-disable @typescript-eslint/no-explicit-any */
export type PostCataloguePayloadInput = {
  name: string
  description?: string | null
  content?: string | null
  canonical: string
  meta_title?: string
  meta_keyword?: string
  meta_description?: string
  parent_id?: number | undefined
  publish?: number | undefined
  follow?: number | undefined
  image?: any
  icon?: any
  // icon?: File,
}

export type PostCatalogue = {
  [key: string]: string
}
