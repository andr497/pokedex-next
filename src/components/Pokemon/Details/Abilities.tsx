import { fixAbilitiesName } from "@/helpers/pokemonHelpers";
import { IAbility } from "@/interfaces/PokeApi/IAbility";

export interface AbilityDetail {
    is_hidden: boolean;
    slot: number;
    detail: IAbility;
}

interface Props {
    abilities: AbilityDetail[];
}

export default function Abilities({ abilities }: Props) {
    return (
        <div className="space-y-4">
            {abilities.map(({ is_hidden, slot, detail }) => (
                <AbilityItem
                    key={`ability-${detail.name}`}
                    is_hidden={is_hidden}
                    slot={slot}
                    detail={detail}
                />
            ))}
        </div>
    );
}

function AbilityItem({
    is_hidden,
    slot,
    detail,
}: Omit<AbilityDetail, "slot"> & { slot: number }) {
    const description = detail.effect_entries.filter(
        (v) => v.language.name === "en",
    );

    return (
        <div className="flex items-start gap-4 p-3 rounded-lg bg-foreground/5 border border-border">
            <div className="mt-1 size-8 shrink-0 rounded-full bg-foreground/20 text-muted flex items-center justify-center">
                <span className="text-sm font-bold">{slot}</span>
            </div>
            <div className="">
                <h4 className="text-base font-bold capitalize text-base-content">
                    {fixAbilitiesName(detail.name)}{" "}
                    {is_hidden && (
                        <span className="text-xs bg-base-content/25 py-0.5 px-2 rounded-lg align-middle">
                            Hidden
                        </span>
                    )}
                </h4>
                <p className="text-muted text-sm mt-1">
                    {description?.[0]?.short_effect}
                </p>
            </div>
        </div>
    );
}
