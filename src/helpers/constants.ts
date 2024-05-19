import {
    MoveLearnMethod,
    ValueLabel,
    VersionGroup,
} from "@/interfaces/TableMoveTypes";

export const COLOR = {
    normal: "#A8A77A",
    fighting: "#C22E28",
    flying: "#A98FF3",
    poison: "#A33EA1",
    ground: "#E2BF65",
    rock: "#B6A136",
    bug: "#A6B91A",
    ghost: "#735797",
    steel: "#B7B7CE",
    fire: "#EE8130",
    water: "#6390F0",
    grass: "#7AC74C",
    electric: "#F7D02C",
    psychic: "#F95587",
    ice: "#96D9D6",
    dragon: "#6F35FC",
    dark: "#705746",
    fairy: "#D685AD",
};

export const GENERATION_HOVER_COLORS = {
    "generation-i": ["hover:from-[#FF0000]", "hover:to-[#0000FF]"],
    "generation-ii": ["hover:from-[#d2c21a]", "hover:to-[#a0a0a0]"],
    "generation-iii": ["hover:from-[#b80000]", "hover:to-[#0d00b8]"],
    "generation-iv": ["hover:from-[#6077ff]", "hover:to-[#fc72e4]"],
    "generation-v": ["hover:from-[#424242]", "hover:to-[#f2f2f2]"],
    "generation-vi": ["hover:from-[#0084c3]", "hover:to-[#8f0305]"],
    "generation-vii": ["hover:from-[#ffa500]", "hover:to-[#b401ff]"],
    "generation-viii": ["hover:from-[#00a2ed]", "hover:to-[#ff0060]"],
    "generation-ix": ["hover:from-[#bb171f]", "hover:to-[#731f92]"],
};

export const VERSION_GROUP_ARRAY = [
    "red-blue",
    "yellow",
    "gold-silver",
    "crystal",
    "ruby-sapphire",
    "emerald",
    "firered-leafgreen",
    "diamond-pearl",
    "platinum",
    "heartgold-soulsilver",
    "black-white",
    "colosseum",
    "xd",
    "black-2-white-2",
    "x-y",
    "omega-ruby-alpha-sapphire",
    "sun-moon",
    "ultra-sun-ultra-moon",
    "lets-go-pikachu-lets-go-eevee",
    "sword-shield",
    "the-isle-of-armor",
    "the-crown-tundra",
    "brilliant-diamond-and-shining-pearl",
    "legends-arceus",
    "scarlet-violet",
    "the-teal-mask",
];

export const MOVES_METHODS_ARRAY = ["level-up", "machine", "egg", "tutor"];

export const METHODS: ValueLabel<MoveLearnMethod>[] = [
    { value: "level-up", label: "Level Up" },
    { value: "machine", label: "Machine" },
    { value: "egg", label: "Egg" },
    { value: "tutor", label: "Tutor" },
];

export const VERSION_GROUP: ValueLabel<VersionGroup>[] = [
    { value: "red-blue", label: "R/B" },
    { value: "yellow", label: "Y" },
    { value: "gold-silver", label: "G/S" },
    { value: "crystal", label: "C" },
    { value: "ruby-sapphire", label: "R/S" },
    { value: "emerald", label: "E" },
    { value: "firered-leafgreen", label: "FR/LG" },
    { value: "diamond-pearl", label: "D/P" },
    { value: "platinum", label: "P" },
    { value: "heartgold-soulsilver", label: "HG/SS" },
    { value: "black-white", label: "B/W" },
    { value: "black-2-white-2", label: "B2/W2" },
    { value: "x-y", label: "X/Y" },
    { value: "omega-ruby-alpha-sapphire", label: "OR/AS" },
    { value: "sun-moon", label: "S/M" },
    { value: "ultra-sun-ultra-moon", label: "US/UM" },
    { value: "lets-go-pikachu-lets-go-eevee", label: "LGP/LGE" },
    { value: "sword-shield", label: "S/S" },
    { value: "brilliant-diamond-and-shining-pearl", label: "BP/SP" },
    { value: "legends-arceus", label: "LA" },
    { value: "scarlet-violet", label: "S/V" },
];

export const ARTWORK_BASE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
export const IMAGE_ITEM_BASE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/";
export const SPRITE_BASE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const LIMIT_PAGE = 1500;
export const OFFSET_PAGE = 0;

export const TOTAL_POKEMON = 1025;
