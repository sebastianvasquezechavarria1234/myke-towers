import React, { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const AlbumCard = ({ album, index }) => {
    const [hovered, setHovered] = useState(false);
    const displayIndex = String(index + 1).padStart(2, '0');

    const formatTitle = (text) => {
        if (!text) return "Sin título";
        const lower = text.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    return (
        <Link
            to={`/album/${album.id}`}
            className="block group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative overflow-hidden" style={{ height: "350px" }}>
                {/* IMG: Animación de escala suave y grayscale */}
                <motion.img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0"
                    src={album.image}
                    alt={album.title}
                    loading="lazy"
                    animate={{ scale: hovered ? 1 : 1.05 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                />

                {/* OVERLAY MINIMALISTA (Icono de Link/Ver) */}
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
                                <div className="text-white text-xs uppercase tracking-widest font-bold">Ver</div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CARD BODY — Numero y Titulo en bloque vertical (Igual que Música) */}
            <div className="mt-6 flex flex-col gap-2">
                <span className="font-secundary text-white/10 text-4xl leading-none">
                    {displayIndex}
                </span>
                <h4 className="font-secundary text-3xl text-white/80 group-hover:text-white transition-colors duration-300 leading-tight">
                    {formatTitle(album.title)}
                </h4>
                <p className="text-white/20 text-[11px] uppercase tracking-[0.2em] font-light mt-1">
                    {album.year} · {album.format}
                </p>
            </div>
        </Link>
    );
};

export const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/albums")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => parseInt(b.year) - parseInt(a.year));
                setAlbums(sorted);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching albums:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="h-screen flex items-center justify-center">
                    <span className="text-white/20 font-secundary text-4xl animate-pulse">Cargando Discografía...</span>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="pt-[160px] pb-[120px] max-w-[1200px] mx-auto px-6">
                <header className="mb-24 text-center max-w-[800px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="italic mb-[20px] text-[var(--blue)]">#Young King Legacy. El sonido de una era.</p>
                        <h1>
                            Explora la discografía completa y el 
                            <span className="pl-[10px] font-secundary text-[var(--blue)] block md:inline">
                                legado musical
                            </span>
                            que ha redefinido el género urbano.
                        </h1>
                    </motion.div>
                </header>

                {/* GRID UNIFICADO CON LA SECCIÓN DE MÚSICA DE LA HOME */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-20">
                    {albums.map((album, idx) => (
                        <motion.div
                            key={album.id}
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.6, 
                                delay: (idx % 3) * 0.1,
                                ease: [0.43, 0.13, 0.23, 0.96]
                            }}
                        >
                            <AlbumCard album={album} index={idx} />
                        </motion.div>
                    ))}
                </div>
            </section>
        </Layout>
    );
};
