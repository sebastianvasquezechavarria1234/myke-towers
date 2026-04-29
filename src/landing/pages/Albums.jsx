import React, { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { motion } from "framer-motion";
import { AlbumCard } from "../components/home/AlbumCard";

export const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/albums")
            .then(res => res.json())
            .then(data => {
                setAlbums(data);
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
                    >
                        <p className="italic mb-[20px] text-[var(--blue)] uppercase tracking-widest text-[10px]">#Legado Musical · Marcando la historia</p>
                        <h1 className="leading-tight">
                            Cada álbum es un nuevo capítulo, 
                            <span className="pl-[10px] font-secundary text-[var(--blue)] block md:inline">
                                definiendo el sonido
                            </span>
                            de una generación.
                        </h1>
                    </motion.div>
                </header>

                {/* GRID DE ÁLBUMES — Sincronizado con el estilo de música de Home */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16">
                    {albums
                        .sort((a, b) => b.year - a.year)
                        .map((album, idx) => (
                            <motion.div
                                key={album.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                            >
                                <AlbumCard album={album} index={idx} />
                            </motion.div>
                        ))}
                </div>
            </section>
        </Layout>
    );
};
