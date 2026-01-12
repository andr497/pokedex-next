import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Generation } from "@/interfaces/PokeApi/IGenerations";

import SvgPokeball from "@/components/SvgPokeball";

interface Props {
    generation: Generation;
}

const Card = ({ generation }: Props) => {
    return (
        <Link
            href={`/generation/${generation.id}`}
            //className={`group relative mx-auto overflow-hidden rounded w-full dark:bg-gray-800 bg-gray-100 p-px transition-all duration-300 ease-in-out hover:bg-linear-to-r ${from} hover:via-purple-500 ${to}`}
            className="group relative overflow-hidden rounded-xl bg-surface border border-transparent hover:scale-105 hover:shadow-md transition-all h-48 p-6 flex flex-col justify-between"
        >
            <div className="group-hover:animate-spin-slow opacity-0 absolute -top-40 -bottom-40 left-10 right-10 bg-linear-to-r from-transparent via-white/90 dark:via-gray-500 to-transparent group-hover:opacity-10"></div>

            <div>
                <span className="inline-block text-xs font-bold text-muted rounded mb-2">
                    {generation.pokemon_species.length}
                </span>
                <h3 className={`text-2xl font-bold`}>
                    Generation{" "}
                    <span className="uppercase">
                        {generation.name.split("-")[1]}
                    </span>
                </h3>
                <p className="text-sm text-muted capitalize">
                    {generation.main_region.name}
                </p>
            </div>
            <div className="flex items-center justify-end">
                <span className="text-muted transition group-hover:scale-150 duration-300 absolute right-2">
                    <ArrowRightIcon width={25} />
                </span>
                <SvgPokeball
                    src="/assets/patterns/pokeball.svg"
                    style={{
                        "& > div > svg": {
                            width: "220px",
                            height: "220px",
                        },
                    }}
                    className="group-hover:rotate-45 absolute top-14 -right-24 rotate-0 transition duration-300 ease-out hover:ease-in"
                    title={generation.name}
                />
            </div>
        </Link>
    );
};

export default Card;
