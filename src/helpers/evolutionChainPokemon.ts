import { IPokemonEvolutionChain } from "interfaces/IGeneral";
import { ARTWORK_BASE_URL } from "./constants";
import { GeneralInfoPokemon } from "interfaces/IPokemonDetails";

interface NodeWithPath<T> {
    node: T;
    path: T[];
}

type GetChildrenFunction<T> = (node: T) => T[] | undefined;

const depthFirst =
    <T>(getChildren: GetChildrenFunction<T>) =>
    (tree: T, path: T[] = []): NodeWithPath<T>[] =>
        [
            { node: tree, path },
            ...(getChildren(tree) || []).flatMap((node) =>
                depthFirst(getChildren)(node, [...path, tree])
            ),
        ];

export interface IEvolutionChain {
    id: number;
    baby_trigger_item?: null;
    chain: ChainLink;
    types: GeneralInfoPokemon["types"];
}

interface ChainLink {
    evolution_details: IEvolutionDetails[];
    is_baby: boolean;
    species: {
        name: string;
        url: string;
    };
    evolves_to?: ChainLink[];
}

type BaseType = { name: string } | null;

interface IEvolutionDetails {
    min_level?: number;
    trigger?: BaseType;
    item?: BaseType;
    held_item?: BaseType;
    known_move?: BaseType;
    known_move_type: BaseType;
    min_affection?: number;
    min_beauty?: number;
    min_happiness?: number;
    needs_overworld_rain: boolean;
    party_species?: BaseType;
    party_type?: BaseType;
    time_of_day: "day" | "night" | "";
    trade_species?: BaseType;
    location?: BaseType;
    turn_upside_down: boolean;
    relative_physical_stats?: number;
    gender?: number;
}

export const processEvolutionChain = (
    pokemon_evolution: IEvolutionChain
): IPokemonEvolutionChain[][] => {
    return Object.values(
        depthFirst((node: ChainLink) => {
            return node.evolves_to;
        })(pokemon_evolution.chain, [])
            .map(({ node, path }) => {
                return { node, depth: path.length };
            })
            .reduce((a, { node, depth }) => {
                let pokemonID = node.species.url.split("/")[6];
                let urlArtWork = ARTWORK_BASE_URL;
                let evo_details = node.evolution_details[0];

                return {
                    ...a,
                    [depth]: [
                        // @ts-ignore
                        ...(a[depth] || []),
                        {
                            id: pokemonID,
                            species_name: node.species.name,

                            min_level: evo_details?.min_level ?? null,
                            trigger_name: evo_details?.trigger?.name ?? null,

                            item: evo_details?.item?.name ?? null,
                            held_item: evo_details?.held_item?.name ?? null,

                            known_move: evo_details?.known_move?.name ?? null,
                            known_move_type:
                                evo_details?.known_move_type?.name ?? null,

                            min_affection: evo_details?.min_affection ?? null,
                            min_beauty: evo_details?.min_beauty ?? null,
                            min_happiness: evo_details?.min_happiness ?? null,

                            needs_overworld_rain:
                                evo_details?.needs_overworld_rain ?? null,
                            party_species:
                                evo_details?.party_species?.name ?? null,
                            party_type: evo_details?.party_type?.name ?? null,
                            time_of_day: evo_details?.time_of_day ?? null,
                            trade_species:
                                evo_details?.trade_species?.name ?? null,
                            location: evo_details?.location?.name ?? null,
                            turn_upside_down:
                                evo_details?.turn_upside_down ?? null,

                            relative_physical_stats:
                                evo_details?.relative_physical_stats ?? null,

                            gender: evo_details?.gender ?? null,
                            url: node.species.url,

                            image: urlArtWork + pokemonID + ".png",
                        },
                    ],
                };
            }, {})
    );
};

export const fixTriggerName = (name: string) => {
    if (!name) return "";

    if (name === "shed") {
        return "level up 20 \n with empty PokéBall and \n an open slot in party";
    }

    return name.replace("-", " ");
};

export const fixGenderText = (gender: number) => {
    if (!gender) return null;

    let fullName = gender === 1 ? "♀️" : "‍♂️";

    return "Only " + fullName;
};

export const fixEvolutionMethod = ({
    min_level,
    min_happiness,
    min_affection,
    min_beauty,
    trigger_name,
    item,
    held_item,
    relative_physical_stats,
    known_move,
    known_move_type,
    time_of_day,
    location,
    needs_overworld_rain,
    turn_upside_down,
    trade_species,
    party_species
}: IPokemonEvolutionChain) => {
    let fixTrigger = fixTriggerName(trigger_name);
    let minLevelArray = Object.entries({
        min_level,
        min_happiness,
        min_affection,
        min_beauty,
    }).filter(([, v]) => v !== null);

    const textLevel =
        minLevelArray.length === 1
            ? minLevelArray[0][0] === "min_level"
                ? minLevelArray[0][1]
                : `${minLevelArray[0][1]} of ${minLevelArray[0][0].replace(
                      "min_",
                      ""
                  )}`
            : "";

    const fixItem =
        item !== null
            ? ` ${item.replace("-", " ")}`
            : held_item !== null
            ? ` holding ${held_item.replace("-", " ")}`
            : "";

    //Data to show if

    const moreDetails = [
        relative_physical_stats === 0
            ? "Attack = Defense"
            : relative_physical_stats === 1
            ? "Attack > Defense"
            : relative_physical_stats === -1
            ? "Attack < Defense"
            : null,
        known_move && `knowing ${known_move}`,
        known_move_type && `knowing a ${known_move_type} move`,
        time_of_day && `at ${time_of_day} time`,
        location && `at ${location}`,
        needs_overworld_rain && "during rain",
        turn_upside_down && "holding the console upside down",
        trade_species && `with ${trade_species}`,
        party_species && `with ${party_species} in party`,
    ]
        .filter(Boolean)
        .join("\n");

    return `${fixTrigger}${fixItem} ${textLevel}${
        moreDetails ? "\n" + moreDetails : ""
    }`;
};
