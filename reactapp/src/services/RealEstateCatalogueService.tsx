import axios from "@/configs/axios";
import { baseDestroy, baseSave } from "./BaseServices";

import { PostCatalogue as ObjectCatalogue, PostCataloguePayloadInput as ObjectCatalogueInput } from "@/types/PostCatalogues";


const endpoint = '/auth/real_estate_catalogues'

const pagination = async (queryString: string) => {
    const response = await axios.get(`${endpoint}?${queryString}`)
    return response.data
}

const save = async (payload: ObjectCatalogueInput, updateParams: { action: string, id: string  | undefined }) => {
    return baseSave(endpoint, payload, updateParams)
}

const destroy = async (id: string) => {
    return baseDestroy(id, endpoint)
}


const findById = async (id: string | undefined): Promise<ObjectCatalogue> => {
    const response = await axios.get(`${endpoint}/${id}`)
    return response.data
}



export {
    destroy,
    findById, pagination,
    save
};
