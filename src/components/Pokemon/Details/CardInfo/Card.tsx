"use client";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import dynamic from "next/dynamic";
import useModal from "hooks/useModal";
import { getAbilityById } from "api/pokemon";
import { Loading } from "@/components/Loading";
import { ModalProps } from "components/Modal/Modal";
import { useParams, useRouter } from "next/navigation";
import IconSvg from "@/components/StyledComponents/IconSvg";
import { GeneralInfoPokemon } from "interfaces/IPokemonDetails";
import { AudioPlayer, Chip, Divider } from "@/components/Common";
import { PokemonSpecies } from "interfaces/PokeApi/IPokemonSpecies";
import { LockOpenIcon as HiddenIcon } from "@heroicons/react/20/solid";
import { Pokemon, PokemonAbility } from "interfaces/PokeApi/IPokemonApi";
import {
    checkBrightness,
    colorPokemonTypes,
    fixAbilitiesName,
    fixVarietiesName,
} from "@/helpers/pokemonHelpers";

import PokemonCardTypography from "./CardTypography";

const Modal = dynamic(() => import("components/Modal/Modal"), {
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
            className={"rounded mx-4 p-2"}
        >
            <div className="">
                <div className="table w-full">
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
                <Divider label="Cries" />
                <div className="w-full">
                    {data.cries.latest ? (
                        <AudioPlayer src={`${data.cries.latest}`} />
                    ) : null}

                    {data.cries.legacy ? (
                        <AudioPlayer src={`${data.cries.legacy}`} />
                    ) : null}
                </div>
                <Divider label="Types" />
                <div
                    className={`grid ${
                        data.types.length === 1
                            ? "justify-center"
                            : "grid-cols-2"
                    }`}
                >
                    {data.types.map((value, key) => {
                        const fontColor: string = checkBrightness(color[key])
                            ? "#fff"
                            : "#000";
                        return (
                            <Chip
                                icon={
                                    <IconSvg
                                        src={`/assets/types/${value.type.name}.svg`}
                                        title={`icon-${value.type.name}`}
                                        className="mr-1"
                                        width={15}
                                        color={fontColor}
                                    />
                                }
                                className="capitalize"
                                key={`card-type-${key}`}
                                label={value.type.name}
                                size="small"
                                style={{
                                    backgroundColor: color[key],
                                    color: fontColor,
                                }}
                            />
                        );
                    })}
                </div>
                <Divider label="Abilities" />
                <div
                    className={`grid ${
                        abilities.length === 1
                            ? "justify-center"
                            : "grid-cols-2"
                    }`}
                >
                    {abilities.map((value, key) => {
                        return (
                            <Chip
                                icon={
                                    value.is_hidden ? (
                                        <HiddenIcon
                                            height={20}
                                            width={20}
                                            className="mr-1"
                                        />
                                    ) : null
                                }
                                className="capitalize cursor-pointer hover:bg-opacity-75"
                                key={`ability-${key}`}
                                label={fixAbilitiesName(value.ability.name)}
                                size="small"
                                rounded="full"
                                onClick={() => {
                                    handleOpenModalAbility(value);
                                }}
                            />
                        );
                    })}
                </div>
                <Divider label="Varieties" />
                <div
                    className={`grid ${
                        varieties.length === 1 ? "col-span-12" : "grid-cols-2"
                    } ${
                        varieties.length > 4 ? "h-[150px] overflow-scroll" : ""
                    }`}
                >
                    {varieties.map((value, key) => {
                        const principalId = value.pokemon.url.split("/")[6];
                        return (
                            <Chip
                                className={`capitalize ${
                                    principalId === params.name
                                        ? "cursor-default bg-opacity-90"
                                        : "cursor-pointer hover:bg-opacity-75"
                                }`}
                                key={`variety-${key}`}
                                label={fixVarietiesName(
                                    value.pokemon.name,
                                    value.is_default
                                )}
                                size="small"
                                rounded="full"
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
