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
                initial={{ opacity: 0, y: -100, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    width: "auto",
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 20, 
                    mass: 1.2 
                }}
                className="pointer-events-auto relative bg-black/40 backdrop-blur-2xl border-t border-l border-r border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex items-center px-0 py-0 rounded-[40px]"
            >
                {/* DYNAMIC BACKGROUND IMAGE (VERY FAINT) */}
                <AnimatePresence>
                    {currentVideo?.imagen && (
                        <motion.div
                            key={currentVideo.imagen}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-0 pointer-events-none"
                        >
                            <img 
                                src={currentVideo.imagen} 
                                alt="" 
                                className="w-full h-full object-cover blur-3xl scale-150"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* CONTENT WRAPPER */}
                <div className="relative z-10 flex items-center">
                    {/* LADO IZQUIERDO: DISCO + TITULO */}
                    <motion.div
                        layout
                        className="relative flex-shrink-0 p-0.5 flex items-center gap-3 pr-2"
                    >
                        <div className="w-11 h-11 rounded-full border-2 border-white/20 overflow-hidden bg-black flex items-center justify-center shadow-lg ml-0.5 relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentVideo?.id}
                                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                                    animate={{ 
                                        opacity: 1, 
                                        scale: 1, 
                                        filter: "blur(0px)",
                                        rotate: isPlaying ? 360 : 0 
                                    }}
                                    exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
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
                                    initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-white font-secundary text-[30px] font-thin truncate whitespace-nowrap leading-none mt-1">
                                        {currentVideo?.titulo?.toLowerCase() || "young king"}
                                    </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-white/25 text-[13px] truncate leading-none block mb-0">
                                        {currentVideo?.vistas ? formatViews(currentVideo.vistas) : "myke towers"}
                                    </span>
                                    {/* VISUALIZER BARS (RESTORED) */}
                                    <div className="flex items-end gap-[2px] h-2 mb-0.5">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <motion.div
                                                key={i}
                                                animate={{
                                                    height: isPlaying ? [4, 8, 3, 7, 4][i % 5] : 2,
                                                    opacity: isPlaying ? 1 : 0.3
                                                }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: isPlaying ? Infinity : 0,
                                                    delay: i * 0.1
                                                }}
                                                className="w-[2px] bg-white rounded-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
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
                    <div className="flex items-end gap-0.5 h-3 px-2">
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
                </div>
                {/* PROGRESS BAR AS BOTTOM BORDER (1PX) */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 z-20 overflow-hidden rounded-b-[40px]">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.5 }}
                        className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    />
                </div>
            </motion.header>
        </div>
    );
};