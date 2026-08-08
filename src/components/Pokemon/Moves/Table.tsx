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

const Table = ({ moves, isLoading = false, method, game }: TableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="sticky top-0">
                    <tr className="bg-border/80 border-b border-border">
                        <th
                            scope="col"
                            className="p-2.5 text-muted text-xs font-bold uppercase tracking-wider w-16"
                        >
                            LVL
                        </th>
                        <th
                            scope="col"
                            className="p-2.5 text-muted text-xs font-bold uppercase tracking-wider"
                        >
                            Move
                        </th>
                        <th
                            scope="col"
                            className="p-2.5 text-muted text-xs font-bold uppercase tracking-wider"
                        >
                            Type
                        </th>
                        <th
                            scope="col"
                            className="p-2.5 text-muted text-xs font-bold uppercase tracking-wider"
                        >
                            Cat.
                        </th>
                        <th
                            scope="col"
                            className="p-2.5 text-muted text-xs font-bold uppercase tracking-wider"
                        >
                            Pwr.
                        </th>

                        <th
                            scope="col"
                            className="p-2.5 text-muted text-xs font-bold uppercase tracking-wider"
                        >
                            Acc.
                        </th>
                        <th
                            scope="col"
                            className="p-2.5 text-muted text-xs font-bold uppercase tracking-wider"
                        >
                            PP
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                    {isLoading ? (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td
                                colSpan={100}
                                className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                                key={`tr-move-${move.name}`}
                            />
                        ))
                    ) : (
                        <tr className="h-40 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td
                                colSpan={100}
                                className="px-4 py-3 text-center text-muted font-extrabold whitespace-nowrap"
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
