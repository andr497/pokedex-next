import { NamedAPIResource } from "@/interfaces/PokeApi/CommonModels";
import React, { SVGProps } from "react";

interface Props {
    label: string;
    list: NamedAPIResource[];
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
}

const Counter = ({ label, list, icon: Icon }: Props) => {
    const numberOfElements = list.length;

    return (
        <div className="grow bg-surface p-6 rounded-xl border border-border flex flex-col justify-between h-32 relative overflow-hidden group">
            <div className="absolute -right-5 -top-5 text-muted group-hover:text-primary transition-colors">
                <Icon width={100} opacity={0.2} />
            </div>
            <p className="text-muted text-sm font-medium relative z-10">
                {label}
            </p>
            <p className="text-foreground text-3xl font-bold relative z-10">
                {numberOfElements}
            </p>
        </div>
    );
};

export default Counter;
