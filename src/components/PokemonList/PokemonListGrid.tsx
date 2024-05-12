"use client";
import React, { LegacyRef } from "react";

import { List, WindowScroller } from "react-virtualized";

import useBreakpoints from "hooks/useBreakpoints";
import { IPokemonList } from "@/interfaces/IPokemonList";
import { InformationCircleIcon as ErrorIcon } from "@heroicons/react/20/solid";

import ListRowWrapper from "../ListRowWrapper";

interface Props {
    pokemon: IPokemonList[];
}

const PokemonListGrid = ({ pokemon }: Props) => {
    const breakpoint = useBreakpoints();
    return (
        <WindowScroller >
            {({ width, height, isScrolling, registerChild, scrollTop }) => {
                const WIDTH_ROW = 320;
                const extraSpace = width >= 950 ? 1 : 0;

                const sizes = {
                    xl: 6,
                    lg: 4,
                    md: 3,
                    sm: 2,
                    xs: 1,
                };

                let itemsPerRow = sizes[breakpoint];

                itemsPerRow =
                    itemsPerRow > pokemon.length ? pokemon.length : itemsPerRow;
                let rowCount = Math.ceil(pokemon.length / itemsPerRow);
                rowCount = isNaN(rowCount) ? 0 : rowCount;

                return (
                    <div
                        className="mt-3"
                        ref={registerChild as LegacyRef<HTMLDivElement>}
                    >
                        <List
                            style={{
                                overflowX: "visible",
                                overflowY: "visible",
                            }}
                            containerStyle={{
                                overflowX: "visible",
                                overflowY: "visible",
                                padding: "20px",
                            }}
                            autoHeight
                            autoWidth
                            width={width}
                            height={height}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                            rowCount={rowCount}
                            rowHeight={WIDTH_ROW}
                            noRowsRenderer={() => <PokemonNotFound />}
                            rowRenderer={ListRowWrapper(itemsPerRow, pokemon)}
                        />
                    </div>
                );
            }}
        </WindowScroller>
    );
};

function PokemonNotFound() {
    return (
        <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
        >
            <ErrorIcon
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
            />
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium">Pokemon not found</span>
            </div>
        </div>
    );
}

export default PokemonListGrid;
