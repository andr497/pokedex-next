"use client";
import React from "react";

interface Props {
    src: string;
}

const AudioPlayer = ({ src }: Props) => {
    return (
        <audio controls className="w-full">
            <source src={src} />
            Your browser not support audio
        </audio>
    );
};

export default AudioPlayer;
