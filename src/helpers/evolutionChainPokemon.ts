import { IPokemonEvolutionChain } from "@/interfaces/IGeneral";
import { ARTWORK_BASE_URL, IMAGE_ITEM_BASE_URL } from "./constants";
import { GeneralInfoPokemon } from "@/interfaces/IPokemonDetails";

interface NodeWithPath<T> {
    node: T;
    path: T[];
}

type GetChildrenFunction<T> = (node: T) => T[] | undefined;

const depthFirst =
    <T>(getChildren: GetChildrenFunction<T>) =>
    (tree: T, path: T[] = []): NodeWithPath<T>[] => [
        { node: tree, path },
        ...(getChildren(tree) || []).flatMap((node) =>
            depthFirst(getChildren)(node, [...path, tree]),
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
    is_default: boolean;
    min_level?: number;
    trigger?: BaseType;
    item?: BaseType;
    held_item?: BaseType;
    known_move?: BaseType;
    known_move_type: BaseType;
    min_affection?: number;
    min_beauty?: number;
    min_happiness?: number;
    min_steps?: number;
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
    pokemon_evolution: IEvolutionChain,
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
                            min_steps: evo_details?.min_steps ?? null,

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
            }, {}),
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

export const fixEvolutionMethod = (evolutionChain: IPokemonEvolutionChain) => {
    const {
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
        party_species,
        party_type,
        min_steps,
    } = evolutionChain;
    let fixTrigger = fixTriggerName(trigger_name);
    const formatMinValue: Record<string, (value: number) => string> = {
        min_level: (value) => `level ${value}`,
        min_steps: (value) => `after ${value} steps`,
        min_happiness: (value) => `when happiness reaches ${value}`,
        min_affection: (value) => `when affection reaches ${value}`,
        min_beauty: (value) => `when beauty reaches ${value}`,
    };

    const minLevelArray = Object.entries({
        min_level,
        min_happiness,
        min_affection,
        min_beauty,
        min_steps,
    }).filter(([, value]) => value !== null);

    const textLevel =
        minLevelArray.length === 1
            ? (formatMinValue[minLevelArray[0][0]]?.(minLevelArray[0][1]) ?? "")
            : "";

    const fixItem = item
        ? ` ${item.replace("-", " ")}`
        : held_item
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
        party_type && `with pokemon ${party_type} type in party`,
    ]
        .filter(Boolean)
        .join("\n");

    return `${fixTrigger}${fixItem} ${textLevel}${
        moreDetails ? "\n" + moreDetails : ""
    }`;
};

export interface TreeEvolutionNode {
    id: number;
    species_name: string;
    image: string;
    evolution_method: string;
    item_name: string | null;
    item_image: string | null;
    children: TreeEvolutionNode[];
}

export const fixEvolutionNode = (node: ChainLink): TreeEvolutionNode => {
    const pokemonID = Number(node?.species?.url.split("/")[6]);
    const evoDetails = node.evolution_details?.filter(
        (ed) => ed.is_default,
    )?.[0];
    const itemName =
        evoDetails?.item?.name ?? evoDetails?.held_item?.name ?? null;

    return {
        id: pokemonID,
        species_name: node.species.name,
        image: ARTWORK_BASE_URL + pokemonID + ".png",
        item_name: itemName,
        item_image: itemName ? IMAGE_ITEM_BASE_URL + itemName + ".png" : null,
        evolution_method: evoDetails
            ? fixEvolutionMethod({
                  ...evoDetails,
                  trigger_name: evoDetails.trigger?.name ?? null,
                  min_level: evoDetails?.min_level ?? null,

                  item: evoDetails?.item?.name ?? null,
                  held_item: evoDetails?.held_item?.name ?? null,

                  known_move: evoDetails?.known_move?.name ?? null,
                  known_move_type: evoDetails?.known_move_type?.name ?? null,

                  min_affection: evoDetails?.min_affection ?? null,
                  min_beauty: evoDetails?.min_beauty ?? null,
                  min_happiness: evoDetails?.min_happiness ?? null,

                  needs_overworld_rain:
                      evoDetails?.needs_overworld_rain ?? null,
                  party_species: evoDetails?.party_species?.name ?? null,
                  party_type: evoDetails?.party_type?.name ?? null,
                  time_of_day: evoDetails?.time_of_day ?? null,
                  trade_species: evoDetails?.trade_species?.name ?? null,
                  location: evoDetails?.location?.name ?? null,
                  turn_upside_down: evoDetails?.turn_upside_down ?? null,

                  relative_physical_stats:
                      evoDetails?.relative_physical_stats ?? null,

                  gender: evoDetails?.gender ?? null,
              } as any)
            : "Not available",
        children: (node.evolves_to || []).map(fixEvolutionNode),
    };
};
