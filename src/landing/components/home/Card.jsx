import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Card = ({ video, index }) => {
    const [hovered, setHovered] = useState(false);

    const formatTitle = (text) => {
        if (!text) return "Sin título";
        const lower = text.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

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
                {/* IMG: Animación de escala suave */}
                <motion.img
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0"
                    src={video?.imagen || "https://static.wixstatic.com/media/538d7e_5f608dd0e8dd4d97b239a45c754f0e32~mv2.jpg"}
                    alt={video?.titulo || "Myke Towers Video Thumbnail"}
                    loading="lazy"
                    animate={{ scale: hovered ? 1 : 1.05 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                />

                {/* OVERLAY MINIMALISTA (Solo icono de play) */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                background: "rgba(0,0,0,0.4)",
                                backdropFilter: "blur(2px)"
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center shadow-2xl"
                            >
                                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CARD BODY — Numero y Titulo en bloque vertical */}
            <div className="mt-6 flex flex-col gap-2">
                <span className="font-secundary text-white/10 text-4xl leading-none">
                    {displayIndex}
                </span>
                <h4 className="font-secundary text-3xl text-white/80 group-hover:text-white transition-colors duration-300 leading-tight line-clamp-2">
                    {formatTitle(video?.titulo)}
                </h4>
            </div>
        </a>
    );
};