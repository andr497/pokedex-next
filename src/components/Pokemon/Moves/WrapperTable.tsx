"use client";
import { useState } from "react";

import useSWR from "swr";
import { getAllPokemonMovesProcess } from "@/api/moves";
import { MoveLearnMethod } from "@/interfaces/TableMoveTypes";

import Table from "./Table";
import TableFilters from "./TableFilters";

interface Props {
    pokemonId: string | number;
}

const WrapperTable = ({ pokemonId }: Props) => {
    const [method, setMethod] = useState<MoveLearnMethod>("level-up");
    const [versionGroup, setVersionGroup] = useState<string>("");

    const { data, isLoading } = useSWR(
        { id: `${pokemonId}`, params: { versionGroup, learnMethod: method } },
        getAllPokemonMovesProcess,
    );

    return (
        <section className="w-full">
            <TableFilters
                method={method}
                setMethod={setMethod}
                versionGroup={versionGroup}
                setVersionGroup={setVersionGroup}
            />

            <Table isLoading={isLoading} moves={data?.moves ?? []} />
        </section>
    );
};

export default WrapperTable;