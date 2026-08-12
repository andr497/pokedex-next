import { http } from "../config/http";
import { IAbility } from "@/interfaces/PokeApi/IAbility";

type IdName = number | string;

export const abilityRepository = {
    async getById(id: IdName): Promise<IAbility> {
        const { data } = await http.get(`/ability/${id}`);
        return data;
    },
};
