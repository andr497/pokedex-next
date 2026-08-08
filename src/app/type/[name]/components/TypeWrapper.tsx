import { PokemonGrid } from "@/components/Pokemon";
import { IPokemonTypeDetails } from "@/interfaces/IPokemonTypes";

type Props = {
    type: IPokemonTypeDetails;
};

const TypeWrapper = ({ type }: Props) => {
    return (
        <section className="flex flex-col gap-4">
            {type.pokemon.length}
            <PokemonGrid pokemons={type.pokemon} />
        </section>
    );
};

export default TypeWrapper;
