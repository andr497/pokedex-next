"use client";

import { motion } from "framer-motion";
import { addZero } from "@/helpers/pokemonHelpers";
import { GeneralInfoPokemon } from "@/interfaces/IPokemonDetails";

import PokemonCardTypography from "./CardTypography";
import {
    ArrowsUpDownIcon,
    ArrowTrendingUpIcon,
    IdentificationIcon,
    ScaleIcon,
    Squares2X2Icon,
    SwatchIcon,
} from "@heroicons/react/20/solid";

interface Props {
    data: GeneralInfoPokemon;
}

const Card = ({ data }: Props) => {
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
                    subtitle={addZero(data.id)}
                    icon={<IdentificationIcon className="h-4 w-4" />}
                />

                <PokemonCardTypography
                    title={"Height"}
                    subtitle={`${data.height} m`}
                    icon={<ArrowsUpDownIcon className="h-4 w-4" />}
                />

                <PokemonCardTypography
                    title={"Weight"}
                    subtitle={`${data.weight} kg`}
                    icon={<ScaleIcon className="h-4 w-4" />}
                />

                <PokemonCardTypography
                    title={"Catch rate"}
                    subtitle={`${((data.capture_rate / 255) * 100).toFixed(
                        2
                    )}%`}
                    icon={<ArrowTrendingUpIcon className="h-4 w-4" />}
                />

                <PokemonCardTypography
                    title={"Color"}
                    subtitle={`${data.color}`}
                    subtitleClass={"capitalize"}
                    icon={<SwatchIcon className="h-4 w-4" />}
                />

                <PokemonCardTypography
                    title={"Shape"}
                    subtitle={`${data.shape}`}
                    subtitleClass={"capitalize"}
                    icon={<Squares2X2Icon className="h-4 w-4" />}
                />
            </div>
        </motion.article>
    );
};

export default Card;
