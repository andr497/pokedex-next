import GenerationCard from "./Card";
import { Generation } from "@/interfaces/PokeApi/IGenerations";

type Props = {
    generations: Generation[];
};

const GenerationGrid = ({ generations }: Props) => {
    // const { data: generations, isLoading } = useSWR("1", getGenerations);

    // if (isLoading) {
    //     return <Loading />;
    // }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generations!.map((generation, key) => {
                return (
                    <GenerationCard
                        key={`generation-${key}`}
                        generation={generation}
                    />
                );
            })}
        </section>
    );
};

export default GenerationGrid;
