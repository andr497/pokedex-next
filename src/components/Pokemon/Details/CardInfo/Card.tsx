"use client";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import dynamic from "next/dynamic";
import useModal from "@/hooks/useModal";
import { getAbilityById } from "@/api/pokemon";
import { Loading } from "@/components/Loading";
import { Chip, Divider } from "@/components/Common";
import { ModalProps } from "@/components/Modal/Modal";
import { useParams, useRouter } from "next/navigation";
import IconSvg from "@/components/StyledComponents/IconSvg";
import { GeneralInfoPokemon } from "@/interfaces/IPokemonDetails";
import { PokemonSpecies } from "@/interfaces/PokeApi/IPokemonSpecies";
import { LockOpenIcon as HiddenIcon } from "@heroicons/react/20/solid";
import { Pokemon, PokemonAbility } from "@/interfaces/PokeApi/IPokemonApi";
import {
    checkBrightness,
    colorPokemonTypes,
    fixAbilitiesName,
    fixVarietiesName,
} from "@/helpers/pokemonHelpers";

import PokemonCardTypography from "./CardTypography";

const Modal = dynamic(() => import("@/components/Modal/Modal"), {
    ssr: false,
});

interface Props {
    data: GeneralInfoPokemon;
    abilities: Pokemon["abilities"];
    varieties: PokemonSpecies["varieties"];
}

const Card = ({ data, abilities, varieties }: Props) => {
    const params = useParams();
    const router = useRouter();

    const { open, toggle } = useModal();
    const [loadingModal, setLoadingModal] = useState<boolean>(false);
    const [modalProps, setModalProps] = useState<
        Omit<ModalProps, "handleClose">
    >({
        title: "",
        content: "",
    });
    const { colorType1, colorType2 } = colorPokemonTypes(data);
    const color = [colorType1, colorType2];

    const handleOpenModalAbility = (ability: PokemonAbility) => {
        setLoadingModal(true);
        getAbilityById(ability.ability.name)
            .then((response) => {
                const description = response.effect_entries.filter(
                    (v) => v.language.name === "en"
                );
                setModalProps({
                    title: `${fixAbilitiesName(ability.ability.name)} ${
                        ability.is_hidden ? "[hidden]" : ""
                    }`,
                    content:
                        description.length > 0
                            ? () => (
                                  <>
                                      <h6
                                          className="text-center text-xl"
                                          style={{
                                              backgroundColor: colorType1,
                                              color: checkBrightness(colorType1)
                                                  ? "#fff"
                                                  : "#000",
                                          }}
                                      >
                                          Effect
                                      </h6>
                                      <p>{description[0].effect}</p>
                                      <h6
                                          className="text-center text-xl mb-2"
                                          style={{
                                              backgroundColor: colorType1,
                                              color: checkBrightness(colorType1)
                                                  ? "#fff"
                                                  : "#000",
                                          }}
                                      >
                                          Short effect
                                      </h6>
                                      <p>{description[0].short_effect}</p>
                                  </>
                              )
                            : "There is no info yet about this ability",
                });
                toggle();
            })
            .finally(() => {
                setLoadingModal(false);
            });
    };

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
            <AnimatePresence>
                {loadingModal && <Loading />}
                {open && <Modal handleClose={toggle} {...modalProps} />}
            </AnimatePresence>
        </motion.article>
    );
};

export default Card;
