import { Pokemon } from "interfaces/PokeApi/IPokemonApi";
import { COLOR } from "./constants";

export function colorPokemonTypes(types: Pick<Pokemon, "types">): {
    colorType1: string;
    colorType2: string;
} {
    if (types.types.length === 0) {
        return {
            colorType1: "",
            colorType2: "",
        };
    }
    return {
        colorType1: COLOR[types.types[0].type.name],
        colorType2:
            COLOR[types.types[1]?.type.name] == undefined
                ? COLOR[types.types[0].type.name]
                : COLOR[types.types[1].type.name],
    };
}

export function fixPokemonName(name: string): string {
    const excludeNamesToSplit = ["ho-oh", "jangmo-o", "hakamo-o", "kommo-o"];

    if (excludeNamesToSplit.includes(name)) {
        return name;
    }

    if (name.includes("nidoran-")) {
        const [nidoranName, gender] = name.split("-");
        return gender === "f" ? `${nidoranName} ♀️` : `${nidoranName} ‍♂️`;
    }

    /* Excepciones de nombres */
    if (name === "type-null") {
        return name.replace("-", ": ");
    }

    if (name.startsWith("mr-")) {
        return name.replace("-", ". ");
    }

    if (name.endsWith("-jr")) {
        return name.replace("-", " ") + ".";
    }
    /* Excepciones de nombres */

    return name.replace("-", " ");
}

export function fixVarietiesName(name: string, is_default: boolean): string {
    if (name.includes("-")) {
        let [, ...nameToReturn] = name.split("-");
        if (is_default) {
            return name.replaceAll("-", " ");
        }
        return nameToReturn.join(" ");
    }

    return name;
}
export function fixAbilitiesName(name: string): string {
    return name.replaceAll("-", " ");
}

export function fixVersionGroupName(name: string): string {
    const splittedName = name.split("-");
    if (name === "xd") {
        return "XD";
    }
    if (splittedName.length === 4 && !["the-isle-of-armor"].includes(name)) {
        return `${splittedName[0]} ${splittedName[1]}/${splittedName[2]} ${splittedName[3]}`;
    }
    if (name === "lets-go-pikachu-lets-go-eevee") {
        const lgp = `${splittedName[0]} ${splittedName[1]} ${splittedName[2]}`;
        const lge = `${splittedName[3]} ${splittedName[4]} ${splittedName[5]}`;
        return `${lgp}/${lge}`;
    }

    if (["legend-arceus", "the-crown-tundra", "the-teal-mask", "the-isle-of-armor"].includes(name)) {
        return name.replaceAll("-", " ");
    }

    if (name === "brilliant-diamond-and-shining-pearl") {
        return name.replaceAll("-", " ").replaceAll(" and ", "/");
    }

    return name.replaceAll("-", "/");
}

export function checkBrightness(color: string): boolean {
    const hex = color.replace("#", "");
    const red = parseInt(hex.substr(0, 2), 16);
    const green = parseInt(hex.substr(2, 2), 16);
    const blue = parseInt(hex.substr(4, 2), 16);
    const brightness = red * 0.299 + green * 0.587 + blue * 0.114;

    return brightness < 155;
}
