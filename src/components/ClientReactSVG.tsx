"use client";
import { ReactNode, useEffect, useState } from "react";

import { ReactSVG } from "react-svg";
import type { ComponentProps } from "react";

export type ClientReactSVGProps = Omit<ComponentProps<typeof ReactSVG>, "ref">;

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

function ClientOnly({ children, fallback = null }: Props) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        (async () => {
            setIsMounted(true);
        })();
    }, []);

    return isMounted ? <>{children}</> : <>{fallback}</>;
}

export default function ClientReactSVG(props: ClientReactSVGProps) {
    return (
        <ClientOnly>
            <ReactSVG {...props} />
        </ClientOnly>
    );
}
