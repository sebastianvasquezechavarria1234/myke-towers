import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MalDeAmores from '/mal-de-amores.avif'
import Sport from '/sport.avif'
import { useVideo } from "../../../context/VideoContext";

export const Hero = ({ 
    tagline = "#No sigo tendencias. Yo soy la tendencia", 
    title, 
    images = [MalDeAmores, null, Sport],
    showVideo = true,
    hasBorder = true
}) => {
    const { currentVideo, isPlaying, nextVideo } = useVideo();
    const containerRef = useRef(null);
    
    // PARALLAX LOGIC
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [-10, -20]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [10, 20]);

    // Lógica para saltar al siguiente video cuando este termine
    useEffect(() => {
        if (!currentVideo || !isPlaying || !showVideo) return;

        const parseDuration = (timeStr) => {
            if (!timeStr) return 180;
            const parts = timeStr.split(':').map(Number);
            if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
            if (parts.length === 2) return parts[0] * 60 + parts[1];
            return 180;
        };

        const durationSeconds = parseDuration(currentVideo.duracion);
        const timer = setTimeout(() => {
            nextVideo();
        }, (durationSeconds + 2) * 1000);

        return () => clearTimeout(timer);
    }, [currentVideo, isPlaying, nextVideo, showVideo]);

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = showVideo ? getYouTubeId(currentVideo?.url) : null;

    // Default title if none provided
    const defaultTitle = (
        <>
            Solo quienes se
            <span className="pl-[10px] font-secundary text-[var(--blue)]">
                atreven a ser diferentes
            </span>
            , tienen el poder de escribir su
            <span className="pl-[10px] font-secundary text-[var(--blue)]">
                propia historia
            </span>
        </>
    );

    return (
        <section ref={containerRef} className="relative max-w-[1200px] mx-auto px-6 text-center pt-[100px] md:pt-[120px]">
            {/* HERO TEXT */}
            <div className="relative z-20 max-w-[700px] mx-auto">
                <p className="italic mb-[20px] text-[var(--green)] text-sm md:text-base">{tagline}</p>
                <h1>{title || defaultTitle}</h1>
            </div>


            {/* PICTURE CONTAINER */}
            <div className="mt-[40px] md:mt-[60px] relative flex justify-center items-center h-[350px] md:h-[450px]">
                
                {/* DECORATIVE IMAGES WITH PARALLAX */}
                <motion.div 
                    style={{ y: y1, rotate: rotate1 }}
                    className="absolute top-[20px] md:top-[35px] left-[-10%] md:left-[0%] lg:left-[5%] z-10 w-[180px] h-[180px] md:w-[400px] md:h-[400px] block"
                >
                    <img
                        className="w-full h-full object-cover opacity-30 md:opacity-100"
                        src={images[0]}
                        alt="Myke Towers" 
                        loading="lazy"
                    />
                </motion.div>

                <motion.div 
                    style={{ y: y2, rotate: rotate2 }}
                    className="absolute top-[20px] md:top-[35px] right-[-10%] md:right-[0%] lg:right-[5%] z-10 w-[180px] h-[180px] md:w-[400px] md:h-[400px] block"
                >
                    <img
                        className="w-full h-full object-cover opacity-30 md:opacity-100"
                        src={images[2]}
                        alt="Myke Towers" 
                        loading="lazy"
                    />
                </motion.div>

                {/* MAIN PLAYER/IMAGE CONTAINER */}
                <div className="relative z-30 group">
                    <div className={`w-[220px] h-[220px] md:w-[400px] md:h-[400px] overflow-hidden bg-black ${hasBorder ? 'border border-white/10' : 'border-0'} shadow-2xl relative`}>
                        {showVideo ? (
                            <>
                                {videoId ? (
                                    <div className="absolute inset-0 scale-[1.5] w-full h-full origin-center">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1&disablekb=1&widget_referrer=${encodeURIComponent(window.location.origin)}&origin=${encodeURIComponent(window.location.origin)}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            className="w-full h-full object-cover pointer-events-none"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-zinc-900 animate-pulse flex items-center justify-center">
                                        <span className="text-white/20 text-xs uppercase tracking-widest font-bold">Cargando Video...</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 z-40 bg-transparent"></div>
                            </>
                        ) : (
                            <img 
                                src={images[1]} 
                                className="w-full h-full object-cover" 
                                alt="Myke Towers" 
                            />
                        )}
                    </div>

                    {/* TITULO FUERA DE LA CARD CON ANIMACIÓN (Solo para video) */}
                    {showVideo && (
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentVideo?.titulo}
                                initial={{ opacity: 0, x: -50, filter: "blur(20px)" }}
                                animate={{ opacity: 1, x: -30, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute top-[calc(100%-40px)] md:top-[calc(100%-70px)] left-0 z-50 pointer-events-none text-left transform rotate-[-6deg] max-w-[200px] md:max-w-[350px]"
                            >
                                <h2 className="font-secundary text-white text-[40px] md:text-[70px] leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] line-clamp-2">
                                    {currentVideo?.titulo.toLowerCase()}
                                </h2>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </section>
    )

}