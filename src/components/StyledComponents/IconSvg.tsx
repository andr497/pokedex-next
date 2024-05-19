"use client";
import React, { ComponentPropsWithRef } from "react";

import { ReactSVG } from "react-svg";
import styled from "styled-components";

type SvgProps = ComponentPropsWithRef<typeof ReactSVG>;

const BaseSvgComponent = (props: SvgProps) => {
    //@ts-ignore
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
