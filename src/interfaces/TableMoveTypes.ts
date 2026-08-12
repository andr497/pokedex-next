export type ValueLabel<T = string> = {
    value: T;
    label: string;
};

export type MoveLearnMethod = "level-up" | "machine" | "egg" | "tutor";

export type VersionGroup =
    | "red-blue"
    | "yellow"
    | "gold-silver"
    | "crystal"
    | "ruby-sapphire"
    | "emerald"
    | "firered-leafgreen"
    | "diamond-pearl"
    | "platinum"
    | "heartgold-soulsilver"
    | "black-white"
    | "colosseum"
    | "xd"
    | "black-2-white-2"
    | "x-y"
    | "omega-ruby-alpha-sapphire"
    | "sun-moon"
    | "ultra-sun-ultra-moon"
    | "lets-go-pikachu-lets-go-eevee"
    | "sword-shield"
    | "the-isle-of-armor"
    | "the-crown-tundra"
    | "brilliant-diamond-shining-pearl"
    | "legends-arceus"
    | "scarlet-violet"
    | "the-teal-mask"
    | "the-indigo-disk"
    | "red-green-japan"
    | "blue-japan"
    | "legends-za"
    | "mega-dimension"
    | "champions";
