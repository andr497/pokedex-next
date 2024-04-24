import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

const ColorExtractorComponent: React.FC = () => {
    const [dominantColor, setDominantColor] = useState<string | null>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const extractDominantColor = () => {
            if (imageRef.current) {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                if (ctx) {
                    canvas.width = imageRef.current.width;
                    canvas.height = imageRef.current.height;

                    ctx.drawImage(
                        imageRef.current,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    const imageData = ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    ).data;
                    const colorMap = new Map<string, number>();

                    for (let i = 0; i < imageData.length; i += 4) {
                        const r = imageData[i];
                        const g = imageData[i + 1];
                        const b = imageData[i + 2];
                        const a = imageData[i + 3];

                        if (a !== 0) {
                            const color = `rgb(${r},${g},${b})`;
                            const count = colorMap.get(color) || 0;
                            colorMap.set(color, count + 1);
                        }
                    }

                    let maxCount = 0;
                    let dominant = "";

                    colorMap.forEach((count, color) => {
                        if (count > maxCount) {
                            maxCount = count;
                            dominant = color;
                        }
                    });

                    setDominantColor(dominant);
                }
            }
        };

        extractDominantColor();
    }, [dominantColor]);

    return (
        <div>
            <h2>Color Dominante:</h2>
            {dominantColor && (
                <div
                    style={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: dominantColor,
                    }}
                ></div>
            )}
            <Image
                width={250}
                height={250}
                ref={imageRef}
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
                alt="Imagen"
            />
        </div>
    );
};

export default ColorExtractorComponent;
