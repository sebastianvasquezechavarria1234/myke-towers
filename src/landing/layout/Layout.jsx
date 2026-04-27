import React from "react";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

export const Layout = ({ children }) => {
    return (
        <div className="relative">
            <motion.div 
                initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
            <Footer />
        </div>
    );
};