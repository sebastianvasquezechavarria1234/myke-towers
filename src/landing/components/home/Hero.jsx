import React, { useEffect } from "react";
import MalDeAmores from '/mal-de-amores.avif'
import Sport from '/sport.avif'
import { useVideo } from "../../../context/VideoContext";

export const Hero = () => {
    const { currentVideo, isPlaying, nextVideo } = useVideo();

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


            {/* PICTURE CONTAINER */}
            <div className="mt-[60px] relative flex justify-center items-center h-[400px]">
                
                {/* DECORATIVE IMAGES */}
                <div className="absolute top-[35px] left-[-5%] md:left-[-10%] z-10 w-[400px] h-[400px] block rotate-[-10deg]">
                    <img
                        className="w-full h-full object-cover opacity-40 md:opacity-100"
                        src={MalDeAmores}
                        alt="Mal de amores" />
                </div>

                <div className="absolute top-[35px] right-[-5%] md:right-[-10%] z-10 w-[400px] h-[400px] block rotate-[10deg]">
                    <img
                        className="w-full h-full object-cover opacity-40 md:opacity-100"
                        src={Sport}
                        alt="Sport" />
                </div>

                {/* MAIN VIDEO PLAYER */}
                <div className="z-30 w-[400px] h-[400px] relative overflow-hidden bg-black border border-white/10 shadow-2xl">
                    {currentVideo ? (
                        <div className="absolute inset-0 pointer-events-none">
                            <iframe
                                src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1&origin=${window.location.origin}${!isPlaying ? '&pause=1' : ''}`}
                                className="w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
                                allow="autoplay; encrypted-media"
                                title="Hero Video"
                                key={currentVideo.id + isPlaying} // Forzamos recarga si cambia el video o el estado de play (aunque pausar YT via URL es limitado)
                            ></iframe>
                            <div className="absolute inset-0 z-40 bg-transparent"></div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-zinc-900 animate-pulse flex items-center justify-center">
                            <span className="text-white/20 text-xs uppercase tracking-widest font-bold">Cargando...</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )

}