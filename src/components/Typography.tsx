"use client";
import { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

type Rainbow =
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "violet";

type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>["ref"];

type AsProp<C extends ElementType> = {
    as?: C;
}

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
    C extends ElementType,
    Props = {}
> = PropsWithChildren<Props & AsProp<C> & Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

const Typography = ({ children, tag }: TypographyProps) => {
    const As = tag || "span";

    return <As>{children}</As>;
};

export default Typography;
