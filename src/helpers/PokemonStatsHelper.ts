import { StatsPokemon } from "interfaces/IPokemonDetails";
import { fixPokemonName } from "./pokemonHelpers";

export interface StatsPokemonClean {
    base_stat: number;
    effort: number;
    name: string;
    percentage?: number;
}

export interface StatsPokemonCalculated {
    base: StatsPokemonClean[],
    min: StatsPokemonClean[],
    max: StatsPokemonClean[],
}

type minmax = "MAX" | "MIN";
const SHEDINJA_ID = 292;

const maxValueArrObject = (arr: StatsPokemonClean[]): StatsPokemonClean => {
    const max = arr.reduce((prev, current) => {
        return prev.base_stat > current.base_stat ? prev : current;
    });

    return max;
};

const processStatsPokemonObject = (stats: StatsPokemon[]) => {
    let cleanArray: StatsPokemonClean[] = [];

    stats.forEach((value, key) => {
        cleanArray.push({
            base_stat: value.base_stat,
            effort: value.effort,
            name: fixPokemonName(value.stat.name),
        });
    });

    const max = maxValueArrObject(cleanArray);
    calculatePercentageStats(max, cleanArray);

    return cleanArray;
};

const calculatePercentageStats = (
    max: StatsPokemonClean,
    arr: StatsPokemonClean[],
    minmax?: minmax
) => {

    let MAX_STAT: number = minmax === "MAX" ? 903 : minmax === "MIN" ? 620 : 255;

    arr.forEach((v) => {
        v.percentage = (v.base_stat * 100) / max.base_stat;
        //v.percentage = (v.base_stat * 100) / MAX_STAT;
    });
};

const calculateMAXMINStats = (
    stats: StatsPokemonClean[],
    id: number,
    minmax: minmax = "MAX"
) => {
    let MAX_IV = 0;
    let MAX_EV = 0;
    let NATURE = 0.9;

    if (minmax === "MAX") {
        MAX_IV = 31;
        MAX_EV = 252;
        NATURE = 1.1
    }

    let newStats: StatsPokemonClean[] = [];

    stats.forEach((stat) => {
        let valor = 0;
        if (stat.name === "hp") {
            valor =
                id === SHEDINJA_ID
                    ? 1
                    : (((2 * stat.base_stat + MAX_IV + (MAX_EV / 4)) * 100) / 100) + 100 + 10;
        } else {
            valor = Math.floor(((((2 * stat.base_stat + MAX_IV + (MAX_EV / 4)) * 100) / 100) + 5) * NATURE)
            // valor = Math.floor(
            //     Math.floor(
            //         ((2 * stat.base_stat + MAX_IV + MAX_EV) * 100) / 100 + 5
            //     ) * 1.1
            // );
        }

        newStats.push({
            ...stat,
            base_stat: valor,
        });
    });

    const max = maxValueArrObject(newStats);
    calculatePercentageStats(max, newStats, minmax);

    return newStats;
};

export function calculateStatsPokemon(stats: StatsPokemon[], id: number): StatsPokemonCalculated {
    let cleanStats = processStatsPokemonObject(stats);

    let maxStats = calculateMAXMINStats(cleanStats, id);

    let minStats = calculateMAXMINStats(cleanStats, id, "MIN");

    return {
        base: cleanStats,
        min: minStats,
        max: maxStats,
    };
}
