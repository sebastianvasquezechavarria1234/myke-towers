import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALBUMS = [
    {
        id: 1,
        title: "Easy Money Baby",
        year: "2020",
        image: "https://i.scdn.co/image/ab67616d0000b27341e88863f60f64c6321b023e",
        color: "from-blue-900/60",
        songs: "18 Canciones",
        hits: ["Diosa", "Girl"]
    },
    {
        id: 2,
        title: "Lyke Mike",
        year: "2021",
        image: "https://i.scdn.co/image/ab6761610000e5eb38d7e5f608dd0e8dd4d97b23", 
        color: "from-red-900/60",
        songs: "23 Canciones",
        hits: ["Burberry", "Mírenme Ahora"]
    },
    {
        id: 3,
        title: "La Vida Es Una",
        year: "2023",
        image: "https://i.scdn.co/image/ab67616d0000b273b4007b856b3e89547d216f4e",
        color: "from-cyan-900/60",
        songs: "23 Canciones",
        hits: ["LALA", "Ulala"]
    },
    {
        id: 4,
        title: "Vive La Tuya",
        year: "2023",
        image: "https://i.scdn.co/image/ab6761610000e5eb987820194bc02868c22f0c74",
        color: "from-purple-900/60",
        songs: "22 Canciones",
        hits: ["La Falda", "Eterno"]
    },
    {
        id: 5,
        title: "La Pantera Negra",
        year: "2024",
        image: "https://upload.wikimedia.org/wikipedia/en/3/3d/Myke_Towers_-_La_Pantera_Negra.png",
        color: "from-neutral-800/80",
        songs: "20 Canciones",
        hits: ["Adivino", "La Primera Vez"]
    }
];

export const Discography = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextAlbum = () => setCurrentIndex((prev) => (prev + 1) % ALBUMS.length);
    const prevAlbum = () => setCurrentIndex((prev) => (prev - 1 + ALBUMS.length) % ALBUMS.length);

    return (
        <section className={`relative pt-32 pb-48 overflow-hidden transition-colors duration-1000 bg-gradient-to-b ${ALBUMS[currentIndex].color} to-black`}>
            {/* Background Blur Magic */}
            <div className="absolute inset-0 z-0 flex justify-center items-center opacity-40 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={ALBUMS[currentIndex].id}
                        src={ALBUMS[currentIndex].image}
                        initial={{ opacity: 0, scale: 1.2, filter: "blur(50px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(100px)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="w-[800px] h-[800px] object-cover rounded-full"
                    />
                </AnimatePresence>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-5xl font-black uppercase mb-4 tracking-tighter">
                        El <span className="font-secundary text-white normal-case text-7xl ml-2">Legado</span>
                    </h2>
                    <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">
                        Discografía Oficial
                    </p>
                </div>

                {/* 3D CAROUSEL */}
                <div className="relative h-[400px] flex justify-center items-center" style={{ perspective: "1000px" }}>
                    {ALBUMS.map((album, index) => {
                        const offset = index - currentIndex;
                        const isCenter = offset === 0;
                        
                        // Wrap around logic
                        let adjustedOffset = offset;
                        if (offset < -2) adjustedOffset += ALBUMS.length;
                        if (offset > 2) adjustedOffset -= ALBUMS.length;

                        const absOffset = Math.abs(adjustedOffset);
                        
                        if (absOffset > 2) return null;

                        return (
                            <motion.div
                                key={album.id}
                                onClick={() => setCurrentIndex(index)}
                                animate={{
                                    x: adjustedOffset * 220, 
                                    z: -absOffset * 150,     
                                    rotateY: adjustedOffset * -25, 
                                    scale: isCenter ? 1 : 0.8,
                                    opacity: absOffset > 1 ? 0 : isCenter ? 1 : 0.4
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={`absolute cursor-pointer w-[300px] h-[300px] ${isCenter ? 'z-20' : 'z-10'}`}
                            >
                                {/* Disco/Vinyl Record sticking out */}
                                <motion.div 
                                    animate={{ 
                                        x: isCenter ? 120 : 0, 
                                        rotate: isCenter ? 360 : 0 
                                    }}
                                    transition={{ 
                                        x: { type: "spring", stiffness: 300, damping: 30, delay: 0.1 },
                                        rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                                    }}
                                    className="absolute top-4 right-0 w-[270px] h-[270px] rounded-full bg-black border border-neutral-800 shadow-xl flex items-center justify-center -z-10"
                                >
                                    {/* Vinyl grooves */}
                                    <div className="w-[250px] h-[250px] rounded-full border border-white/5 flex items-center justify-center">
                                        <div className="w-[230px] h-[230px] rounded-full border border-white/5 flex items-center justify-center">
                                            {/* Vinyl Label */}
                                            <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                                                 <img src={album.image} alt="label" className="w-full h-full object-cover opacity-80" />
                                            </div>
                                            <div className="absolute w-4 h-4 bg-black rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Cover Art */}
                                <img 
                                    src={album.image} 
                                    alt={album.title}
                                    className="w-full h-full object-cover rounded-[15px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 relative z-10"
                                />
                                
                                <AnimatePresence>
                                    {isCenter && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="absolute -bottom-28 left-0 right-0 text-center w-[450px] -ml-[75px]"
                                        >
                                            <h3 className="text-3xl font-black uppercase tracking-widest">{album.title}</h3>
                                            <div className="flex justify-center gap-4 mt-2">
                                                <p className="text-white text-xs font-medium bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">{album.year}</p>
                                                <p className="text-white text-xs font-medium bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">{album.songs}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
                
                {/* CONTROLS */}
                <div className="flex justify-center gap-6 mt-32 relative z-20">
                    <button onClick={prevAlbum} className="w-14 h-14 rounded-full border border-white/20 flex justify-center items-center hover:bg-white hover:text-black transition-all">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button onClick={nextAlbum} className="w-14 h-14 rounded-full border border-white/20 flex justify-center items-center hover:bg-white hover:text-black transition-all">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
            </div>
        </section>
    );
};
