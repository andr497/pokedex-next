"use client"
import {
    calculateStatsPokemon,
    StatsNamesCombine
} from "@/helpers/PokemonStatsHelper";
import { StatsPokemon } from "@/interfaces/IPokemonDetails";
import { useEffect, useState } from "react";

const initialValueStatsState = {
    hp: [],
    attack: [],
    defense: [],
    speed: [],
    "special-attack": [],
    "special-defense": [],
};

interface Props {
    stats: {
        id: number;
        stats_details: StatsPokemon[];
    };
}

const useStats = ({ stats }: Props) => {
    const [valueStats, setValueStats] = useState<StatsNamesCombine>(
        initialValueStatsState
    );

    useEffect(() => {
        const { id, stats_details } = stats;
        const statsCalculated = calculateStatsPokemon(stats_details, id);

        setValueStats(statsCalculated);
    }, [stats]);

    return {
        valueStats,
    };
};

export default useStats;
