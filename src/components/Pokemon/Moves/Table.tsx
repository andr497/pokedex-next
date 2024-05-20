"use client";
import React from "react";

import { CombinePokemonMove } from "@/interfaces/PokeApi/IMoves";
import { MoveLearnMethod, VersionGroup } from "@/interfaces/TableMoveTypes";

import TableRow from "./TableRow";

interface TableProps {
    moves: CombinePokemonMove[];
    isLoading?: boolean;
    method: MoveLearnMethod;
    game: VersionGroup;
}

const Table = ({
    moves,
    isLoading = false,
    method,
    game,
}: TableProps) => {
    return (
        <div className="table-container overflow-x-auto rounded max-h-[330px] min-h-[330px] w-full">
            <table className="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="sticky top-0 px-6 py-3">
                            Level
                        </th>
                        <th scope="col" className="sticky top-0 px-6 py-3">
                            Move
                        </th>
                        <th
                            scope="col"
                            className="sticky top-0 px-6 py-3 text-center"
                        >
                            Type
                        </th>
                        <th scope="col" className="sticky top-0 px-6 py-3">
                            Power
                        </th>
                        <th scope="col" className="sticky top-0 px-6 py-3">
                            PP
                        </th>
                    </tr>
                </thead>
                <tbody className="scrollable-body max-h-[340px] overflow-y-auto">
                    {isLoading ? (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td
                                colSpan={100}
                                className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                Loading...
                            </td>
                        </tr>
                    ) : moves.length > 0 ? (
                        moves.map((move) => (
                            <TableRow
                                game={game}
                                method={method}
                                pokemonMove={move}
                                key={`tr-move-${move.move.name}`}
                            />
                        ))
                    ) : (
                        <tr className="h-[290px] bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td
                                colSpan={100}
                                className="px-6 py-4 text-center text-muted font-extrabold text-gray-900 whitespace-nowrap"
                            >
                                No set moves
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
