"use client";
import React, { useEffect, useState } from "react";

import useSWR from "swr";
import { getAllPokemonMovesProcess } from "@/api/moves";
import { CombinePokemonMove } from "@/interfaces/PokeApi/IMoves";
import { MoveLearnMethod, VersionGroup } from "@/interfaces/TableMoveTypes";
import { METHODS, VERSION_GROUP } from "@/helpers/constants";

import Table from "./Table";
import TableRadioFilters from "./TableRadioFilters";

interface Props {
    pokemonId: string | number;
}

const WrapperTable = ({ pokemonId }: Props) => {
    const { data, isLoading } = useSWR(
        `${pokemonId}`,
        getAllPokemonMovesProcess
    );

    const [method, setMethod] = useState<MoveLearnMethod>("level-up");
    const [versionGroup, setVersionGroup] = useState<VersionGroup>("red-blue");
    const [pokemonMoves, setPokemonMoves] = useState<CombinePokemonMove[]>([]);

    useEffect(() => {
        if (typeof data !== "undefined") {
            const { moves: pokemonMoves } = data;
            const filteredMoves = pokemonMoves
                .filter(
                    ({ version_group_details }) =>
                        version_group_details.filter(
                            ({ move_learn_method, version_group }) =>
                                move_learn_method.name === method &&
                                version_group.name === versionGroup
                        ).length > 0
                )
                .sort((a, b) => {
                    return a.version_group_details[0].level_learned_at <
                        b.version_group_details[0].level_learned_at
                        ? -1
                        : a.version_group_details[0].level_learned_at >
                          b.version_group_details[0].level_learned_at
                        ? 1
                        : 0;
                });

            setPokemonMoves(filteredMoves);
        }
    }, [method, versionGroup, data]);

    return (
        <section className="max-w-sm">
            <TableRadioFilters
                arrayFilters={METHODS}
                filterState={method}
                setFilterState={setMethod}
            />
            <Table
                isLoading={isLoading}
                moves={pokemonMoves}
                method={method}
                game={versionGroup}
            />

            <TableRadioFilters
                arrayFilters={VERSION_GROUP}
                filterState={versionGroup}
                setFilterState={setVersionGroup}
            />
        </section>
    );
};

export default WrapperTable;
