"use client";
import React from "react";
import { motion } from "framer-motion";

interface BackdropProps {
    children: React.ReactElement;
    onClick: React.ComponentPropsWithRef<"div">["onClick"];
}

const Backdrop = ({ children, onClick }: BackdropProps) => {
    return (
        <>
            {children}
            <motion.div
                onClick={onClick}
                className="opacity-25 fixed inset-0 z-40 overflow-y-hidden"
                initial={{ opacity: 0, backgroundColor: "rgb(0, 0, 0)" }}
                animate={{ opacity: 1, backgroundColor: "rgba(0, 0, 0, .5)" }}
                exit={{ opacity: 0 }}
            ></motion.div>
        </>
    );
};

export default Backdrop;
