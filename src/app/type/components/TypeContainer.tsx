import { TypeDetail } from "@/interfaces/PokeApi/IPokemonTypes";
import TypeCard from "./TypeCard";

type Props = {
    types: TypeDetail[];
};

const TypeContainer = ({ types }: Props) => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {types!.map((type, key) => (
                <TypeCard key={`type-${key}`} type={type} />
            ))}
        </section>
    );
};

export default TypeContainer;
