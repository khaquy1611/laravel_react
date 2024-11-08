import { AttributeCatalogue } from "./AttributeCatalogues"

export type Attribute = {
    id?: number
    name?: string
    model?: string
    description?: string
    canonical?: string
    attribute_catalogue?: AttributeCatalogue | undefined
  }
  