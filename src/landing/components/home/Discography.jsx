import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOCAL_IMGS = ['/mal-de-amores.avif', '/sport.avif'];

const STATIC_ALBUMS = [
    { 
        id: 'a1', 
        title: 'Island boyz', 
        year: '2025', 
        songsCount: 23, 
        image: LOCAL_IMGS[0], 
        tracklist: [] 
    },
    { 
        id: 'a2', 
        title: 'La pantera negra', 
        year: '2024', 
        songsCount: 30, 
        image: LOCAL_IMGS[1], 
        tracklist: [] 
    },
    { 
        id: 'a3', 
        title: 'La vida es una', 
        year: '2023', 
        songsCount: 28, 
        image: LOCAL_IMGS[0], 
        tracklist: [] 
    },
    { 
        id: 'a4', 
        title: 'El final del principio', 
        year: '2016', 
        songsCount: 10, 
        image: LOCAL_IMGS[1], 
        tracklist: [] 
    },
];

const toSentenceCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const Discography = () => {
    const [albums, setAlbums] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [showTracklist, setShowTracklist] = useState(false);
    const dragStartX = useRef(null);
    const isDragging = useRef(false);
    const [dragOffset, setDragOffset] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3000/albums')
            .then(r => r.json())
            .then(data => {
                const patched = data.map((a, i) => ({ 
                    ...a, 
                    image: LOCAL_IMGS[i % LOCAL_IMGS.length] 
                }));
                setAlbums(patched);
            })
            .catch(() => setAlbums(STATIC_ALBUMS));
    }, []);

    const n = albums.length || 1;

    const goTo = useCallback((targetIndex) => {
        if (showTracklist) setShowTracklist(false);
        setCurrentIndex(targetIndex);
        setDragOffset(0);
    }, [showTracklist]);

    const next = () => goTo(currentIndex + 1);
    const prev = () => goTo(currentIndex - 1);

    // Drag handlers
    const onDown = (e) => {
        if (showTracklist) return;
        dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX;
        isDragging.current = false;
    };
    const onMove = (e) => {
        if (dragStartX.current === null) return;
        const x = e.clientX ?? e.touches?.[0]?.clientX;
        const diff = x - dragStartX.current;
        if (Math.abs(diff) > 10) isDragging.current = true;
        setDragOffset(diff);
    };
    const onUp = (e) => {
        if (dragStartX.current === null) return;
        const endX = e.clientX ?? e.changedTouches?.[0]?.clientX;
        const diff = endX - dragStartX.current;
        dragStartX.current = null;
        setDragOffset(0);
        if (Math.abs(diff) > 120) {
            diff < 0 ? next() : prev();
        }
        setTimeout(() => { isDragging.current = false; }, 50);
    };

    if (albums.length === 0) return null;

    const SLOTS = [-3, -2, -1, 0, 1, 2, 3];
    
    const getAlbumAt = (virtualIdx) => {
        const realIdx = ((virtualIdx % n) + n) % n;
        return albums[realIdx];
    };

    const currentAlbum = getAlbumAt(currentIndex);

    return (
        <section
            className="relative overflow-hidden pt-32 pb-0"
            style={{ minHeight: '100vh', background: 'black' }}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            onTouchStart={onDown}
            onTouchMove={onMove}
            onTouchEnd={onUp}
        >
            {/* ======== DYNAMIC BG ======== */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentAlbum.id + '-' + currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 z-0 pointer-events-none"
                >
                    <img
                        src={currentAlbum.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            filter: 'blur(120px) saturate(2) brightness(0.1)',
                            transform: 'scale(1.5)',
                        }}
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 flex flex-col items-center select-none min-h-screen">

                {/* SECTION TITLE */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <p className="text-white text-[10px] capitalize tracking-[0.8em] font-light mb-3">Discografía oficial</p>
                    <h2 className="text-[4rem] font-bold uppercase tracking-tighter leading-[70px]">
                        El <span className="font-secundary normal-case text-[5rem] ml-2 text-[var(--blue)]">Legado</span>
                    </h2>
                </motion.div>

                {/* ======== INFINITE CIRCULAR SLIDER ======== */}
                <div className="relative w-full flex-1 flex items-center justify-center overflow-visible">
                    <div className="relative w-full flex justify-center items-center h-[550px]">
                        {SLOTS.map((slotOffset) => {
                            const virtualIdx = currentIndex + slotOffset;
                            const album = getAlbumAt(virtualIdx);
                            const isActive = slotOffset === 0;
                            const absOffset = Math.abs(slotOffset);
                            
                            // Visual properties — Matched to Hero (400x400)
                            const x = slotOffset * 420 + dragOffset;
                            const y = absOffset * 70 + (absOffset > 1 ? 50 : 0);
                            const rotate = slotOffset * 12;
                            const scale = isActive ? 1.1 : 0.8;
                            const zIndex = 50 - absOffset;
                            const opacity = 1 - (absOffset * 0.4);

                            if (opacity <= 0) return null;

                            return (
                                <motion.div
                                    key={`slot-${virtualIdx}`}
                                    onClick={() => { if (!isDragging.current && !isActive) goTo(virtualIdx); }}
                                    animate={{ 
                                        x, y, rotate, scale, zIndex, opacity
                                    }}
                                    transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                                    className="absolute cursor-pointer w-[400px] h-[400px] origin-bottom"
                                >
                                    {/* NO ROUNDED as requested */}
                                    <div className={`w-full h-full overflow-hidden relative shadow-2xl transition-all duration-500 ${isActive ? 'shadow-[0_60px_120px_rgba(0,0,0,1)]' : 'shadow-none'}`}>
                                        <img src={album.image} alt={album.title} className="w-full h-full object-cover" draggable={false} />
                                        {!isActive && <div className="absolute inset-0 bg-black/60 transition-opacity duration-500" />}
                                        {isActive && <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-white/5 pointer-events-none" />}
                                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                                    </div>

                                    {/* REFLECTION (No rounded) */}
                                    {isActive && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.15 }}
                                            className="absolute top-[410px] left-0 w-full h-[150px] pointer-events-none"
                                            style={{ 
                                                transform: 'scaleY(-1)', 
                                                maskImage: 'linear-gradient(to bottom, white, transparent)',
                                                WebkitMaskImage: 'linear-gradient(to bottom, white, transparent)' 
                                            }}>
                                            <img src={album.image} alt="" className="w-full h-[400px] object-cover object-bottom" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* TRACKLIST PANEL */}
                    <AnimatePresence>
                        {showTracklist && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute inset-0 z-[100] flex items-center justify-center p-6"
                            >
                                <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowTracklist(false)} />
                                <motion.div className="relative w-full max-w-[550px] bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-none p-12 shadow-3xl">
                                    <div className="flex justify-between items-center mb-10">
                                        <div>
                                            <h4 className="font-secundary text-5xl text-white leading-none mb-3">{toSentenceCase(currentAlbum.title)}</h4>
                                            <p className="text-white/40 text-xs font-bold tracking-[0.2em]">{currentAlbum.year} · {currentAlbum.songsCount} canciones</p>
                                        </div>
                                        <button onClick={() => setShowTracklist(false)} className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                        </button>
                                    </div>
                                    <div className="max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                                        {(currentAlbum.tracklist?.length > 0 ? currentAlbum.tracklist : [
                                            { name: 'LALA', duration: '3:05' },
                                            { name: 'Borracho', duration: '4:15' },
                                            { name: 'Myke Intro', duration: '2:40' }
                                        ]).map((song, i) => (
                                            <div key={i} className="flex items-center gap-6 group hover:bg-white/5 p-4 rounded-none transition-all cursor-pointer mb-2">
                                                <span className="text-white/20 font-black text-sm w-6 italic">{i + 1}</span>
                                                <div className="flex-1">
                                                    <p className="text-white font-bold text-sm group-hover:text-[var(--blue)] transition-colors">{song.name}</p>
                                                </div>
                                                <span className="text-white/20 text-xs font-mono">{song.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ALBUM INFO */}
                <AnimatePresence mode="wait">
                    {!showTracklist && (
                        <motion.div
                            key={currentAlbum.id + '-' + currentIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="mt-20 text-center flex flex-col items-center px-6"
                        >
                            <h3 className="font-secundary text-[5rem] text-white leading-[70px] mb-10 max-w-[900px]">
                                {toSentenceCase(currentAlbum.title)}
                            </h3>
                            <div className="flex gap-4 mb-12">
                                <span className="px-8 py-2.5 bg-white/5 rounded-full text-[11px] font-light border border-white/10 text-white/20 tracking-[0.2em]">{currentAlbum.year}</span>
                                <span className="px-8 py-2.5 bg-white/5 rounded-full text-[11px] font-bold border border-white/10 text-white/20 tracking-[0.2em]">{currentAlbum.songsCount} canciones</span>
                            </div>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowTracklist(true)}
                                className="px-14 py-6 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-full shadow-[0_30px_70px_rgba(255,255,255,0.25)]"
                            >
                                Ver Canciones
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ======== DOTS ======== */}
                <div className="flex gap-4 mt-20">
                    {albums.map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => {
                                const currentRealIdx = ((currentIndex % n) + n) % n;
                                let diff = i - currentRealIdx;
                                if (diff < -n / 2) diff += n;
                                if (diff > n / 2) diff -= n;
                                goTo(currentIndex + diff);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-500 ${(((currentIndex % n) + n) % n) === i ? 'w-14 bg-white' : 'w-4 bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 0px; }
            `}</style>
        </section>
    );
};
