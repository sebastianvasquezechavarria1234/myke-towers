import React, { useState, useEffect, useRef } from "react";
import { Layout } from "../layout/Layout";
import { Hero } from "../components/home/Hero";
import { Musica } from "../components/home/Musica";
import { SocialWall } from "../components/home/SocialWall";
import { motion, AnimatePresence } from "framer-motion";
import { AlbumCard } from "../components/home/AlbumCard";

export const Home = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await fetch("http://localhost:3000/albums");
                const data = await res.json();
                setAlbums(data);
            } catch (error) {
                console.error("Error fetching albums:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAlbums();
    }, []);

    if (loading) return null;

    return (
        <Layout>
            <Hero />
            <Musica />
            <SocialWall />
            
            {/* DISCOGRAFÍA */}
            <section
                ref={containerRef}
                className="pt-32 pb-0 max-w-[1200px] mx-auto px-6 relative"
            >
                <div className="space-y-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex items-center gap-6"
                    >
                        <div className="flex-1 h-px bg-white/[0.06]" />
                        <div className="text-4xl md:text-5xl text-white flex flex-wrap items-center justify-center gap-x-4 gap-y-2 max-w-[650px] mx-auto text-center leading-tight">
                            <span className="font-bold">Legado</span>
                            <span className="font-secundary text-[var(--blue)] lowercase italic">musical</span>
                            <span className="font-bold">&</span>
                            <span className="font-secundary text-[var(--blue)] lowercase italic">discografía</span>
                            <span className="font-bold">completa</span>
                        </div>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16 relative">
                        {albums
                            .sort((a, b) => b.year - a.year)
                            .map((a, idx) => (
                                <AlbumCard
                                    key={a.id}
                                    album={a}
                                    index={idx}
                                />
                            ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};