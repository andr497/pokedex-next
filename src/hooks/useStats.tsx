"use client";
import { calculateStatsPokemon } from "@/helpers/PokemonStatsHelper";
import { StatsPokemon } from "@/interfaces/IPokemonDetails";
import { useMemo } from "react";

interface Props {
    stats: {
        id: number;
        stats_details: StatsPokemon[];
    };
}

const useStats = ({ stats }: Props) => {
    const { id, stats_details } = stats;

    const valueStats = useMemo(() => {
        return calculateStatsPokemon(stats_details, id);
    }, [stats_details, id]);

    return {
        valueStats,
    };
};

export default useStats;
