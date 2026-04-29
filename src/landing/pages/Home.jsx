import React, { useState, useEffect } from "react";
import { Layout } from "../layout/Layout";
import { Hero } from "../components/home/Hero";
import { Musica } from "../components/home/Musica";
import { SocialWall } from "../components/home/SocialWall";
import { motion, AnimatePresence, useSpring, useMotionValue, useVelocity, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

/* Componente de la Card de Previsualización Reutilizable */
const PreviewCard = ({ album, style, dynamicScaleX, dynamicScaleY }) => {
    if (!album) return null;

    return (
        <motion.div
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
                filter: "blur(2px)",
                transition: { duration: 0.1, ease: "linear" }
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.4
            }}
            className="absolute pointer-events-none z-[100] w-[150px] flex flex-col"
            style={{
                ...style,
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

            {/* CONTENIDO */}
            <div className="relative p-[8px] flex flex-col gap-2">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-full aspect-square overflow-hidden"
                >
                    <img
                        src={album.image}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <div className="px-1">
                    <h2 className="font-secundary text-black text-[17px] leading-tight break-words whitespace-normal">
                        {album.title}
                    </h2>
                    <span className="text-black/50 text-[13px] font-light lowercase block mt-0.5">
                        {album.year} · {album.format || 'álbum'}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const AlbumItem = ({ album, onHover }) => {
    return (
        <div
            onMouseEnter={() => onHover(album)}
            onMouseLeave={() => onHover(null)}
            className="flex gap-4 items-center group cursor-pointer py-3 border-b border-white/[0.03] last:border-0"
        >
            <div className="w-9 h-9 overflow-hidden rounded-[2px] opacity-20 group-hover:opacity-100 transition-all duration-300 shrink-0">
                <img 
                    src={album.image} 
                    alt="" 
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                />
            </div>
            
            <div className="flex flex-col leading-tight gap-0.5">
                <span className="text-white/30 text-[13px] font-light group-hover:text-white transition-all duration-300">
                    {album.title}
                </span>
                <span className="text-white/15 text-[9px] font-light lowercase group-hover:text-white/40 transition-colors duration-300">
                    {album.year} · {album.format || 'álbum'}
                </span>
            </div>
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

    const dynamicScaleX = useTransform(xVelocity, [-3000, 0, 3000], [1.1, 1, 1.1]);
    const dynamicScaleY = useTransform(yVelocity, [-3000, 0, 3000], [1.1, 1, 1.1]);

    const springConfig = { stiffness: 500, damping: 40, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        fetch("http://localhost:3000/albums")
            .then(res => res.json())
            .then(data => {
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

    return (
        <Layout>
            <Hero />
            <Musica />
            <SocialWall />
            
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
                        <div className="text-4xl md:text-5xl text-white flex flex-wrap items-center justify-center gap-x-4 gap-y-2 max-w-[650px] mx-auto text-center leading-tight">
                            <span className="font-bold">Legado</span>
                            <span className="font-secundary text-[var(--blue)] lowercase italic">musical</span>
                            <span className="font-bold">&</span>
                            <span className="font-secundary text-[var(--blue)] lowercase italic">discografía</span>
                            <span className="font-bold">completa</span>
                        </div>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative min-h-[600px]">
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

                {/* MOUSE FOLLOW PREVIEW (Hover dinámico) */}
                <AnimatePresence>
                    {hoveredAlbum && (
                        <PreviewCard 
                            key="follow-mouse"
                            album={hoveredAlbum} 
                            style={{
                                left: springX,
                                top: springY
                            }}
                            dynamicScaleX={dynamicScaleX}
                            dynamicScaleY={dynamicScaleY}
                        />
                    )}
                </AnimatePresence>
            </section>
        </Layout>
    );
};