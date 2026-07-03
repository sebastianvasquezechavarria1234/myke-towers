import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useVideo } from "../../context/VideoContext";
import { Play, Pause, SkipBack, SkipForward, Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { label: "Inicio", to: "/" },
    { label: "Álbumes", to: "/albums" },
    { label: "Biografía", to: "/biografia" },
    { label: "API Docs", to: "/api-docs" },
    { label: "Sitio Oficial", to: "https://www.myketowerspr.com/", external: true },
];

export const Header = () => {
    const { currentVideo, isPlaying, togglePlay, nextVideo, prevVideo, isMuted } = useVideo();
    const [scrolled, setScrolled] = useState(false);
    const [scrollingUp, setScrollingUp] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const parseDuration = (timeStr) => {
        if (!timeStr) return 180;
        const parts = timeStr.split(':').map(Number);
        if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
        if (parts.length === 2) return parts[0] * 60 + parts[1];
        return 180;
    };

    // Reset progress when video changes
    useEffect(() => {
        setCurrentTime(0);
        setProgress(0);
    }, [currentVideo]);

    // Timer logic
    useEffect(() => {
        let interval = null;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(prev => {
                    const next = prev + 1;
                    const total = parseDuration(currentVideo?.duracion);
                    setProgress(Math.min((next / total) * 100, 100));
                    return next;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentVideo]);

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

    const isExpanded = (!scrolled || isHovered || scrollingUp) && !isMenuOpen;

    // Función para formatear vistas (ej: 1.2M, 13k)
    const formatViews = (num) => {
        if (!num) return "Myke Towers";
        const n = Number(num);
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M vistas";
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k vistas";
        return n + " vistas";
    };

    return (
        <>
            <div 
                className="fixed top-5 left-0 right-0 flex justify-center z-50 pointer-events-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.header
                layout
                initial={{ opacity: 0, y: -100, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17, 
                    mass: 1.2,
                    layout: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                        mass: 1.2
                    }
                }}
                className="pointer-events-auto relative bg-black/40 backdrop-blur-2xl border-t border-l border-r border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center px-0 py-0 rounded-[40px]"
            >
                <div className="absolute inset-0 overflow-hidden rounded-[40px] pointer-events-none z-0">
                    {/* DYNAMIC BACKGROUND IMAGE (VERY FAINT) */}
                    <AnimatePresence>
                        {currentVideo?.imagen && (
                            <motion.div
                                key={currentVideo.imagen}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.15 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0"
                            >
                                <img 
                                    src={currentVideo.imagen} 
                                    alt="" 
                                    className="w-full h-full object-cover blur-3xl scale-150"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {/* CONTENT WRAPPER */}
                <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 17, mass: 1.2 }}
                    className="relative z-10 flex items-center"
                >
                    {/* LADO IZQUIERDO: DISCO + TITULO */}
                    <motion.div
                        layout
                        className="relative flex-shrink-0 p-0.5 flex items-center gap-3 pr-2"
                    >
                    <div className="w-11 h-11 rounded-full border-2 border-white/20 overflow-hidden bg-young-king/10 flex items-center justify-center shadow-lg ml-0.5 relative flex-shrink-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentVideo?.id}
                                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: 1,
                                    filter: "blur(0px)",
                                    rotate: isPlaying ? 360 : 0 
                                }}
                                exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                                transition={{ 
                                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                                    default: { duration: 0.4 }
                                }}
                                className="w-full h-full"
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
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute w-3 h-3 bg-white/40 rounded-full shadow-inner z-10" />
                    </div>

                    <div className="flex flex-col justify-center max-w-[150px] overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentVideo?.id}
                                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                transition={{ duration: 0.4 }}
                            >
                                <h3 className="text-white font-secundary text-[22px] md:text-[30px] font-thin truncate whitespace-nowrap leading-none mt-1">
                                    {currentVideo?.titulo?.toLowerCase() || "young king"}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-white/25 !text-[10px] md:!text-[13px] truncate leading-none block mb-0">
                                        {currentVideo?.vistas ? formatViews(currentVideo.vistas) : "myke towers"}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* DIVISOR 1 (Solo si expandido y no móvil) */}
                <AnimatePresence mode="popLayout">
                    {isExpanded && (
                        <motion.div 
                            layout
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17, mass: 1.2 }}
                            className="hidden lg:block w-px h-6 bg-white/10 mx-1.5"
                        />
                    )}
                </AnimatePresence>

                {/* CENTRO: NAV ITEMS (Solo en Expanded y Desktop) */}
                <AnimatePresence mode="popLayout">
                    {isExpanded && (
                        <motion.nav
                            layout
                            initial={{ opacity: 0, scale: 0.9, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -10 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 400, 
                                damping: 17,
                                mass: 1.2
                            }}
                            className="hidden lg:flex items-center overflow-hidden"
                        >
                            <ul className="flex items-center gap-3 px-4">
                                    {NAV_ITEMS.map((item) => (
                                        <li key={item.label}>
                                            {item.external ? (
                                                <motion.a
                                                    href={item.to}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="relative group block px-2 py-1"
                                                >
                                                    <span className="text-white/60 group-hover:text-white transition-colors text-[14px] font-medium whitespace-nowrap block">
                                                        {item.label}
                                                    </span>
                                                    <motion.div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300" />
                                                </motion.a>
                                            ) : (
                                                <Link to={item.to}>
                                                    <motion.div
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="relative group px-2 py-1"
                                                    >
                                                        <span className="text-white/60 group-hover:text-white transition-colors text-[14px] font-medium whitespace-nowrap block">
                                                            {item.label}
                                                        </span>
                                                        <motion.div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300" />
                                                    </motion.div>
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                            </ul>
                        </motion.nav>
                    )}
                </AnimatePresence>

                {/* HAMBURGER MENU BUTTON (Solo en móvil) */}
                <div className="lg:hidden flex items-center pr-2">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-3 text-white/60 hover:text-white transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* DIVISOR 2 (Solo en Desktop o si el menu está cerrado) */}
                <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 17, mass: 1.2 }}
                    className="hidden lg:block w-px h-6 bg-white/10 mx-1.5" 
                />

                {/* LADO DERECHO: CONTROLES */}
                <motion.div 
                    layout
                    transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 17,
                        mass: 1.2
                    }}
                    className="flex items-center gap-1 md:gap-1.5 pl-1 pr-2 py-0.5"
                >
                    {/* VISUALIZER (Oculto en móvil muy pequeño) */}
                    <div className="hidden sm:flex items-end gap-0.5 h-3 px-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ 
                                    height: isPlaying ? [4, 12, 6, 10, 4] : 4,
                                    opacity: isPlaying ? 1 : 0.3
                                }}
                                transition={{ 
                                    duration: 0.8, 
                                    repeat: isPlaying ? Infinity : 0, 
                                    delay: i * 0.1 
                                }}
                                className="w-[2px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            />
                        ))}
                    </div>

                    <button onClick={prevVideo} className="hidden md:block text-white/60 hover:text-white transition-colors p-1">
                        <SkipBack size={14} fill="currentColor" />
                    </button>
                    <button onClick={togglePlay} className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        {isPlaying && !isMuted ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
                    </button>
                    <button onClick={nextVideo} className="text-white/60 hover:text-white transition-colors p-1">
                        <SkipForward size={14} fill="currentColor" />
                    </button>
                </motion.div>
                </motion.div>

                {/* PROGRESS BAR AS BOTTOM BORDER (1PX) */}
                <div className="absolute inset-0 overflow-hidden rounded-[40px] pointer-events-none z-20">
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.5 }}
                            className="h-full bg-white/80 shadow-[0_0_5px_white]"
                        />
                    </div>
                </div>
            </motion.header>
        </div>

            {/* MOBILE FULL-SCREEN MENU */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 lg:hidden flex items-center bg-black/70 backdrop-blur-2xl"
                    >
                        {/* X close button - top right */}
                        <div className="absolute top-6 right-6 z-10">
                            <button 
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-white/60 hover:text-white transition-colors"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Nav items aligned left */}
                        <ul className="flex flex-col gap-8 pl-10">
                            {NAV_ITEMS.map((item, idx) => (
                                <motion.li 
                                    key={item.label}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.08 }}
                                >
                                    {item.external ? (
                                        <a 
                                            href={item.to} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-white/60 hover:text-white !text-4xl font-secundary transition-colors"
                                        >
                                            {item.label.toLowerCase()}
                                        </a>
                                    ) : (
                                        <Link 
                                            to={item.to}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-white/60 hover:text-white !text-4xl font-secundary transition-colors"
                                        >
                                            {item.label.toLowerCase()}
                                        </Link>
                                    )}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;