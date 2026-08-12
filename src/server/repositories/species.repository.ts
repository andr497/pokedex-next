import { http } from "../config/http";
import { PokemonSpecies } from "@/interfaces/PokeApi/IPokemonSpecies";

type IdName = number | string;

export const speciesRepository = {
    async getById(id: IdName): Promise<PokemonSpecies> {
        const { data } = await http.get(`/pokemon-species/${id}`);
        return data;
    },
};
