import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useVideo } from "../../context/VideoContext";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const NAV_ITEMS = [
    { label: "Inicio", to: "/" },
    { label: "Música", to: "/musica" },
    { label: "Álbumes", to: "/albumes" },
    { label: "Api", to: "/api" },
];

export const Header = () => {
    const { currentVideo, isPlaying, togglePlay, nextVideo, prevVideo } = useVideo();
    const [scrolled, setScrolled] = useState(false);
    const [scrollingUp, setScrollingUp] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            
            // Detectar dirección del scroll
            if (current < lastScrollY.current && current > 50) {
                setScrollingUp(true);
            } else {
                setScrollingUp(false);
            }

            // Detectar si estamos arriba del todo
            if (current > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
            
            lastScrollY.current = current;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Expandido si: Estamos arriba O hay Hover O estamos haciendo scroll hacia arriba
    const isExpanded = !scrolled || isHovered || scrollingUp;

    return (
        <div 
            className="fixed top-5 left-0 right-0 flex justify-center z-50 pointer-events-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.header
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    width: isExpanded ? "auto" : "240px", // Un poco más ancho para el disco + controles
                    borderRadius: "40px",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="pointer-events-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden flex items-center px-4 py-2 gap-2"
            >
                {/* LADO IZQUIERDO: DISCO GIRANDO */}
                <motion.div 
                    className="relative flex-shrink-0"
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden bg-black flex items-center justify-center">
                        {currentVideo?.imagen ? (
                            <img src={currentVideo.imagen} alt="disc" className="w-full h-full object-cover opacity-80" />
                        ) : (
                            <div className="w-full h-full bg-young-king/20" />
                        )}
                        <div className="absolute w-2 h-2 bg-white/40 rounded-full shadow-inner" />
                    </div>
                </motion.div>

                {/* CENTRO: NAV ITEMS (Solo en Expanded) */}
                <AnimatePresence mode="wait">
                    {isExpanded && (
                        <motion.nav
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="flex items-center overflow-hidden"
                        >
                            <ul className="flex items-center gap-6 px-6 border-l border-white/10 ml-2">
                                {NAV_ITEMS.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            to={item.to}
                                            className="text-white/70 hover:text-white transition-colors text-sm font-medium tracking-wide whitespace-nowrap"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.nav>
                    )}
                </AnimatePresence>

                {/* LADO DERECHO: CONTROLES (Siempre visibles) */}
                <div className="flex items-center gap-3 border-l border-white/10 pl-4 pr-1">
                    <button onClick={prevVideo} className="text-white/60 hover:text-white transition-colors">
                        <SkipBack size={18} fill="currentColor" />
                    </button>
                    <button onClick={togglePlay} className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                    </button>
                    <button onClick={nextVideo} className="text-white/60 hover:text-white transition-colors">
                        <SkipForward size={18} fill="currentColor" />
                    </button>
                </div>
            </motion.header>
        </div>
    );
};