export interface UserCataloguesType {
    id: number
    name: string | null | undefined
    description: string | null | undefined
    users_count: string
}

export type UserCataloguePayloadInput = {
    name: string,
    description?: string
};
