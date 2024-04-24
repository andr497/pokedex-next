"use client";
import React, { useState } from "react";
import { Variants, motion } from "framer-motion";
import Backdrop from "./Backdrop";

export interface ModalProps {
    handleClose: React.ComponentPropsWithRef<"div">["onClick"];
    title: string;
    content: string | (() => React.ReactElement);
}

const dropIn: Variants = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const Modal = ({ handleClose, title, content }: ModalProps) => {
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <section className="min-w-[300px] rounded dark:bg-gray-800 bg-white relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="capitalize text-3xl font-semibold">
                            {title}
                        </h3>
                        <button
                            className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-gray-400"
                            onClick={handleClose}
                        >
                            ×
                        </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                        {typeof content === "string" ? (
                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                {content}
                            </p>
                        ) : (
                            content()
                        )}
                    </div>
                </section>
            </motion.div>
        </Backdrop>
    );
};

export default Modal;
