import {
    NamedAPIResource,
    PaginationData,
} from "@/interfaces/PokeApi/CommonModels";
import { http } from "../config/http";
import { TypeDetail } from "@/interfaces/PokeApi/IPokemonTypes";

type Params = Record<string, string | number | boolean | undefined>;

type IdName = number | string;

export const typeRepository = {
    async getAll(params: Params): Promise<PaginationData<NamedAPIResource[]>> {
        console.log(params);
        const { data } = await http.get(`/type`, {
            params: params ?? {},
        });

        return data;
    },

    async getById(id: IdName): Promise<TypeDetail> {
        const { data } = await http.get(`/type/${id}`);

        return data;
    },
};
