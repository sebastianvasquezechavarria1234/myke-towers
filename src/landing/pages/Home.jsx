import React, { useState, useRef } from "react";
import { Layout } from "../layout/Layout";
import { Hero } from "../components/home/Hero";
import { Musica } from "../components/home/Musica";
import { SocialWall } from "../components/home/SocialWall";
import { motion, AnimatePresence, useSpring } from "framer-motion";

const DISCOGRAPHY_DATA = [
    {
        label: "Álbumes de Estudio",
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
        label: "EP & Otros",
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
            onMouseEnter={() => onHover(album.img)}
            onMouseLeave={() => onHover(null)}
            className="flex gap-6 items-baseline group cursor-pointer py-1"
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
    const [hoverImg, setHoverImg] = useState(null);
    const mouseX = useSpring(0, { stiffness: 120, damping: 25 });
    const mouseY = useSpring(0, { stiffness: 120, damping: 25 });

    const handleMouseMove = (e) => {
        // Offset mayor hacia la derecha para que no se solape con el cursor ni el texto
        mouseX.set(e.clientX + 80); 
        mouseY.set(e.clientY - 110); // Centramos un poco más la imagen verticalmente respecto al puntero
    };

    return(
        <Layout>
            <Hero />
            
            <section 
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
                        <span className="text-white/15 text-[10px] uppercase tracking-[0.5em] font-bold">Discografía</span>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {DISCOGRAPHY_DATA.map((col) => (
                            <div key={col.label} className="space-y-6">
                                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 border-b border-white/[0.06] pb-4">
                                    {col.label}
                                </p>
                                <div className="space-y-4">
                                    {col.items.map((a) => (
                                        <AlbumItem 
                                            key={a.title} 
                                            album={a} 
                                            onHover={setHoverImg} 
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MOUSE FOLLOW IMAGE */}
                <AnimatePresence>
                    {hoverImg && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="fixed pointer-events-none z-[100] w-[280px] h-[280px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5"
                            style={{
                                left: mouseX,
                                top: mouseY,
                            }}
                        >
                            <img 
                                src={hoverImg} 
                                alt="Album Cover" 
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <Musica />
            <SocialWall />
        </Layout>
    )
}