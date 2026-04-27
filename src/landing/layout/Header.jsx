import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useVideo } from "../../context/VideoContext";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const NAV_ITEMS = [
    { label: "Inicio", to: "/" },
    { label: "Biografía", to: "/biografia" },
    { label: "Sitio Oficial", to: "https://www.myketowerspr.com/", external: true },
    { label: "Tour", to: "https://www.myketowerspr.com/tour", external: true },
    { label: "Tienda", to: "https://store.myketowerspr.com/", external: true },
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
            
            if (current < lastScrollY.current && current > 50) {
                setScrollingUp(true);
            } else {
                setScrollingUp(false);
            }

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

    const isExpanded = !scrolled || isHovered || scrollingUp;

    // Función para formatear vistas (ej: 1.2M, 13k)
    const formatViews = (num) => {
        if (!num) return "Myke Towers";
        const n = Number(num);
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M vistas";
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k vistas";
        return n + " vistas";
    };

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
                    width: "auto",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
                className="pointer-events-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden flex items-center px-0 py-0 rounded-[40px]"
            >
                {/* LADO IZQUIERDO: DISCO + TITULO */}
                <motion.div
                    layout
                    className="relative flex-shrink-0 p-0.5 flex items-center gap-3 pr-2"
                >
                    <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-11 h-11 rounded-full border-2 border-white/20 overflow-hidden bg-black flex items-center justify-center shadow-lg"
                    >
                        {currentVideo?.imagen ? (
                            <img 
                                src={currentVideo.imagen} 
                                alt="Current Song Disc" 
                                className="w-full h-full object-cover opacity-80" 
                                loading="lazy"
                                width="44"
                                height="44"
                            />
                        ) : (
                            <div className="w-full h-full bg-young-king/20" />
                        )}
                        <div className="absolute w-3 h-3 bg-white/40 rounded-full shadow-inner" />
                    </motion.div>

                    {/* TITULO DE LA CANCION Y VISTAS */}
                    {currentVideo && (
                        <div className="max-w-[150px] overflow-hidden"> 
                            <h3 className="text-white font-secundary text-[30px] font-thin truncate whitespace-nowrap leading-none mt-1">
                                {currentVideo.titulo.toLowerCase()}
                            </h3>
                            <span className="text-white/25 text-[13px] truncate leading-none block mb-0">
                                {formatViews(currentVideo.vistas)}
                            </span>
                        </div>
                    )}
                </motion.div>

                {/* DIVISOR 1 (Solo si expandido) */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="w-px h-6 bg-white/10 mx-1.5"
                        />
                    )}
                </AnimatePresence>

                {/* CENTRO: NAV ITEMS (Solo en Expanded) */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.nav
                            layout
                            initial={{ opacity: 0, width: 0, x: -10 }}
                            animate={{ opacity: 1, width: "auto", x: 0 }}
                            exit={{ opacity: 0, width: 0, x: -10 }}
                            className="flex items-center overflow-hidden"
                        >
                            <ul className="flex items-center gap-6 px-4">
                                {NAV_ITEMS.map((item) => (
                                    <li key={item.label}>
                                        {item.external ? (
                                            <a
                                                href={item.to}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/70 hover:text-white transition-colors text-[16px] font-medium tracking-wide whitespace-nowrap"
                                            >
                                                {item.label}
                                            </a>
                                        ) : (
                                            <Link
                                                to={item.to}
                                                className="text-white/70 hover:text-white transition-colors text-[16px] font-medium tracking-wide whitespace-nowrap"
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </motion.nav>
                    )}
                </AnimatePresence>

                {/* DIVISOR 2 */}
                <div className="w-px h-6 bg-white/10 mx-1.5" />

                {/* LADO DERECHO: CONTROLES */}
                <motion.div 
                    layout
                    className="flex items-center gap-1.5 pl-1 pr-2 py-0.5"
                >
                    {/* VISUALIZER */}
                    <div className="flex items-end gap-0.5 h-3 px-2 opacity-40">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ height: isPlaying ? [4, 12, 6, 10, 4] : 4 }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                                className="w-[2px] bg-[var(--blue)] rounded-full"
                            />
                        ))}
                    </div>

                    <button onClick={prevVideo} className="text-white/60 hover:text-white transition-colors p-1">
                        <SkipBack size={14} fill="currentColor" />
                    </button>
                    <button onClick={togglePlay} className="w-11 h-11 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                    </button>
                    <button onClick={nextVideo} className="text-white/60 hover:text-white transition-colors p-1">
                        <SkipForward size={14} fill="currentColor" />
                    </button>
                </motion.div>
            </motion.header>
        </div>
    );
};