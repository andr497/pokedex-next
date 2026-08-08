"use client";
import { useState } from "react";

interface Props {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

const ItemImage = ({ src, alt, width = 28, height = 28 }: Props) => {
    const [show, setShow] = useState(true);

    if (!show) return null;

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={alt}
            title={alt}
            width={width}
            height={height}
            className="object-contain"
            onError={() => setShow(false)}
        />
    );
};

export default ItemImage;
