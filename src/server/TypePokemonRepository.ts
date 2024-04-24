import { getAllPokemonTypes, getTypeDetail } from "api/types";
import { PokemonType } from "interfaces/PokeApi/IPokemonApi";
import { TypeDetail, TypeRelations, TypeDefenses } from "interfaces/PokeApi/IPokemonTypes";

export const findAllPokemonType = async () => {
    const types = await getAllPokemonTypes();

    return types;
};

export const findPokemonTypes = async (
    types: PokemonType[]
): Promise<TypeDefenses> => {
    try {
        const typeDetails: TypeRelations[] = await Promise.all(
            types.map(async ({ type }) => {
                let pokemonTypes: TypeDetail = await getTypeDetail(
                    type.name
                ).then((res) => res);
                return pokemonTypes.damage_relations;
            })
        );

        return _processTypes(typeDetails);
    } catch (error) {
        return [];
    }
};

function _processTypes(typeDetails: TypeRelations[]): TypeDefenses {
    let typeDefenses: TypeDefenses = {
        very_weak: [],
        weak: [],
        normal: [],
        resistant: [],
        very_resistant: [],
        immune: [],
    };

    typeDetails.forEach((typeDetail) => {
        typeDetail.double_damage_from.forEach((type) => {
            typeDefenses.weak.push(type.name);
        });

        typeDetail.half_damage_from.forEach((type) => {
            typeDefenses.resistant.push(type.name);
        });

        typeDetail.no_damage_from.forEach((type) => {
            typeDefenses.immune.push(type.name);
        });
    });

    //Primero filtramos de weak los tipos inmunes
    typeDefenses.weak = typeDefenses.weak.filter(value => !typeDefenses.immune.includes(value))
    typeDefenses.resistant = typeDefenses.resistant.filter(value => !typeDefenses.immune.includes(value))

    let normalTypes = typeDefenses.weak.filter((value) => typeDefenses.resistant.includes(value));
    
    typeDefenses.weak = typeDefenses.weak.filter((value) => !normalTypes.includes(value))
    typeDefenses.resistant = typeDefenses.resistant.filter((value) => !normalTypes.includes(value))

    let tempWeak: string[] = Object.keys(findDuplicateElements(typeDefenses.weak))
    typeDefenses.weak = typeDefenses.weak.filter((value) => !tempWeak.includes(value))
    typeDefenses.very_weak.push(...tempWeak);

    typeDefenses.resistant = typeDefenses.resistant.filter((value) => !typeDefenses.weak.includes(value))

    let tempResistant: string[] = Object.keys(findDuplicateElements(typeDefenses.resistant))
    typeDefenses.resistant = typeDefenses.resistant.filter((value) => !tempResistant.includes(value))
    typeDefenses.very_resistant.push(...tempResistant)

    return typeDefenses;
}

function findDuplicateElements(arr: string[]): { [key: string]: number } {
    // Object to store the frequency of each element
    const frequency: { [key: string]: number } = {};

    // Iterate over the array and count the frequency of each element
    arr.forEach((element) => {
        if (frequency[element] === undefined) {
            frequency[element] = 1;
        } else {
            frequency[element]++;
        }
    });

    // Filter only the elements that have a frequency greater than 1
    const duplicateElements: string[] = Object.keys(frequency).filter(
        (element) => frequency[element] > 1
    );

    // Create an object showing the count for each duplicate element
    const result: { [key: string]: number } = {};
    duplicateElements.forEach((element) => {
        result[element] = frequency[element];
    });

    return result;
}
