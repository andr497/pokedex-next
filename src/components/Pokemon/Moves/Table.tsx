"use client";

import { CombinePokemonMove } from "@/interfaces/PokeApi/IMoves";

import TableRow from "./TableRow";

interface TableProps {
    moves: CombinePokemonMove[];
    isLoading?: boolean;
}

const COLUMNS = ["LVL", "Move", "Type", "Cat.", "Pwr.", "Acc.", "PP"];

const SkeletonRow = () => (
    <tr className="animate-pulse">
        {Array.from({ length: COLUMNS.length }).map((_, i) => (
            <td key={`sk-${i}`} className="p-3">
                <div className="h-4 rounded bg-border/60" />
            </td>
        ))}
    </tr>
);

const Table = ({ moves, isLoading = false }: TableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="sticky top-0">
                    <tr className="bg-surface border-b border-border">
                        {COLUMNS.map((column) => (
                            <th
                                key={`th-${column}`}
                                scope="col"
                                className="p-3 text-muted text-xs font-bold uppercase tracking-wider first:w-16"
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                    {isLoading ? (
                        <>
                            <SkeletonRow />
                            <SkeletonRow />
                            <SkeletonRow />
                        </>
                    ) : moves.length > 0 ? (
                        moves.map((move) => (
                            <TableRow
                                pokemonMove={move}
                                key={`tr-move-${move.name}`}
                            />
                        ))
                    ) : (
                        <tr className="bg-surface">
                            <td
                                colSpan={COLUMNS.length}
                                className="px-4 py-16 text-center text-muted font-extrabold"
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