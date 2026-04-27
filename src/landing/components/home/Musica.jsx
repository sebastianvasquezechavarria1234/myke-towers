import React, { useEffect, useState } from "react";
import { Card } from "./Card";

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

            {loading && (
                <p className="text-center opacity-60 text-lg animate-pulse">
                    Cargando videos...
                </p>
            )}

            {error && (
                <p className="text-center text-red-400 opacity-80">
                    ⚠ {error}
                </p>
            )}

            {/* GRID */}
            {!loading && !error && (
                <div className="grid grid-cols-3 gap-[20px]">
                    {videos.slice(0, 9).map((video) => (
                        <Card key={video.id} video={video} />
                    ))}
                </div>
            )}
        </section>
    );
};