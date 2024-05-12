import React, { useState } from "react";

import BarStat from "./BarStat";
import { StatsPokemonClean } from "@/helpers/PokemonStatsHelper";

interface Props {
    stats: StatsPokemonClean[][];
}

const ContainerBarStat = ({ stats }: Props) => {
    const [selected, setSelected] = useState<number>(0);
    const handleItemClick = (index: number) => {
        setSelected(index);
    };
    return (
        <div>
            {stats.map((stat, index) => (
                <div
                    key={`stats-bar-${selected}-${index}`}
                    className={`p-4 cursor-pointer ${
                        selected === index ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleItemClick(index)}
                >
                    <span>{index}</span>
                    {selected === index && (
                        <>
                            {stat.map((value) => (
                                <BarStat percentage={value.percentage!} />
                            ))}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ContainerBarStat;
