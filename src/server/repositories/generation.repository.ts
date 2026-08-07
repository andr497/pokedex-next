import { Generation } from "@/interfaces/PokeApi/IGenerations";

import { http } from "../config/http";
import {
    NamedAPIResource,
    PaginationData,
} from "@/interfaces/PokeApi/CommonModels";

type IdName = number | string;

export const generationRepository = {
    async getAll(): Promise<PaginationData<NamedAPIResource[]>> {
        const { data } = await http.get(`/generation`);
        return data;
    },

    async getById(id: IdName): Promise<Generation> {
        const { data } = await http.get(`/generation/${id}`);
        return data;
    },
};
