import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Card = ({ video }) => {
    const [hovered, setHovered] = useState(false);

    const formatTitle = (text) => {
        if (!text) return "Sin título";
        const lower = text.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    return (
        <a
            className="block"
            target="_blank"
            rel="noreferrer"
            href={video?.url || "#"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* PICTURE con overflow hidden para que el scale no se salga */}
            <div className="relative overflow-hidden" style={{ height: "350px" }}>
                {/* IMG: scale 1.1 por defecto → 1 en hover */}
                <motion.img
                    className="w-full h-full object-cover"
                    src={video?.imagen || "https://static.wixstatic.com/media/538d7e_5f608dd0e8dd4d97b239a45c754f0e32~mv2.jpg"}
                    alt={video?.titulo || "Myke Towers Video Thumbnail"}
                    loading="lazy"
                    width="400"
                    height="350"
                    animate={{ scale: hovered ? 1 : 1.1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                />

                {/* OVERLAY interior — aparece en hover */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-[20px]"
                            style={{
                                background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
                            }}
                        >
                            {/* PLAY ICON */}
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-16 h-16 rounded-full bg-[var(--blue)]/80 backdrop-blur-md flex items-center justify-center mb-8 shadow-2xl"
                            >
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                            </motion.div>

                            <motion.div
                                className="w-full"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {video?.vistas && (
                                    <p className="text-white/80 text-sm">
                                        👁 {Number(video.vistas).toLocaleString()} vistas
                                    </p>
                                )}
                                {video?.duracion && (
                                    <p className="text-white/70 text-sm">⏱ {video.duracion}</p>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CARD BODY — info exterior, siempre visible */}
            <div className="mt-[15px] space-y-1">
                <h4 className="font-secundary text-2xl truncate whitespace-nowrap overflow-hidden">
                    {formatTitle(video?.titulo)}
                </h4>
                <div className="text-white/40 text-[13px] font-light leading-relaxed">
                    <p>vistas: {Number(video?.vistas || 0).toLocaleString()}</p>
                    <p>duracion: {video?.duracion || ""}</p>
                    <p>publicado: {video?.publicado || "26 de abril de 2027"}</p>
                </div>
            </div>
        </a>
    );
};