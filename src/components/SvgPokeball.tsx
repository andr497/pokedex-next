/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import styled from "styled-components";
import { useTheme } from "next-themes";
import ClientReactSVG, { ClientReactSVGProps } from "./ClientReactSVG";

interface ColorTypesProps {
    colorType1?: string;
    colorType2?: string;
}

type SvgProps = ClientReactSVGProps & ColorTypesProps;

const BaseSvgPokeballComponent = ({
    colorType1,
    colorType2,
    ...props
}: SvgProps | any) => {
    return <ClientReactSVG {...props} />;
};

const SvgPokeball = styled(BaseSvgPokeballComponent)((props) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { colorType1, colorType2 } = props;

    let style = { ...props.style };
    if (colorType1 && colorType1) {
        style = {
            filter: `drop-shadow(-5px 0 8px ${colorType1})
                drop-shadow(5px 0 8px ${colorType2})
                blur(.2rem)
            `,
        };
    }

    return {
        "& > div > svg": {
            width: "300px",
            height: "300px",
        },
        path: {
            fill: isDark ? "#FFFFFF10" : "#00000010",
        },
        ...style,
    };
});

export default SvgPokeball;
