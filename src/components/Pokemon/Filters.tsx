"use client";
import { PokemonSpecies } from "@/interfaces/PokeApi/IPokemonSpecies";
import { useParams, useRouter } from "next/navigation";
import { fixVarietiesName } from "@/helpers/pokemonHelpers";
import clsx from "clsx";
import CustomImage from "../CustomImage";
import { SPRITE_BASE_URL } from "@/helpers/constants";

interface Props {
    pokemonId: string;
    varieties: PokemonSpecies["varieties"];
}

export default function PokemonVarietiesFilters({
    pokemonId,
    varieties,
}: Props) {
    const params = useParams();
    const router = useRouter();

    return (
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {varieties.map((value, key) => {
                const principalId = value.pokemon.url.split("/")[6];
                const isSelected = principalId == params.name;
                return (
                    <button
                        className={clsx(
                            "group relative flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-foreground/5 hover:bg-foreground/20 border border-border/5 transition-all whitespace-nowrap min-w-max",
                            {
                                "bg-foreground/20 cursor-default": isSelected,
                                "cursor-pointer": !isSelected,
                            },
                        )}
                        key={`variety-${key}`}
                        onClick={() => {
                            if (isSelected) return;
                            router.replace(`/pokemon/${principalId}`);
                        }}
                    >
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                            <CustomImage
                                loading="lazy"
                                className="w-full h-full object-contain transform scale-125"
                                alt={`Variety image pokemon for ${principalId}`}
                                src={`${SPRITE_BASE_URL}/${principalId}.png`}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="capitalize font-bold text-sm leading-none">
                                {fixVarietiesName(value.pokemon.name)}
                            </span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

/*


<Chip
                        className={`capitalize bg-foreground/15  ${
                            principalId === params.name
                                ? "cursor-default bg-foreground/25"
                                : "cursor-pointer hover:bg-foreground/40"
                        }`}
                        key={`variety-${key}`}
                        label={fixVarietiesName(
                            value.pokemon.name,
                            value.is_default
                        )}
                        size="small"
                        onClick={() => {
                            if (principalId == params.name) return;
                            router.replace(`/pokemon/${principalId}`);
                        }}
                    />*/
