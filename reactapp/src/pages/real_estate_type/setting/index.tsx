/* eslint-disable @typescript-eslint/no-explicit-any */
/* React */

export type TRealEstateType = {
  id: number
  name: string
  canonical: string
}

export type TRealEstateTypePayloadInput = {
  name: string
  canonical: string
}

interface tableColumn {
  name: string
  render: (item: TRealEstateType) => JSX.Element
}

export const tableColumn: tableColumn[] = [
  {
    name: 'Tên loại tin',
    render: (item: TRealEstateType) => <span>{item.name}</span>,
  },
  {
    name: 'Đường dẫn',
    render: (item: TRealEstateType) => <span>{item.canonical}</span>,
  },
]
