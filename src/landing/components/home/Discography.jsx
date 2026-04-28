import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOCAL_IMGS = ['/mal-de-amores.avif', '/sport.avif'];

const STATIC_ALBUMS = [
    { 
        id: 'a1', 
        title: 'Island Boyz', 
        year: '2025', 
        songsCount: 23, 
        image: LOCAL_IMGS[0], 
        tracklist: [
            { track: 1, name: 'Intro Kingz', duration: '2:15' },
            { track: 2, name: 'LALA Remix', duration: '3:45' },
            { track: 3, name: 'Island Vibes', duration: '4:10' },
            { track: 4, name: 'Prueba Local', duration: '2:50' }
        ] 
    },
    { 
        id: 'a2', 
        title: 'La Pantera Negra', 
        year: '2024', 
        songsCount: 30, 
        image: LOCAL_IMGS[1], 
        tracklist: [
            { track: 1, name: 'Pantera Intro', duration: '1:55' },
            { track: 2, name: 'Savage Verse', duration: '3:20' },
            { track: 3, name: 'Dark Flow', duration: '3:45' }
        ] 
    },
    { 
        id: 'a3', 
        title: 'La Vida Es Una', 
        year: '2023', 
        songsCount: 28, 
        image: LOCAL_IMGS[0], 
        tracklist: [
            { track: 1, name: 'LALA', duration: '3:05' },
            { track: 2, name: 'Borracho', duration: '4:15' }
        ] 
    },
    { 
        id: 'a4', 
        title: 'El Final del Principio', 
        year: '2016', 
        songsCount: 10, 
        image: LOCAL_IMGS[1], 
        tracklist: [
            { track: 1, name: 'Dinero en Mano', duration: '3:30' },
            { track: 2, name: 'Dejate Ver', duration: '3:10' }
        ] 
    },
];

export const Discography = () => {
    const [albums, setAlbums] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [showTracklist, setShowTracklist] = useState(false);
    const dragStartX = useRef(null);
    const isDragging = useRef(false);
    const [extraRot, setExtraRot] = useState(0); // live drag rotation

    useEffect(() => {
        fetch('http://localhost:3000/albums')
            .then(r => r.json())
            .then(data => {
                // Forzar imágenes locales para pruebas como pidió el usuario
                const patched = data.map((a, i) => ({ 
                    ...a, 
                    image: LOCAL_IMGS[i % LOCAL_IMGS.length] 
                }));
                setAlbums(patched);
            })
            .catch(() => setAlbums(STATIC_ALBUMS));
    }, []);

    const n = albums.length || 1;
    const ANGLE = 360 / n;
    const RADIUS = Math.max(280, n * 60); // dynamic radius

    const goTo = useCallback((idx) => {
        if (showTracklist) setShowTracklist(false);
        setIsSpinning(true);
        setCurrent(((idx % n) + n) % n);
        setExtraRot(0);
        setTimeout(() => setIsSpinning(false), 700);
    }, [n, showTracklist]);

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

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
        if (Math.abs(diff) > 6) isDragging.current = true;
        setExtraRot(diff * 0.3);
    };
    const onUp = (e) => {
        if (dragStartX.current === null) return;
        const endX = e.clientX ?? e.changedTouches?.[0]?.clientX;
        const diff = endX - dragStartX.current;
        dragStartX.current = null;
        setExtraRot(0);
        if (Math.abs(diff) > 60) diff < 0 ? next() : prev();
        setTimeout(() => { isDragging.current = false; }, 50);
    };

    if (albums.length === 0) return null;
    const currentAlbum = albums[current];

    // Total Y rotation of the carousel
    const carouselRotY = -current * ANGLE + extraRot;

    return (
        <section
            className="relative overflow-hidden"
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
                    key={currentAlbum.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0 pointer-events-none"
                >
                    <img
                        src={currentAlbum.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            filter: 'blur(100px) saturate(2) brightness(0.2)',
                            transform: 'scale(1.4)',
                        }}
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* ======== GRID LINES ======== */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            <div className="relative z-10 flex flex-col items-center pt-24 pb-32 select-none min-h-screen">

                {/* TITLE */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <p className="text-white/20 text-[10px] uppercase tracking-[0.8em] font-bold mb-3">Discografía Oficial</p>
                    <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">
                        El <span className="font-secundary normal-case text-8xl ml-2">Legado</span>
                    </h2>
                </motion.div>

                {/* ======== 3D SCENE ======== */}
                <div className="relative w-full flex-1 flex flex-col items-center justify-center">
                    <div
                        style={{
                            perspective: '1200px',
                            perspectiveOrigin: '50% 40%',
                            width: '100%',
                            height: '420px',
                            position: 'relative',
                            cursor: isDragging.current ? 'grabbing' : 'grab',
                        }}
                    >
                        {/* Floor Glow */}
                        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[400px] h-[60px] bg-white/[0.05] blur-[20px] rounded-full pointer-events-none" />

                        {/* CYLINDER */}
                        <motion.div
                            animate={{ 
                                rotateY: carouselRotY,
                                x: showTracklist ? -200 : 0,
                                scale: showTracklist ? 0.8 : 1
                            }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '50%',
                                width: '320px',
                                height: '380px',
                                marginLeft: '-160px',
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            {albums.map((album, idx) => {
                                const isActive = idx === current;
                                const cardAngle = idx * ANGLE;

                                return (
                                    <div
                                        key={album.id}
                                        onClick={() => { if (!isDragging.current && !isActive) goTo(idx); }}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '320px',
                                            height: '380px',
                                            transform: `rotateY(${cardAngle}deg) translateZ(${RADIUS}px)`,
                                            transformStyle: 'preserve-3d',
                                            cursor: isActive ? 'default' : 'pointer',
                                            opacity: isActive ? 1 : 0.4,
                                            transition: 'opacity 0.5s ease',
                                        }}
                                    >
                                        <div
                                            className={`w-full h-full rounded-[24px] overflow-hidden relative transition-all duration-700
                                                ${isActive ? 'shadow-[0_40px_100px_rgba(0,0,0,0.9),0_0_80px_rgba(255,255,255,0.05)] scale-105' : 'scale-100 opacity-60'}
                                            `}
                                        >
                                            <img src={album.image} alt={album.title} className="w-full h-full object-cover" draggable={false} />
                                            
                                            {/* Shimmer overlay */}
                                            {isActive && (
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
                                            )}
                                            
                                            {/* Shadow bottom */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                                        </div>

                                        {/* Reflejo */}
                                        {isActive && (
                                            <div className="absolute top-[390px] left-0 width-[320px] h-[100px] opacity-20 pointer-events-none"
                                                style={{ 
                                                    transform: 'scaleY(-1)', 
                                                    maskImage: 'linear-gradient(to bottom, white, transparent)',
                                                    WebkitMaskImage: 'linear-gradient(to bottom, white, transparent)' 
                                                }}>
                                                <img src={album.image} alt="" className="w-[320px] h-[380px] object-cover object-bottom rounded-[24px]" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* TRACKLIST PANEL */}
                        <AnimatePresence>
                            {showTracklist && (
                                <motion.div
                                    initial={{ opacity: 0, x: 100, rotateY: 20 }}
                                    animate={{ opacity: 1, x: 280, rotateY: 0 }}
                                    exit={{ opacity: 0, x: 100, rotateY: 20 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                    className="absolute top-0 left-1/2 w-[400px] h-[420px] -translate-x-1/2 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[30px] p-8 z-50 flex flex-col shadow-2xl"
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h4 className="text-2xl font-black uppercase tracking-widest">{currentAlbum.title}</h4>
                                            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{currentAlbum.year} · {currentAlbum.songsCount} canciones</p>
                                        </div>
                                        <button 
                                            onClick={() => setShowTracklist(false)}
                                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                        {(currentAlbum.tracklist?.length > 0 ? currentAlbum.tracklist : [
                                            { track: 1, name: 'LALA', duration: '3:05' },
                                            { track: 2, name: 'Borracho', duration: '4:15' },
                                            { track: 3, name: 'Myke Intro', duration: '2:40' },
                                            { track: 4, name: 'Young King Flow', duration: '3:10' },
                                            { track: 5, name: 'Pantera', duration: '3:55' }
                                        ]).map((song, i) => (
                                            <motion.div 
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex items-center gap-5 group hover:bg-white/5 p-3 rounded-xl transition-all cursor-pointer mb-2"
                                            >
                                                <span className="text-white/20 font-black text-sm w-6 italic">{i + 1}</span>
                                                <div className="flex-1">
                                                    <p className="text-white font-bold text-sm group-hover:text-[var(--blue)] transition-colors">{song.name}</p>
                                                </div>
                                                <span className="text-white/20 text-xs font-mono">{song.duration}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ======== ALBUM INFO BELOW ======== */}
                    <AnimatePresence mode="wait">
                        {!showTracklist && (
                            <motion.div
                                key={currentAlbum.id}
                                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5 }}
                                className="mt-20 text-center flex flex-col items-center"
                            >
                                <h3 className="text-5xl font-black uppercase tracking-[0.2em] mb-4">{currentAlbum.title}</h3>
                                <div className="flex gap-4 mb-8">
                                    <span className="px-5 py-1.5 bg-white/10 rounded-full text-xs font-bold border border-white/5 backdrop-blur-md text-white/60">{currentAlbum.year}</span>
                                    <span className="px-5 py-1.5 bg-white/10 rounded-full text-xs font-bold border border-white/5 backdrop-blur-md text-white/60">{currentAlbum.songsCount} canciones</span>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowTracklist(true)}
                                    className="px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.15)]"
                                >
                                    Ver Canciones
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ======== DOTS ======== */}
                <div className="flex gap-3 mt-12">
                    {albums.map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => goTo(i)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-white' : 'w-2 bg-white/20'}`}
                        />
                    ))}
                </div>

                {/* ======== NAV ARROWS ======== */}
                <div className="flex gap-6 mt-8">
                    <button onClick={prev} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button onClick={next} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
            </div>

            {/* Custom Styles for Scrollbar */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            `}</style>
        </section>
    );
};
