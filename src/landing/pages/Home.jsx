import React, { useState, useEffect } from "react";
import { Layout } from "../layout/Layout";
import { Hero } from "../components/home/Hero";
import { Musica } from "../components/home/Musica";
import { SocialWall } from "../components/home/SocialWall";
import { motion, AnimatePresence, useSpring, useMotionValue, useVelocity, useTransform } from "framer-motion";

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
            <span className="text-white/20 text-[11px] font-light shrink-0 group-hover:text-white/40 transition-colors duration-300">
                {album.year}
            </span>
            <span className="text-white/30 text-sm font-light group-hover:text-white group-hover:pl-2 transition-all duration-300">
                {album.title}
            </span>
        </div>
    );
};

export const Home = () => {
    const [albums, setAlbums] = useState([]);
    const [hoveredAlbum, setHoveredAlbum] = useState(null);
    const containerRef = React.useRef(null);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xVelocity = useVelocity(x);
    const yVelocity = useVelocity(y);

    // Escala líquida muy sutil para la card (sin deformar bordes)
    const dynamicScaleX = useTransform(xVelocity, [-3000, 0, 3000], [1.1, 1, 1.1]);
    const dynamicScaleY = useTransform(yVelocity, [-3000, 0, 3000], [1.1, 1, 1.1]);

    const springConfig = { stiffness: 500, damping: 40, mass: 0.1 };
    const lagConfig = { stiffness: 100, damping: 20, mass: 0.5 };
    
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);
    
    const lagX = useSpring(x, lagConfig);
    const lagY = useSpring(y, lagConfig);

    // Cálculos de inercia (fuera del render para evitar bugs de pantalla gris)
    const contentX = useTransform([lagX, springX], ([lx, sx]) => lx - sx);
    const contentY = useTransform([lagY, springY], ([ly, sy]) => ly - sy);

    useEffect(() => {
        fetch("http://localhost:3000/albums")
            .then(res => res.json())
            .then(data => {
                // Ordenar por año descendente (más nuevo primero)
                const sorted = data.sort((a, b) => parseInt(b.year) - parseInt(a.year));
                setAlbums(sorted);
            })
            .catch(err => console.error("Error loading albums for home:", err));
    }, []);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left + 50); 
        y.set(e.clientY - rect.top - 180);
    };

    // Categorizar álbumes de forma flexible para que no falte ninguno
    const categorized = [
        { 
            label: "Álbumes de estudio", 
            items: albums.filter(a => a.format?.toLowerCase().includes("álbum")) 
        },
        { 
            label: "Mixtapes", 
            items: albums.filter(a => a.format?.toLowerCase().includes("mixtape")) 
        },
        { 
            label: "EP & Singles", 
            items: albums.filter(a => a.format?.toLowerCase().includes("ep")) 
        },
    ];

    return(
        <Layout>
            <Hero />
            
            {/* DISCOGRAFÍA */}
            <section 
                ref={containerRef}
                className="pt-32 pb-0 max-w-[900px] mx-auto px-6 relative"
                onMouseMove={handleMouseMove}
            >
                <div className="space-y-16">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex items-center gap-6"
                    >
                        <div className="flex-1 h-px bg-white/[0.06]" />
                        <span className="font-secundary text-5xl text-white capitalize">Discografía</span>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {categorized.map((col) => (
                            <div key={col.label} className="space-y-6">
                                <p className="text-[14px] font-light text-white border-b border-white/[0.06] pb-4">
                                    {col.label}
                                </p>
                                <div className="flex flex-col">
                                    {col.items.map((a) => (
                                        <AlbumItem 
                                            key={a.id} 
                                            album={a} 
                                            onHover={setHoveredAlbum}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MOUSE FOLLOW PREVIEW - REVEAL CINEMÁTICO */}
                <AnimatePresence>
                    {hoveredAlbum && (
                        <motion.div
                            key="follow-preview"
                            initial={{ 
                                opacity: 0, 
                                scale: 0.4, 
                                rotateY: 30, 
                                rotateX: -15,
                                filter: "blur(20px)" 
                            }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1, 
                                rotateY: 0, 
                                rotateX: 0,
                                filter: "blur(0px)" 
                            }}
                            exit={{ 
                                opacity: 0, 
                                scale: 0.95, 
                                y: 15,
                                filter: "blur(8px)",
                                transition: { duration: 0.15, ease: "easeOut" } 
                            }}
                            transition={{ 
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                mass: 0.8
                            }}
                            className="absolute pointer-events-none z-[100] w-[200px] flex flex-col"
                            style={{
                                left: springX,
                                top: springY,
                                perspective: 1000
                            }}
                        >
                            {/* FONDO BLANCO ELÁSTICO */}
                            <motion.div 
                                className="absolute inset-0 bg-white shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
                                style={{
                                    scaleX: dynamicScaleX,
                                    scaleY: dynamicScaleY,
                                    transformOrigin: "center"
                                }}
                            />

                            {/* CONTENIDO CON STAGGER */}
                            <div className="relative p-[10px] flex flex-col gap-3">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.05, duration: 0.4 }}
                                    className="relative w-full aspect-square overflow-hidden"
                                >
                                    <img 
                                        src={hoveredAlbum.image} 
                                        alt="" 
                                        className="w-full h-full object-cover" 
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15, duration: 0.3 }}
                                    className="px-1"
                                >
                                    <h2 className="font-secundary text-black text-xl leading-tight break-words whitespace-normal">
                                        {hoveredAlbum.title}
                                    </h2>
                                    <p className="text-black/40 text-[9px] font-bold mt-0.5">
                                        {hoveredAlbum.year} · {hoveredAlbum.format || 'Álbum'}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <Musica />
            <SocialWall />
        </Layout>
    )
}