import React, { useState, useEffect, useMemo } from "react";
import { Layout } from "../layout/Layout";
import { Hero } from "../components/home/Hero";
import { Musica } from "../components/home/Musica";
import { SocialWall } from "../components/home/SocialWall";
import { motion, AnimatePresence, useSpring, useMotionValue, useVelocity, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

/* Componente de la Card de Previsualización Reutilizable */
const PreviewCard = ({ album, isGhost, style, dynamicScaleX, dynamicScaleY }) => {
    if (!album) return null;

    return (
        <motion.div
            initial={isGhost ? { opacity: 0, scale: 0.7, rotate: -10, x: -30, filter: "blur(20px)" } : {
                opacity: 0,
                scale: 0.4,
                rotateY: 30,
                rotateX: -15,
                filter: "blur(20px)"
            }}
            animate={isGhost ? { opacity: 0.06, scale: 1, rotate: 0, x: 0, filter: "blur(0px)" } : {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                rotateX: 0,
                filter: "blur(0px)"
            }}
            exit={isGhost ? { 
                opacity: 0, 
                scale: 0.7, 
                rotate: 10,
                x: 30,
                filter: "blur(20px)",
                transition: { duration: 0.8, ease: "easeInOut" }
            } : {
                opacity: 0,
                scale: 0.95,
                filter: "blur(2px)",
                transition: { duration: 0.1, ease: "linear" }
            }}
            transition={isGhost ? { 
                duration: 0.6,
                ease: "easeOut"
            } : {
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
                style={isGhost ? {} : {
                    scaleX: dynamicScaleX,
                    scaleY: dynamicScaleY,
                    transformOrigin: "center"
                }}
            />

            {/* CONTENIDO */}
            <div className="relative p-[8px] flex flex-col gap-2">
                <motion.div
                    initial={isGhost ? { opacity: 0, scale: 0.9 } : { opacity: 0, scale: 0.8 }}
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
                    <h2 className="font-secundary text-black text-sm leading-tight break-words whitespace-normal">
                        {album.title}
                    </h2>
                    <p className="text-black/40 text-[7px] font-bold mt-0.5 uppercase tracking-wider">
                        {album.year} · {album.format || 'Álbum'}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

/* Componente Individual de Ghost Card con Lógica Propia */
const GhostCardItem = ({ albums, initialPos, delay }) => {
    const [currentPos, setCurrentPos] = useState(initialPos);
    const [albumIdx, setAlbumIdx] = useState(() => Math.floor(Math.random() * albums.length));

    useEffect(() => {
        const positions = [
            { top: '15%', left: '10%' }, { top: '25%', left: '85%' },
            { top: '65%', left: '15%' }, { top: '80%', left: '90%' },
            { top: '50%', left: '50%' }, { top: '10%', left: '70%' },
            { top: '85%', left: '35%' }, { top: '40%', left: '15%' },
            { top: '75%', left: '75%' }, { top: '30%', left: '45%' }
        ];

        // Usar el delay para desfasar el inicio de la animación
        const startTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                const newPos = positions[Math.floor(Math.random() * positions.length)];
                const newAlbumIdx = Math.floor(Math.random() * albums.length);
                setCurrentPos(newPos);
                setAlbumIdx(newAlbumIdx);
            }, 5000); // Cada 5 segundos cambia de lugar

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [albums, delay]);

    return (
        <AnimatePresence>
            <PreviewCard 
                key={`ghost-item-${currentPos.top}-${currentPos.left}-${albumIdx}`}
                album={albums[albumIdx]} 
                isGhost={true} 
                style={{ 
                    top: currentPos.top,
                    left: currentPos.left,
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </AnimatePresence>
    );
};

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
                        <span className="font-secundary text-5xl text-white capitalize">Discografía</span>
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

                        {/* 4 GHOST CARDS TOTALMENTE INDEPENDIENTES */}
                        {!hoveredAlbum && albums.length > 0 && (
                            <>
                                <GhostCardItem albums={albums} initialPos={{ top: '25%', left: '20%' }} delay={0} />
                                <GhostCardItem albums={albums} initialPos={{ top: '55%', left: '80%' }} delay={1200} />
                                <GhostCardItem albums={albums} initialPos={{ top: '80%', left: '40%' }} delay={2400} />
                                <GhostCardItem albums={albums} initialPos={{ top: '15%', left: '60%' }} delay={3600} />
                            </>
                        )}
                    </div>
                </div>

                {/* MOUSE FOLLOW PREVIEW (Hover dinámico) */}
                <AnimatePresence>
                    {hoveredAlbum && (
                        <PreviewCard 
                            key="follow-mouse"
                            album={hoveredAlbum} 
                            isGhost={false} 
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