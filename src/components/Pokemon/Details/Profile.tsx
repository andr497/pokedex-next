"use client";

import { Chip } from "@/components/Common";
import CustomImage from "@/components/CustomImage";
import IconSvg from "@/components/StyledComponents/IconSvg";
import { TOTAL_POKEMON } from "@/helpers/constants";
import {
    checkBrightness,
    colorPokemonTypes,
    fixPokemonName,
} from "@/helpers/pokemonHelpers";
import useSvgTypeBackground from "@/hooks/useSvgTypeBackground";
import { GeneralInfoPokemon } from "@/interfaces/IPokemonDetails";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    PauseIcon,
    PlayIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
    data: GeneralInfoPokemon;
}

export default function PokemonProfile({ data }: Props) {
    const {
        colors: { colorType1, colorType2 },
        nextPokemon,
        prevPokemon,
        isFirst,
        isLast,
    } = useMemo(
        () => ({
            colors: colorPokemonTypes(data),
            pokemonName: fixPokemonName(data.name),
            isFirst: data.id === 1,
            isLast: data.id === TOTAL_POKEMON,
            prevPokemon: data.id === 1 ? data.id : data.id - 1,
            nextPokemon: data.id === TOTAL_POKEMON ? 1 : data.id + 1,
        }),
        [data]
    );

    return (
        <>
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to bottom right, ${colorType1}, transparent, transparent)`,
                }}
            ></div>

            <div
                className="absolute -right-20 -top-20 opacity-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                style={{
                    backgroundColor: `${colorType2}`,
                }}
            ></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-12 items-center">
                <div className="hidden lg:flex lg:col-span-1 justify-center">
                    <Link
                        prefetch={false}
                        style={{
                            color: colorType1,
                            visibility: isFirst ? "hidden" : "visible",
                        }}
                        className="group flex items-center justify-center w-12 h-12 rounded-full transition-all backdrop-blur-sm border border-border/30"
                        href={`/pokemon/${prevPokemon}`}
                    >
                        <ChevronLeftIcon className="text-2xl group-hover:-translate-x-0.5 transition-transform" />
                    </Link>
                </div>
                <PokemonImage data={data} />
                <div className="hidden lg:flex lg:col-span-1 justify-center">
                    <Link
                        prefetch={false}
                        style={{
                            color: colorType1,
                            visibility: isLast ? "hidden" : "visible",
                        }}
                        className="group flex items-center justify-center w-12 h-12 rounded-full transition-all backdrop-blur-sm border border-border/30"
                        href={`/pokemon/${nextPokemon}`}
                    >
                        <ChevronRightIcon className="text-2xl group-hover:-translate-x-0.5 transition-transform" />
                    </Link>
                </div>
                <div className="col-span-1 lg:hidden flex justify-between px-4 pb-4 w-full">
                    <Link
                        prefetch={false}
                        style={{
                            color: colorType1,
                            visibility: isFirst ? "hidden" : "visible",
                        }}
                        className="group text-xs font-bold flex items-center w-15 h-12 rounded-full transition-all backdrop-blur-sm border border-border/60"
                        href={`/pokemon/${prevPokemon}`}
                    >
                        <ChevronLeftIcon className="w-12 h-12 group-hover:scale-150 transition" />
                        <span className="pe-2 group-hover:scale-110 transition">
                            #{prevPokemon}
                        </span>
                    </Link>
                    <Link
                        prefetch={false}
                        style={{
                            color: colorType2,
                            visibility: isLast ? "hidden" : "visible",
                        }}
                        className="group text-xs font-bold flex items-center w-15 h-12 rounded-full transition-all backdrop-blur-sm border border-border/60"
                        href={`/pokemon/${nextPokemon}`}
                    >
                        <span className="ps-2 group-hover:scale-110 transition">
                            #{nextPokemon}
                        </span>
                        <ChevronRightIcon className="w-12 h-12 group-hover:scale-150 transition" />
                    </Link>
                </div>
            </div>
        </>
    );
}

function PokemonImage({ data }: Props) {
    useSvgTypeBackground({ type: data.types[0].type.name });
    const [activeShiny, setActiveShiny] = useState<boolean>(false);

    const toggleImage = () => {
        setActiveShiny((prev) => !prev);
    };

    const { colorType1, colorType2 } = useMemo(() => {
        return colorPokemonTypes(data);
    }, [data]);

    const color = [colorType1, colorType2];
    const width = 300;
    const height = 300;

    return (
        <>
            <div className="lg:col-span-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 justify-center">
                <div className="flex-1 flex flex-col items-center relative">
                    <div
                        id="image-pokemon-container"
                        className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
                    >
                        <CustomImage
                            loading="lazy"
                            alt={data.name}
                            src={data.image}
                            width={width}
                            height={height}
                            className={`${
                                activeShiny ? "opacity-0" : "opacity-100"
                            } absolute w-full h-full object-contain drop-shadow-2xl z-10`}
                            onClick={data.image_shiny ? toggleImage : () => {}}
                        />
                        <CustomImage
                            loading="lazy"
                            alt={data.name}
                            src={data.image_shiny ?? null}
                            width={width}
                            height={height}
                            className={`${
                                activeShiny ? "opacity-100" : "opacity-0"
                            } absolute w-full h-full object-contain drop-shadow-2xl z-10`}
                            onClick={data.image_shiny ? toggleImage : () => {}}
                        />
                    </div>
                </div>

                <div className="flex-1 w-full text-center md:text-left space-y-4">
                    <div className="space-y-1">
                        <span className="text-muted font-bold text-lg tracking-wider">
                            #{data.id}
                        </span>
                        <h1 className="capitalize text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                            {fixPokemonName(data.name)}
                        </h1>
                        <p className="text-lg text-muted">{data.genera}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                        {data.types.map((value, key) => {
                            const fontColor: string = checkBrightness(
                                color[key]
                            )
                                ? "#fff"
                                : "#000";
                            return (
                                <div key={`card-type-${key}`}>
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
                                        className="capitalize text-sm font-semibold"
                                        label={value.type.name}
                                        size="small"
                                        style={{
                                            backgroundColor: color[key],
                                            color: fontColor,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-muted/80 text-sm leading-relaxed max-w-md mx-auto md:mx-0 pt-4">
                        {data.flavor_entry}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {data.cries.latest && (
                            <PokemonCryPlayer
                                src={`${data.cries.latest}`}
                                color={colorType1}
                            />
                        )}

                        {data.cries.legacy && (
                            <PokemonCryPlayer
                                src={`${data.cries.legacy}`}
                                color={colorType1}
                                title="(legacy)"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

const PokemonCryPlayer = ({
    title = "",
    color,
    src,
}: {
    title?: string;
    src: string;
    color: string;
}) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener("ended", handleEnded);
        return () => audio.removeEventListener("ended", handleEnded);
    }, []);

    return (
        <div className="pt-4 flex justify-center md:justify-start">
            <button
                onClick={togglePlay}
                className="flex items-center gap-3 bg-foreground/5 hover:bg-foreground/20 transition-colors pr-4 pl-3 py-2 rounded-full border border-white/5 group cursor-pointer"
            >
                <div
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                    {isPlaying ? (
                        <PauseIcon width={20} />
                    ) : (
                        <PlayIcon width={20} />
                    )}
                </div>

                <span className="text-sm font-medium max-sm:text-xs text-base-content">
                    {`Play Cry ${title}`}
                </span>

                <div className="flex gap-0.5 items-end h-4 ml-2">
                    <span
                        style={{ backgroundColor: color }}
                        className={clsx(
                            "w-1 rounded-full",
                            isPlaying
                                ? "h-full animate-wave delay-1"
                                : "opacity-40 h-2"
                        )}
                    />
                    <span
                        style={{ backgroundColor: color }}
                        className={clsx(
                            "w-1 rounded-full",
                            isPlaying
                                ? "h-full animate-wave delay-2"
                                : "opacity-40 h-3"
                        )}
                    />
                    <span
                        style={{ backgroundColor: color }}
                        className={clsx(
                            "w-1 rounded-full",
                            isPlaying
                                ? "h-full animate-wave delay-3"
                                : "opacity-40 h-4"
                        )}
                    />
                    <span
                        style={{ backgroundColor: color }}
                        className={clsx(
                            "w-1 rounded-full ",
                            isPlaying ? "h-full animate-wave" : "opacity-40 h-2"
                        )}
                    />
                </div>
            </button>

            {/* Audio real */}
            <audio ref={audioRef} src={src} preload="none" />
        </div>
    );
};
