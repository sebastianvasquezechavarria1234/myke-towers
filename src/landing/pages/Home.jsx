import React, { useState } from "react";
import { Layout } from "../layout/Layout";
import { Hero } from "../components/home/Hero";
import { Musica } from "../components/home/Musica";
import { SocialWall } from "../components/home/SocialWall";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

const DISCOGRAPHY_DATA = [
    {
        label: "Álbumes de estudio",
        items: [
            { year: "2020", title: "Easy Money Baby", img: "/mal-de-amores.avif" },
            { year: "2021", title: "Lyke Mike", img: "/sport.avif" },
            { year: "2023", title: "La vida es una", img: "/mal-de-amores.avif" },
            { year: "2024", title: "La Pantera Negra", img: "/sport.avif" },
            { year: "2025", title: "Island Boyz", img: "/mal-de-amores.avif" },
        ]
    },
    {
        label: "Mixtapes",
        items: [
            { year: "2016", title: "El final del principio", img: "/sport.avif" },
        ]
    },
    {
        label: "EP & otros",
        items: [
            { year: "2020", title: "Para mi ex", img: "/mal-de-amores.avif" },
            { year: "2023", title: "Sweet & Sour", img: "/sport.avif" },
            { year: "2024", title: "Cassette 01", img: "/mal-de-amores.avif" },
        ]
    }
];

const AlbumItem = ({ album, onHover }) => {
    return (
        <div 
            onMouseEnter={() => onHover(album)}
            onMouseLeave={() => onHover(null)}
            className="flex gap-6 items-baseline group cursor-pointer py-3 border-b border-white/[0.03] last:border-0"
        >
            <span className="text-white/10 text-[11px] font-bold shrink-0 group-hover:text-white/40 transition-colors duration-300">
                {album.year}
            </span>
            <span className="text-white/30 text-sm font-light group-hover:text-white group-hover:pl-2 transition-all duration-300">
                {album.title}
            </span>
        </div>
    );
};

export const Home = () => {
    const [hoveredAlbum, setHoveredAlbum] = useState(null);
    const containerRef = React.useRef(null);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Configuración de Spring más sensible y rápida (stiffness alto, mass bajo)
    const springConfig = { stiffness: 400, damping: 30, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Offset para que la imagen aparezca al lado del cursor
        x.set(e.clientX - rect.left + 60); 
        y.set(e.clientY - rect.top - 180);
    };

    return(
        <Layout>
            <Hero />
            
            <section 
                ref={containerRef}
                className="py-32 max-w-[900px] mx-auto px-6 relative"
                onMouseMove={handleMouseMove}
            >
                <div className="space-y-16">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex items-center gap-6"
                    >
                        <div className="flex-1 h-px bg-white/[0.06]" />
                        <span className="font-secundary text-5xl text-white/40 lowercase">Discografía</span>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {DISCOGRAPHY_DATA.map((col) => (
                            <div key={col.label} className="space-y-6">
                                <p className="text-[14px] font-normal text-white/30 border-b border-white/[0.06] pb-4">
                                    {col.label}
                                </p>
                                <div className="flex flex-col">
                                    {col.items.map((a) => (
                                        <AlbumItem 
                                            key={a.title} 
                                            album={a} 
                                            onHover={setHoveredAlbum}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MOUSE FOLLOW PREVIEW */}
                <AnimatePresence>
                    {hoveredAlbum && (
                        <motion.div
                            key="follow-preview"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute pointer-events-none z-[100]"
                            style={{
                                left: springX,
                                top: springY,
                            }}
                        >
                            {/* IMAGEN */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={hoveredAlbum.img}
                                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative w-[320px] h-[320px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/10"
                                >
                                    <img 
                                        src={hoveredAlbum.img} 
                                        alt="" 
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* TEXTO A LA IZQUIERDA (Pegado, Blanco y más Grande) */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={hoveredAlbum.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-1/2 right-[calc(100%+20px)] -translate-y-1/2 whitespace-nowrap text-right"
                                >
                                    <p className="font-secundary text-8xl text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
                                        {hoveredAlbum.title.toLowerCase()}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <Musica />
            <SocialWall />
        </Layout>
    )
}