"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
    ViewTransition,
    type KeyboardEvent,
} from "react";

import clsx from "clsx";

import Link from "next/link";
import Chip from "@/components/ui/Chip";
import BgTypes from "@/components/Common/BgTypes";
import CustomImage from "@/components/CustomImage";
import { TOTAL_POKEMON } from "@/helpers/constants";
import IconSvg from "@/components/StyledComponents/IconSvg";
import useSvgTypeBackground from "@/hooks/useSvgTypeBackground";
import { GeneralInfoPokemon } from "@/interfaces/IPokemonDetails";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    FaceSmileIcon,
    MinusCircleIcon,
    PauseIcon,
    PlayIcon,
    SparklesIcon,
    TrophyIcon,
} from "@heroicons/react/20/solid";
import {
    addZero,
    checkBrightness,
    colorPokemonTypes,
    fixGenerationName,
    fixPokemonName,
} from "@/helpers/pokemonHelpers";

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
        [data],
    );

    return (
        <>
            <BgTypes colorType1={colorType1} colorType2={colorType2} />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-12 items-center">
                <div className="hidden lg:flex lg:col-span-1 justify-center">
                    <Link
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
                        style={{
                            color: colorType2,
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
    const hasShiny = Boolean(data.image_shiny);

    const toggleImage = () => {
        setActiveShiny((prev) => !prev);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleImage();
        }
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
                    <ViewTransition name="pokemon-image">
                        <div
                            id="image-pokemon-container"
                            role={hasShiny ? "button" : undefined}
                            aria-pressed={hasShiny ? activeShiny : undefined}
                            aria-label={hasShiny ? "Toggle shiny" : undefined}
                            tabIndex={hasShiny ? 0 : undefined}
                            onClick={hasShiny ? toggleImage : undefined}
                            onKeyDown={hasShiny ? handleKeyDown : undefined}
                            className={`relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center ${
                                hasShiny
                                    ? "cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
                                    : ""
                            }`}
                        >
                            <CustomImage
                                loading="eager"
                                alt={data.name}
                                src={data.image}
                                width={width}
                                height={height}
                                className={`${
                                    activeShiny ? "opacity-0" : "opacity-100"
                                } absolute w-full h-full object-contain drop-shadow-2xl z-10 `}
                            />
                            <CustomImage
                                loading="eager"
                                alt={data.name}
                                src={data.image_shiny ?? null}
                                width={width}
                                height={height}
                                className={`${
                                    activeShiny ? "opacity-100" : "opacity-0"
                                } absolute w-full h-full object-contain drop-shadow-2xl z-10`}
                            />
                            {hasShiny && (
                                <span
                                    aria-hidden="true"
                                    className={`absolute top-2 right-2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]`}
                                >
                                    {activeShiny && (
                                        <span className="flex gap-2 text-lg">
                                            <SparklesIcon className="w-6" />
                                            Shiny
                                        </span>
                                    )}
                                </span>
                            )}
                            <span className="absolute bottom-0 text-muted text-xs z-10">
                                {hasShiny
                                    ? "Click the image to shine"
                                    : "No image shiny available"}
                            </span>
                        </div>
                    </ViewTransition>
                </div>

                <div className="flex-1 w-full text-center md:text-left space-y-4">
                    <div className="space-y-1">
                        <span className="text-muted font-bold text-lg tracking-wider">
                            #{addZero(data.id)}
                        </span>
                        <ViewTransition name="pokemon-name">
                            <h1 className="capitalize text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                                {fixPokemonName(data.name)}
                            </h1>
                        </ViewTransition>
                        <p className="text-lg text-muted">{data.genera}</p>
                        <PokemonRarity data={data} />
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                        {data.types.map((value, key) => {
                            const fontColor: string = checkBrightness(
                                color[key],
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
                    <p className="text-muted text-lg leading-relaxed max-w-md mx-auto md:mx-0 pt-2 m-0">
                        {fixGenerationName(data.generation.name)}
                    </p>
                    <p className="text-muted/80 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
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
                                title="(old)"
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
                                : "opacity-40 h-2",
                        )}
                    />
                    <span
                        style={{ backgroundColor: color }}
                        className={clsx(
                            "w-1 rounded-full",
                            isPlaying
                                ? "h-full animate-wave delay-2"
                                : "opacity-40 h-3",
                        )}
                    />
                    <span
                        style={{ backgroundColor: color }}
                        className={clsx(
                            "w-1 rounded-full",
                            isPlaying
                                ? "h-full animate-wave delay-3"
                                : "opacity-40 h-4",
                        )}
                    />
                    <span
                        style={{ backgroundColor: color }}
                        className={clsx(
                            "w-1 rounded-full ",
                            isPlaying
                                ? "h-full animate-wave"
                                : "opacity-40 h-2",
                        )}
                    />
                </div>
            </button>

            {/* Audio real */}
            <audio ref={audioRef} src={src} preload="none" />
        </div>
    );
};

function PokemonRarity({ data }: Props) {
    let rarity = {
        text: "Normal",
        icon: MinusCircleIcon,
        className: "bg-gray-100 text-muted",
    };

    if (data.is_baby) {
        rarity = {
            text: "Baby",
            icon: FaceSmileIcon,
            className: "bg-yellow-100 text-yellow-700",
        };
    } else if (data.is_mythical) {
        rarity = {
            text: "Mythical",
            icon: SparklesIcon,
            className: "bg-purple-100 text-purple-700",
        };
    } else if (data.is_legendary) {
        rarity = {
            text: "Legendary",
            icon: TrophyIcon,
            className: "bg-amber-100 text-amber-700",
        };
    }

    const Icon = rarity.icon;

    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${rarity.className}`}
        >
            {Icon && <Icon className="w-4 h-4 me-1" />}
            {rarity.text}
        </span>
    );
}
