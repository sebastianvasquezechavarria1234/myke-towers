import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Discography = () => {
    const [albums, setAlbums] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTracklist, setShowTracklist] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/albums")
            .then(res => res.json())
            .then(data => setAlbums(data))
            .catch(err => console.error("Error loading albums:", err));
    }, []);

    const nextAlbum = () => {
        setCurrentIndex((prev) => (prev + 1) % albums.length);
        setShowTracklist(false);
    };
    const prevAlbum = () => {
        setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
        setShowTracklist(false);
    };

    if (albums.length === 0) return null;

    return (
        <section className={`relative pt-32 pb-48 overflow-hidden transition-colors duration-1000 bg-gradient-to-b ${albums[currentIndex].color} to-black`}>
            {/* Background Blur Magic */}
            <div className="absolute inset-0 z-0 flex justify-center items-center opacity-40 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={albums[currentIndex].id}
                        src={albums[currentIndex].image}
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
                    {albums.map((album, index) => {
                        const offset = index - currentIndex;
                        const isCenter = offset === 0;
                        
                        // Wrap around logic
                        let adjustedOffset = offset;
                        if (offset < -2) adjustedOffset += albums.length;
                        if (offset > 2) adjustedOffset -= albums.length;

                        const absOffset = Math.abs(adjustedOffset);
                        
                        if (absOffset > 2) return null;

                        return (
                            <motion.div
                                key={album.id}
                                onClick={() => {
                                    if(!isCenter) {
                                        setCurrentIndex(index);
                                        setShowTracklist(false);
                                    }
                                }}
                                animate={{
                                    x: adjustedOffset * 220, 
                                    z: -absOffset * 150,     
                                    rotateY: adjustedOffset * -25, 
                                    scale: isCenter ? 1 : 0.8,
                                    opacity: absOffset > 1 ? 0 : isCenter ? 1 : 0.4
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={`absolute cursor-pointer w-[300px] h-[300px] ${isCenter ? 'z-30' : 'z-10'}`}
                            >
                                {/* Disco/Vinyl Record sticking out */}
                                <motion.div 
                                    animate={{ 
                                        x: isCenter && !showTracklist ? 120 : 0, 
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
                                <motion.img 
                                    src={album.image} 
                                    alt={album.title}
                                    animate={{
                                        x: showTracklist && isCenter ? -100 : 0,
                                        opacity: showTracklist && isCenter ? 0.2 : 1
                                    }}
                                    className="w-full h-full object-cover rounded-[15px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 relative z-20"
                                />
                                
                                <AnimatePresence>
                                    {isCenter && !showTracklist && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="absolute -bottom-32 left-0 right-0 text-center w-[450px] -ml-[75px] z-30"
                                        >
                                            <h3 className="text-3xl font-black uppercase tracking-widest">{album.title}</h3>
                                            <div className="flex justify-center gap-4 mt-2 mb-4">
                                                <p className="text-white text-xs font-medium bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">{album.year}</p>
                                                <p className="text-white text-xs font-medium bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">{album.songsCount} canciones</p>
                                            </div>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setShowTracklist(true); }}
                                                className="px-6 py-2 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                                            >
                                                Ver Canciones
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* TRACKLIST OVERLAY */}
                                <AnimatePresence>
                                    {isCenter && showTracklist && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 100 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            className="absolute top-0 right-0 bottom-0 w-[350px] bg-black/80 backdrop-blur-xl rounded-[15px] border border-white/10 p-6 z-30 flex flex-col shadow-2xl"
                                        >
                                            <div className="flex justify-between items-center mb-6">
                                                <h4 className="text-xl font-black uppercase tracking-widest">{album.title}</h4>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); setShowTracklist(false); }}
                                                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                                </button>
                                            </div>
                                            
                                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                                                {album.tracklist?.map((song) => (
                                                    <div key={song.track} className="flex items-center gap-4 group hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer">
                                                        <span className="text-white/40 font-bold text-sm w-4">{song.track}</span>
                                                        <div className="flex-1">
                                                            <p className="text-white font-medium text-sm group-hover:text-[var(--blue)] transition-colors">{song.name}</p>
                                                        </div>
                                                        <span className="text-white/40 text-xs">{song.duration}</span>
                                                    </div>
                                                ))}
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
