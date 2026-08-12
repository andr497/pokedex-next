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
    "generation-i": ["group-hover:from-[#FF0000]", "group-hover:to-[#0000FF]"],
    "generation-ii": ["group-hover:from-[#d2c21a]", "group-hover:to-[#a0a0a0]"],
    "generation-iii": [
        "group-hover:from-[#b80000]",
        "group-hover:to-[#0d00b8]",
    ],
    "generation-iv": ["group-hover:from-[#6077ff]", "group-hover:to-[#fc72e4]"],
    "generation-v": ["group-hover:from-[#424242]", "group-hover:to-[#f2f2f2]"],
    "generation-vi": ["group-hover:from-[#0084c3]", "group-hover:to-[#8f0305]"],
    "generation-vii": [
        "group-hover:from-[#ffa500]",
        "group-hover:to-[#b401ff]",
    ],
    "generation-viii": [
        "group-hover:from-[#00a2ed]",
        "group-hover:to-[#ff0060]",
    ],
    "generation-ix": ["group-hover:from-[#bb171f]", "group-hover:to-[#731f92]"],
};

export const METHODS: ValueLabel<MoveLearnMethod>[] = [
    { value: "level-up", label: "Level Up" },
    { value: "machine", label: "Machine" },
    { value: "egg", label: "Egg" },
    { value: "tutor", label: "Tutor" },
];

export const VERSION_GROUP: ValueLabel<VersionGroup>[] = [
    { value: "red-blue", label: "Red / Blue" },
    { value: "yellow", label: "Yellow" },
    { value: "gold-silver", label: "Gold / Silver" },
    { value: "crystal", label: "Crystal" },
    { value: "ruby-sapphire", label: "Ruby / Sapphire" },
    { value: "emerald", label: "Emerald" },
    { value: "firered-leafgreen", label: "FireRed / LeafGreen" },
    { value: "diamond-pearl", label: "Diamond / Pearl" },
    { value: "platinum", label: "Platinum" },
    { value: "heartgold-soulsilver", label: "HeartGold / SoulSilver" },
    { value: "black-white", label: "Black / White" },
    { value: "colosseum", label: "Colosseum" },
    { value: "xd", label: "XD" },
    { value: "black-2-white-2", label: "Black 2 / White 2" },
    { value: "x-y", label: "X / Y" },
    {
        value: "omega-ruby-alpha-sapphire",
        label: "Omega Ruby / Alpha Sapphire",
    },
    { value: "sun-moon", label: "Sun / Moon" },
    { value: "ultra-sun-ultra-moon", label: "Ultra Sun / Ultra Moon" },
    {
        value: "lets-go-pikachu-lets-go-eevee",
        label: "Let's Go Pikachu / Let's Go Eevee",
    },
    { value: "sword-shield", label: "Sword / Shield" },
    { value: "the-isle-of-armor", label: "The Isle of Armor" },
    { value: "the-crown-tundra", label: "The Crown Tundra" },
    {
        value: "brilliant-diamond-shining-pearl",
        label: "Brilliant Diamond / Shining Pearl",
    },
    { value: "legends-arceus", label: "Legends: Arceus" },
    { value: "scarlet-violet", label: "Scarlet / Violet" },
    { value: "the-teal-mask", label: "The Teal Mask" },
    { value: "the-indigo-disk", label: "The Indigo Disk" },
    { value: "red-green-japan", label: "Red / Green (Japan)" },
    { value: "blue-japan", label: "Blue (Japan)" },
    { value: "legends-za", label: "Legends: Z-A" },
    { value: "mega-dimension", label: "Mega Dimension" },
    { value: "champions", label: "Champions" },
];

export const ARTWORK_BASE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
export const IMAGE_ITEM_BASE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/";
export const SPRITE_BASE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const TOTAL_POKEMON = 1025;
