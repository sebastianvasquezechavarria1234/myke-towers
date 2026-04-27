import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import MalDeAmores from '/mal-de-amores.avif'
import Sport from '/sport.avif'

export const Hero = () => {
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch("http://localhost:3000/videos");
                const data = await res.json();
                if (data.videos && data.videos.length > 0) {
                    setVideos(data.videos);
                    // Seleccionar un video aleatorio al inicio
                    const randomIndex = Math.floor(Math.random() * data.videos.length);
                    setCurrentVideo(data.videos[randomIndex]);
                }
            } catch (error) {
                console.error("Error fetching videos for hero:", error);
            }
        };

        fetchVideos();
    }, []);

    const handleVideoEnd = () => {
        if (videos.length > 0) {
            const randomIndex = Math.floor(Math.random() * videos.length);
            setCurrentVideo(videos[randomIndex]);
        }
    };

    return (
        <section className="relative max-w-[800px] mx-auto px-[10px] text-center pt-[120px]">
            {/* HERO TEXT */}
            <div className="relative z-20">
                <p className="italic mb-[20px] text-[var(--green)]">#No sigo tendencias. Yo soy la tendencia</p>
                <h1>
                    Solo quienes se
                    {/* FONT SECUNDARY */}
                    <span className="pl-[10px] font-secundary text-[var(--blue)]">
                        atreven a ser diferentes
                    </span>
                    , tienen el poder de escribir su
                    {/* FONT SECUNDARY */}
                    <span className="pl-[10px] font-secundary text-[var(--blue)]">
                        propia historia
                    </span>
                </h1>
            </div>


            {/* PICTURE */}
            <picture className="mt-[60px] relative flex justify-center item-center">
                {/* video */}
                <div className="z-30 w-[400px] h-[400px] block relative overflow-hidden bg-black">
                    {currentVideo ? (
                        <div className="w-full h-full scale-150"> 
                            <ReactPlayer
                                url={currentVideo.url}
                                playing={true}
                                muted={true}
                                width="100%"
                                height="100%"
                                onEnded={handleVideoEnd}
                                config={{
                                    youtube: {
                                        playerVars: { showinfo: 0, controls: 0, modestbranding: 1 }
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-zinc-900 animate-pulse flex items-center justify-center">
                            <span className="text-white/20 text-xs uppercase tracking-widest">Cargando visuales...</span>
                        </div>
                    )}

                    {/* MAL DE AMORES */}
                    <div className="absolute top-0 left-[-10%] -z-10 w-[400px] h-[400px] block rotate-[-10deg] translate-y-[35px]">
                        <img
                            className="w-full h-full object-cover"
                            src={MalDeAmores}
                            alt="Mal de amores" />
                    </div>

                    {/* SPORT */}
                    <div className="absolute top-0 right-[-10%] -z-10 w-[400px] h-[400px] block rotate-[10deg] translate-y-[35px]">
                        <img
                            className="w-full h-full object-cover"
                            src={Sport}
                            alt="Mal de amores" />
                    </div>
                </div>
            </picture>
        </section>
    )

}