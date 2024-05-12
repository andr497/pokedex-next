import { ListRowRenderer } from "react-virtualized";

import { IPokemonList } from "interfaces/IPokemonList";

import PokemonCard from "./PokemonCard";

const ListRowWrapper = (
    itemsPerRow: number,
    pokemon: IPokemonList[]
): ListRowRenderer => {
    const ListRow: ListRowRenderer = ({
        index,
        key,
        style,
        isScrolling,
        isVisible,
    }) => {
        const items = [];
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, pokemon.length);
        for (let i = fromIndex; i < toIndex; i++) {
            items.push(<PokemonCard key={i} pokemon={pokemon[i]} />);
        }
        const emptySize = itemsPerRow - items.length;

        for (let i = 0; i < emptySize; i++) {
            items.push(<PokemonCard key={i + toIndex} pokemon={null} />);
        }
        return (
            <div
                className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1"
                style={{...style, overflow: "visible"}}
                key={key}
            >
                {items}
            </div>
        );
    };

    return ListRow;
};

export default ListRowWrapper;
