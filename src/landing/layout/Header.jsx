import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
    { label: "Inicio", to: "/" },
    { label: "Música", to: "/musica" },
    { label: "Álbumes", to: "/albumes" },
    { label: "Api", to: "/api" },
];

export const Header = () => {
    const [visible, setVisible] = useState(true);
    const [expanded, setExpanded] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            if (current < 50) {
                setVisible(true);
                setExpanded(true);
            } else if (current > lastScrollY.current) {
                // scrolling down → shrink
                setExpanded(false);
            } else {
                // scrolling up → expand
                setVisible(true);
                setExpanded(true);
            }
            lastScrollY.current = current;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-5 left-0 right-0 flex justify-center z-50 pointer-events-none">
            <AnimatePresence>
                <motion.header
                    layout
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: expanded ? 1 : 0.92,
                        borderRadius: expanded ? "30px" : "50px",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 28,
                        mass: 0.8,
                    }}
                    className="pointer-events-auto bg-white/10 backdrop-blur-[14px] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                    style={{
                        padding: expanded ? "10px 28px" : "8px 20px",
                        overflow: "hidden",
                    }}
                >
                    <motion.nav layout>
                        <motion.ul
                            layout
                            className="flex items-center gap-5"
                            animate={{
                                gap: expanded ? "20px" : "12px",
                            }}
                            transition={{ type: "spring", stiffness: 280, damping: 28 }}
                        >
                            {NAV_ITEMS.map((item) => (
                                <motion.li
                                    layout
                                    key={item.label}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <Link
                                        to={item.to}
                                        className="text-white/80 hover:text-white transition-colors font-light tracking-wide"
                                        style={{ fontSize: expanded ? "17px" : "14px" }}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.nav>
                </motion.header>
            </AnimatePresence>
        </div>
    );
};