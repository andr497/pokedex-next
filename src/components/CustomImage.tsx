"use client";
import { useState, ComponentPropsWithRef, useEffect } from "react";
import Image from "next/image";

interface props extends ComponentPropsWithRef<typeof Image> {
    colorType1?: string;
    colorType2?: string;
}
//type props = ComponentPropsWithRef<typeof Image>

const CustomImage = ({ alt, ...props }: props) => {
    const [src, setSrc] = useState(props.src);

    const { colorType1, colorType2, ...restProps } = props;

    return (
        <Image
            {...restProps}
            src={src ?? "/NotFound.png"}
            alt={alt}
            onError={() => setSrc("/NotFound.png")}
        />
    );
};

export default CustomImage;
