import { calculateStatsPokemon, StatsPokemonCalculated } from "@/helpers/PokemonStatsHelper";
import { StatsPokemon } from "@/interfaces/IPokemonDetails";
import React, { useEffect, useState } from "react";

const initialValueStatsState = {
    base: [],
    min: [],
    max: [],
};

interface Props {
    stats: {
        id: number;
        stats_details: StatsPokemon[];
    };
}

const useStats = ({ stats }: Props) => {
    const [valueStats, setValueStats] = useState<StatsPokemonCalculated>(
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
