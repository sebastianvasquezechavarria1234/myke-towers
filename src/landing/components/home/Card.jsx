import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Card = ({ video, index }) => {
    const [hovered, setHovered] = useState(false);

    const formatTitle = (text) => {
        if (!text) return "Sin título";
        const lower = text.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    // Formatear el índice a 01, 02...
    const displayIndex = String((index || 0) + 1).padStart(2, '0');

    return (
        <a
            className="block group"
            target="_blank"
            rel="noreferrer"
            href={video?.url || "#"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative overflow-hidden" style={{ height: "350px" }}>
                {/* BADGE DE NUEVO / TRENDING */}
                {video?.esNuevo && (
                    <div className="absolute top-4 left-4 z-50">
                        <span className="bg-[var(--blue)] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">
                            Nuevo
                        </span>
                    </div>
                )}

                {/* IMG: scale 1.1 por defecto → 1 en hover */}
                <motion.img
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0"
                    src={video?.imagen || "https://static.wixstatic.com/media/538d7e_5f608dd0e8dd4d97b239a45c754f0e32~mv2.jpg"}
                    alt={video?.titulo || "Myke Towers Video Thumbnail"}
                    loading="lazy"
                    animate={{ scale: hovered ? 1 : 1.1 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                />

                {/* OVERLAY interior — aparece en hover */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-[20px]"
                            style={{
                                background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
                                backdropFilter: "blur(4px)"
                            }}
                        >
                            {/* PLAY ICON */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-4"
                            >
                                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                            </motion.div>

                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-white text-[10px] uppercase tracking-[0.3em] font-light"
                            >
                                Reproducir ahora
                            </motion.span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* DURACIÓN EN LA IMAGEN */}
                <div className="absolute bottom-4 right-4 z-20">
                    <span className="text-[10px] text-white/60 font-mono">
                        {video?.duracion}
                    </span>
                </div>
            </div>

            {/* CARD BODY */}
            <div className="mt-6 flex gap-6 items-start">
                {/* NÚMERO DE TRACK */}
                <span className="font-secundary text-white/10 text-4xl leading-none">
                    {displayIndex}
                </span>

                <div className="flex-1 space-y-3">
                    {/* CATEGORÍA Y ÁLBUM */}
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[var(--blue)] font-bold uppercase tracking-widest italic">
                            {video?.tipo}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[10px] text-white/40 font-light uppercase tracking-wider">
                            {video?.album}
                        </span>
                    </div>

                    {/* TÍTULO */}
                    <h4 className="font-secundary text-3xl text-white group-hover:text-[var(--blue)] transition-colors duration-300 leading-none line-clamp-2">
                        {formatTitle(video?.titulo)}
                    </h4>

                    {/* CRÉDITOS */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[9px] text-white/20 uppercase tracking-widest">
                            Dir. {video?.director}
                        </span>
                        <span className="text-[9px] text-white/20 uppercase tracking-widest">
                            {video?.vistas.toLocaleString()} vistas
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
};