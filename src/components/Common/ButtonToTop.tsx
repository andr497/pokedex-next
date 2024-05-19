import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/20/solid";

const ButtonToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`z-50 back-to-top fixed bottom-8 right-8 
            flex justify-center items-center
            bg-gray-600 outline-4 outline-gray-50 p-0 
            rounded-full h-14 w-14 
            transition-all duration-1300  ease-in-out
            ${isVisible ? "visible" : "invisible"}`}
            onClick={scrollToTop}
        >
            <ArrowUpIcon width={20} height={20} className="text-gray-50" />
        </motion.button>
    );
};

export default ButtonToTop;