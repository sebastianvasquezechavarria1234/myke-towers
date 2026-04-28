import React, { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
            <section className="pt-[160px] pb-[120px] max-w-[1400px] mx-auto px-6">
                <header className="mb-20 text-center max-w-[800px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="italic mb-[20px] text-[var(--green)]">#Coleccionando hits. Marcando la historia</p>
                        <h1>
                            Cada proyecto es un capítulo nuevo,
                            <span className="pl-[10px] font-secundary text-[var(--blue)] block md:inline">
                                definiendo el sonido
                            </span>
                            de una generación que no conoce de
                            <span className="pl-[10px] font-secundary text-[var(--blue)] block md:inline">
                                límites ni fronteras
                            </span>
                        </h1>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {albums.map((album, idx) => (
                        <motion.div
                            key={album.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group"
                        >
                            <Link to={`/album/${album.id}`} className="block relative aspect-square overflow-hidden bg-white/5">
                                {/* IMAGE */}
                                <motion.img 
                                    src={album.image} 
                                    alt={album.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                                />
                                
                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* INFO ON HOVER */}
                                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-[var(--green)] font-bold text-[10px] tracking-[0.3em] uppercase mb-2">
                                        {album.year} · {album.format}
                                    </p>
                                    <h3 className="text-3xl font-black uppercase leading-none text-white">
                                        {album.title}
                                    </h3>
                                </div>
                            </Link>
                            
                            <div className="mt-6 flex justify-between items-center px-2">
                                <div>
                                    <h3 className="text-white/80 font-bold uppercase text-sm tracking-widest">{album.title}</h3>
                                    <p className="text-white/30 text-xs mt-1">{album.format}</p>
                                </div>
                                <span className="text-white/10 text-4xl font-black">{idx + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </Layout>
    );
};
