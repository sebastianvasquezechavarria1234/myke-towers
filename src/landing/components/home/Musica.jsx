import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { motion } from "framer-motion";

const Skeleton = () => (
    <div className="flex flex-col gap-4">
        <div className="w-full h-[350px] bg-white/5 animate-pulse rounded-sm" />
        <div className="space-y-2">
            <div className="w-3/4 h-6 bg-white/5 animate-pulse rounded" />
            <div className="w-1/2 h-4 bg-white/5 animate-pulse rounded" />
        </div>
    </div>
);

export const Musica = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch("http://localhost:3000/videos");
                if (!res.ok) throw new Error("Error al obtener los videos");
                const data = await res.json();
                setVideos(data.videos || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    return (
        <section className="mt-[200px] max-w-[1200px] mx-auto px-[10px]">
            <h1 className="mb-[30px] text-center">
                Lo mejor de
                <span className="pl-[20px] font-secundary">
                    Myke towers
                </span>
            </h1>

            {/* GRID CON SKELETONS Y REVEAL */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px]">
                {loading ? (
                    [...Array(9)].map((_, idx) => <Skeleton key={idx} />)
                ) : error ? (
                    <p className="col-span-3 text-center text-red-400 opacity-80">⚠ {error}</p>
                ) : (
                    videos.slice(0, 9).map((video, idx) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <Card video={video} />
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    );
};