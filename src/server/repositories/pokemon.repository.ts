import { Pokemon } from "@/interfaces/PokeApi/IPokemonApi";
import {
    NamedAPIResource,
    PaginationData,
} from "@/interfaces/PokeApi/CommonModels";

import { http } from "../config/http";

type IdName = number | string;

export const pokemonRepository = {
    async getPaginated(
        limit: number,
        offset: number,
    ): Promise<PaginationData<NamedAPIResource>> {
        const { data } = await http.get("/pokemon", {
            params: { limit, offset },
        });

        return data;
    },

    async getById(id: IdName): Promise<Pokemon> {
        const { data } = await http.get(`/pokemon/${id}`);
        return data;
    },
};
