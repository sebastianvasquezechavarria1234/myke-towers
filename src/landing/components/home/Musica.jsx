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
    const [visibleCount, setVisibleCount] = useState(9);
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

    const showLess = () => {
        setVisibleCount(9);
        const section = document.getElementById('musica-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="musica-section" className="mt-[230px] max-w-[1200px] mx-auto px-[10px] pb-20">
            <h1 className="mb-[60px] text-center">
                Lo mejor de
                <span className="pl-[20px] font-secundary">
                    Myke towers
                </span>
            </h1>

            {/* GRID CON SKELETONS Y REVEAL */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16">
                {loading ? (
                    [...Array(9)].map((_, idx) => <Skeleton key={idx} />)
                ) : error ? (
                    <p className="col-span-3 text-center text-red-400 opacity-80">⚠ {error}</p>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {videos.slice(0, visibleCount).map((video, idx) => (
                            <motion.div
                                key={video.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: (idx >= visibleCount - 9) ? (idx % 3) * 0.1 : 0,
                                    ease: [0.43, 0.13, 0.23, 0.96]
                                }}
                            >
                                <Card video={video} index={idx} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* BOTONES DE CONTROL */}
            {!loading && (
                <div className="mt-20 flex items-center justify-center gap-10">
                    {/* MOSTRAR MÁS */}
                    {videos.length > visibleCount && (
                        <button
                            onClick={showMore}
                            className="group relative transition-colors duration-300"
                        >
                            <span className="text-white/40 group-hover:text-white text-[13px] font-light transition-colors duration-300">
                                mostrar más
                            </span>
                        </button>
                    )}

                    {/* MOSTRAR MENOS */}
                    {visibleCount > 9 && (
                        <button
                            onClick={showLess}
                            className="group relative transition-colors duration-300"
                        >
                            <span className="text-white/20 group-hover:text-red-400/60 text-[13px] font-light transition-colors duration-300">
                                mostrar menos
                            </span>
                        </button>
                    )}
                </div>
            )}
        </section>
    );
};