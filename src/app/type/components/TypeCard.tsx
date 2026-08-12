import SvgPokeball from "@/components/SvgPokeball";
import { COLOR } from "@/helpers/constants";
import { ColorType } from "@/interfaces/ICommons";
import { TypeDetail } from "@/interfaces/PokeApi/IPokemonTypes";
import Link from "next/link";

type Props = {
    type: TypeDetail;
};

function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const TypeCard = ({ type }: Props) => {
    // ponytail: fallback fijo; stellar/unknown/shadow no estan en COLOR, color neutro para ambos temas
    const baseColor = COLOR[type.name as ColorType] ?? "#64748b";
    const colorType = hexToRgba(baseColor, 0.4);

    return (
        <Link
            href={`/type/${type.id}`}
            className="group relative overflow-hidden rounded-xl bg-surface border border-transparent hover:scale-105 hover:shadow-md transition-all h-48 p-6 flex flex-col justify-between"
        >
            <div
                className="group-hover:animate-spin-slow opacity-0 absolute top-0 left-0 w-full h-full group-hover:opacity-50"
                style={{
                    backgroundImage: `linear-gradient(135deg, transparent, ${colorType}, transparent)`,
                }}
            ></div>

            <div className="relative w-full h-full flex items-center justify-center">
                <div className="z-10 text-center">
                    <h3
                        className={`text-2xl relative font-extrabold tracking-widest`}
                    >
                        <span className="uppercase">{type.name}</span>
                    </h3>
                </div>
            </div>
            <div className="flex items-center justify-end z-0">
                <SvgPokeball
                    src={`/assets/types/${type.name}.svg`}
                    style={{
                        "& > div > svg": {
                            width: "160px",
                            height: "160px",
                            path: {
                                fill: colorType,
                            },
                        },
                    }}
                    className="absolute translate-x-1/2 -translate-y-1/3 group-hover:scale-115 group-hover:opacity-80 opacity-30 rotate-0 transition duration-150 ease-out hover:ease-in"
                    title={type.name}
                />
            </div>
        </Link>
    );
};

export default TypeCard;
