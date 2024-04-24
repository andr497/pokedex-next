"use client";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import { useTheme } from "next-themes";
import React, { ComponentPropsWithRef } from "react";

type SvgProps = ComponentPropsWithRef<typeof ReactSVG>;

const BaseSvgComponent = (props: SvgProps) => {
    return <ReactSVG {...props} />;
};

const IconSvg = styled(BaseSvgComponent)((props) => {
    const { width, height, color } = props;
    return {
        "& > div > svg": {
            width: width,
            height: height,
        },
        path: {
            fill: color,
        },
    };
});

export default IconSvg;
