import { http } from "../config/http";
import { Moves } from "@/interfaces/PokeApi/IMoves";

type IdName = number | string;

export const moveRepository = {
    async getById(id: IdName): Promise<Moves> {
        const { data } = await http.get(`/move/${id}`);
        return data;
    },
};
