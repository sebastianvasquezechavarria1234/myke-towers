import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Card = ({ video }) => {
    const [hovered, setHovered] = useState(false);

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
                    alt={video?.titulo || "Myke Towers"}
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
                            className="absolute inset-0 flex flex-col justify-end p-[20px]"
                            style={{
                                background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
                            }}
                        >
                            <motion.div
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
            <div className="mt-[20px]">
                <h4 className="font-secundary">{video?.titulo || "Sin título"}</h4>
                <p>Myke towers</p>
                <p>{video?.publicado || ""}</p>
            </div>
        </a>
    );
};