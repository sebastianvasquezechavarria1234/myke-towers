import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { motion, AnimatePresence } from "framer-motion";
import { CardSkeleton } from "./Skeleton";
import { videos as staticVideos } from "../../../data/staticData";

export const Musica = () => {
    const [videos, setVideos] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setVideos(staticVideos);
        setLoading(false);
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
        <section id="musica-section" className="mt-[100px] md:mt-[230px] max-w-[1200px] mx-auto px-[10px] md:px-6 pb-20">
            <h1 className="mb-[40px] md:mb-[60px] text-center">
                Lo mejor de
                <span className="md:pl-[20px] font-secundary block md:inline">
                    Myke towers
                </span>
            </h1>

            {/* GRID CON SKELETONS Y REVEAL */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[10px] md:gap-x-6 md:gap-y-16 p-0">
                {loading ? (
                    [...Array(9)].map((_, idx) => <CardSkeleton key={idx} />)
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