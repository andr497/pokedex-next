import clsx from "clsx";

interface Props {
    colorType1: string;
    colorType2: string;
    animation?: boolean;
}

export default function BgTypes({
    colorType1,
    colorType2,
    animation = false,
}: Props) {
    return (
        <>
            <div
                className={clsx(
                    "absolute -inset-12 pointer-events-none opacity-25",
                    animation && [
                        "transition-transform duration-700 ease-out",
                        "group-hover:opacity-35",
                        "group-hover:translate-x-6 group-hover:translate-y-6",
                        "group-hover:scale-105",
                    ]
                )}
                style={{
                    backgroundImage: `linear-gradient(to bottom right, ${colorType1}, transparent, transparent)`,
                }}
            />

            <div
                className={clsx(
                    "absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25",
                    animation && [
                        "transition-transform duration-1000 ease-out",
                        "group-hover:opacity-35",
                        "group-hover:translate-x-0 group-hover:-translate-y-28",
                        "group-hover:scale-110",
                    ]
                )}
                style={{
                    backgroundColor: colorType2,
                }}
            />
        </>
    );
}
