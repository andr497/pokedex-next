import { getAllPokemonTypes } from "@/api/types";
import { PokemonType } from "@/interfaces/PokeApi/IPokemonApi";
import { TypeRelations } from "@/interfaces/PokeApi/IPokemonTypes";
import { typeRepository } from "./repositories/types.repository";

type PokemonTypeName = PokemonType["type"]["name"];

export interface TypeMultiplier {
    type: PokemonTypeName;
    multiplier: number;
}

export interface TypeEffectiveness {
    weaknesses: TypeMultiplier[];
    resistances: TypeMultiplier[];
    immunes: TypeMultiplier[];
}

export const findAllPokemonType = async () => {
    return await getAllPokemonTypes({});
};

export const findPokemonTypes = async (
    types: PokemonType[],
): Promise<TypeEffectiveness> => {
    const typeRelations: TypeRelations[] = await Promise.all(
        types.map(async ({ type }) => {
            const detail = await typeRepository.getById(type.name);
            return detail.damage_relations;
        }),
    );

    return processTypes(typeRelations);
};

function processTypes(typeRelations: TypeRelations[]): TypeEffectiveness {
    const multipliers: Record<string, number> = {};

    typeRelations.forEach((relation) => {
        // x2 damage
        relation.double_damage_from.forEach(({ name }) => {
            multipliers[name] = (multipliers[name] ?? 1) * 2;
        });

        // x1/2 damage
        relation.half_damage_from.forEach(({ name }) => {
            multipliers[name] = (multipliers[name] ?? 1) * 0.5;
        });

        // x0 damage (immune)
        relation.no_damage_from.forEach(({ name }) => {
            multipliers[name] = 0;
        });
    });

    const result: TypeEffectiveness = {
        weaknesses: [],
        resistances: [],
        immunes: [],
    };

    Object.entries(multipliers).forEach(([type, multiplier]) => {
        const typeName = type as PokemonTypeName;
        if (multiplier === 0) {
            result.immunes.push({ type: typeName, multiplier: 0 });
        } else if (multiplier > 1) {
            result.weaknesses.push({ type: typeName, multiplier });
        } else if (multiplier < 1) {
            result.resistances.push({ type: typeName, multiplier });
        }
    });

    return result;
}
