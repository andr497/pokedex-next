"use client";

import { motion } from "framer-motion";

import { Chip, Divider } from "@/components/Common";
import { useParams, useRouter } from "next/navigation";
import { fixVarietiesName } from "@/helpers/pokemonHelpers";
import { GeneralInfoPokemon } from "@/interfaces/IPokemonDetails";
import { PokemonSpecies } from "@/interfaces/PokeApi/IPokemonSpecies";

import PokemonCardTypography from "./CardTypography";

interface Props {
    data: GeneralInfoPokemon;
    varieties: PokemonSpecies["varieties"];
}

const Card = ({ data, varieties }: Props) => {
    const params = useParams();
    const router = useRouter();

    return (
        <motion.article
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0 }}
            className={""}
        >
            <div className="grid grid-cols-2 gap-6">
                <PokemonCardTypography
                    title={"National N°"}
                    subtitle={data.id.toString().padStart(4, "0")}
                />

                <PokemonCardTypography
                    title={"Height"}
                    subtitle={`${data.height} m`}
                />

                <PokemonCardTypography
                    title={"Weight"}
                    subtitle={`${data.weight} kg`}
                />

                <PokemonCardTypography
                    title={"Catch rate"}
                    subtitle={`${((data.capture_rate / 255) * 100).toFixed(
                        2
                    )}%`}
                />

                <PokemonCardTypography
                    title={"Color"}
                    subtitle={`${data.color}`}
                    subtitleClass={"capitalize"}
                />

                <PokemonCardTypography
                    title={"Shape"}
                    subtitle={`${data.shape}`}
                    subtitleClass={"capitalize"}
                />
            </div>
            <div className="my-5">
                <Divider label="Varieties" />
                <div
                    className={`grid mt-4 gap-2 ${
                        varieties.length === 1 ? "col-span-12" : "grid-cols-2"
                    } ${varieties.length > 4 ? "overflow-scroll" : ""}`}
                >
                    {varieties.map((value, key) => {
                        const principalId = value.pokemon.url.split("/")[6];
                        return (
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
                            />
                        );
                    })}
                </div>
            </div>
        </motion.article>
    );
};

export default Card;
