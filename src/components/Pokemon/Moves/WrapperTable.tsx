"use client";
import { useEffect, useState } from "react";

import useSWR from "swr";
import { getAllPokemonMovesProcess } from "@/api/moves";
import { CombinePokemonMove } from "@/interfaces/PokeApi/IMoves";
import { MoveLearnMethod, VersionGroup } from "@/interfaces/TableMoveTypes";

import Table from "./Table";
import TableFilters from "./TableFilters";

interface Props {
    pokemonId: string | number;
}

const WrapperTable = ({ pokemonId }: Props) => {
    const [method, setMethod] = useState<MoveLearnMethod>("level-up");
    const [versionGroup, setVersionGroup] = useState<VersionGroup>("");
    const [pokemonMoves, setPokemonMoves] = useState<CombinePokemonMove[]>([]);

    const { data, isLoading } = useSWR(
        { id: `${pokemonId}`, params: { versionGroup, learnMethod: method } },
        getAllPokemonMovesProcess,
    );
    useEffect(() => {
        if (typeof data !== "undefined") {
            (async () => {
                const { moves } = data;

                setPokemonMoves(moves);
            })();
        }
    }, [method, versionGroup, data]);

    return (
        <section className="w-full">
            <TableFilters
                method={method}
                setMethod={setMethod}
                versionGroup={versionGroup}
                setVersionGroup={setVersionGroup}
            />

            <Table
                isLoading={isLoading}
                moves={pokemonMoves}
                method={method}
                game={versionGroup}
            />
        </section>
    );
};

export default WrapperTable;
