import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { motion, AnimatePresence } from "framer-motion";

const Skeleton = () => (
    <div className="flex flex-col gap-4">
        <div className="w-full h-[350px] bg-white/5 animate-pulse rounded-sm" />
        <div className="space-y-2">
            <div className="w-3/4 h-6 bg-white/5 animate-pulse rounded" />
        </div>
    </div>
);

export const Musica = () => {
    const [videos, setVideos] = useState([]);
    const [visibleCount, setVisibleCount] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch("http://localhost:3000/videos");
                if (!res.ok) throw new Error("Error al obtener los videos");
                const data = await res.json();
                setVideos(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    const showMore = () => {
        setVisibleCount(prev => prev + 9);
    };

    return (
        <section className="mt-[230px] max-w-[1200px] mx-auto px-[10px] pb-20">
            <h1 className="mb-[60px] text-center">
                Lo mejor de
                <span className="pl-[20px] font-secundary">
                    Myke towers
                </span>
            </h1>

            {/* GRID CON SKELETONS Y REVEAL */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16">
                {loading ? (
                    [...Array(12)].map((_, idx) => <Skeleton key={idx} />)
                ) : error ? (
                    <p className="col-span-3 text-center text-red-400 opacity-80">⚠ {error}</p>
                ) : (
                    videos.slice(0, visibleCount).map((video, idx) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                        >
                            <Card video={video} index={idx} />
                        </motion.div>
                    ))
                )}
            </div>

            {/* BOTÓN MOSTRAR MÁS */}
            {!loading && videos.length > visibleCount && (
                <div className="mt-24 flex justify-center">
                    <button
                        onClick={showMore}
                        className="group relative px-12 py-4 overflow-hidden border border-white/10 hover:border-white/40 transition-colors duration-500"
                    >
                        <span className="relative z-10 text-white/40 group-hover:text-white text-[11px] uppercase tracking-[0.4em] font-light transition-colors duration-500">
                            Mostrar más
                        </span>
                        {/* EFECTO HOVER DE FONDO */}
                        <div className="absolute inset-0 bg-white/[0.03] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                </div>
            )}
        </section>
    );
};