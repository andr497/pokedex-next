import styled from "styled-components";
import { ReactSVG } from "react-svg";
import { useTheme } from "next-themes";
import React, { ComponentPropsWithRef } from "react";

interface ColorTypesProps {
    colorType1?: string;
    colorType2?: string;
}

type ReactSVGProps = ComponentPropsWithRef<typeof ReactSVG>;

type SvgProps = ReactSVGProps & ColorTypesProps;

const BaseSvgPokeballComponent = ({
    colorType1,
    colorType2,
    ...props
}: SvgProps) => {
    return <ReactSVG {...props} />;
};

const SvgPokeball = styled(BaseSvgPokeballComponent)((props) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { colorType1, colorType2 } = props;

    return {
        "& > div > svg": {
            width: "150px",
            height: "150px",
        },
        path: {
            fill: isDark ? "#1F2937" : "white",
        },
        filter: `drop-shadow(-5px 0 8px ${colorType1})
                drop-shadow(5px 0 8px ${colorType2})
                blur(.2rem)
        `,
    };
});

export default SvgPokeball;
