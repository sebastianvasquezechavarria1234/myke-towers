import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { motion } from "framer-motion";
import { Play, ArrowLeft, Clock, Disc } from "lucide-react";
import { discography } from "../../data/staticData";

export const AlbumDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const album = discography.find(a => String(a.id) === id);
        if (album) {
            setData({
                album: album.title,
                year: album.year,
                image: album.image,
                songs: album.tracklist || []
            });
        } else {
            setData({ error: "Álbum no encontrado" });
        }
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="h-screen flex items-center justify-center">
                    <span className="text-white/20 font-secundary text-4xl animate-pulse">Cargando canciones...</span>
                </div>
            </Layout>
        );
    }

    if (!data || data.error) {
        return (
            <Layout>
                <div className="h-screen flex flex-col items-center justify-center gap-6">
                    <h2 className="text-4xl font-black uppercase">Álbum no encontrado</h2>
                    <Link to="/albums" className="text-[var(--green)] hover:underline uppercase tracking-widest text-sm font-bold">Volver a discografía</Link>
                </div>
            </Layout>
        );
    }

    const renderTitle = (title) => {
        if (!title) return "";
        const words = title.split(" ");
        if (words.length === 1) return <span className="font-secundary text-white lowercase">{title}</span>;
        
        const firstPart = words.slice(0, Math.ceil(words.length / 2)).join(" ");
        const secondPart = words.slice(Math.ceil(words.length / 2)).join(" ");
        
        return (
            <>
                {firstPart}
                <span className="pl-[20px] font-secundary text-white lowercase">
                    {secondPart}
                </span>
            </>
        );
    };

    return (
        <Layout>
            <section className="min-h-screen pt-[120px] pb-[100px]">
                {/* HERO DEL ÁLBUM */}
                <div className="max-w-[900px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-12 items-end mb-20">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative group shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                    >
                        <img 
                            src={data.image} 
                            alt={data.album} 
                            className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 transition-colors pointer-events-none" />
                    </motion.div>

                    <div className="space-y-4">
                        <Link to="/albums" className="flex items-center gap-2 text-white hover:text-[var(--green)] transition-colors font-medium italic underline underline-offset-4 decoration-white/20" style={{ fontSize: '12px' }}>
                            <ArrowLeft size={14} /> Regresar a los álbumes
                        </Link>
                        
                        <div>
                            <p className="text-[var(--green)] font-medium text-[10px] mb-2 italic">
                                {data.year} · Official Release
                            </p>
                            <h1 className="text-4xl md:text-[60px] font-bold tracking-tighter leading-[0.85] mb-4">
                                {renderTitle(data.album)}
                            </h1>
                        </div>

                        <div className="flex flex-wrap gap-10 items-center">
                            <div className="flex items-center gap-3">
                                <Disc className="text-white/20" size={20} />
                                <span className="text-white/40 text-xs font-light uppercase tracking-widest">{data.songs?.length || 0} Canciones</span>
                            </div>
                            <button className="bg-white text-black px-8 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-[var(--green)] transition-all duration-300 transform hover:scale-105">
                                Escuchar Ahora
                            </button>
                        </div>
                    </div>
                </div>

                {/* LISTA DE CANCIONES */}
                <div className="max-w-[900px] mx-auto px-2 sm:px-6">
                    <div className="grid grid-cols-[24px_1fr_60px] sm:grid-cols-[24px_50px_1fr_80px] px-3 sm:px-6 py-4 border-b border-white/10 text-white/20 text-[10px] font-bold uppercase tracking-widest gap-2 sm:gap-4">
                        <span>#</span>
                        <span className="hidden sm:block opacity-0">Cover</span>
                        <span>Título</span>
                        <span className="text-right flex justify-end"><Clock size={14} /></span>
                    </div>

                    <div className="divide-y divide-white/[0.05]">
                        {data.songs?.map((song, idx) => (
                            <motion.div
                                key={song.name}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(`Myke Towers ${data.album} ${song.name}`)}`, '_blank')}
                                className="grid grid-cols-[24px_1fr_60px] sm:grid-cols-[24px_50px_1fr_80px] items-center px-3 sm:px-6 py-3 sm:py-4 group hover:bg-white/[0.02] transition-colors cursor-pointer gap-2 sm:gap-4"
                            >
                                <span className="text-white/50 group-hover:text-white font-normal text-sm transition-colors">{song.track || idx + 1}</span>
                                
                                <picture className="hidden sm:block relative w-10 h-10 flex-shrink-0 overflow-hidden">
                                    <img 
                                        src={data.image} 
                                        alt={data.album} 
                                        className="w-full h-full object-cover scale-[1.3] transition-transform duration-300 group-hover:scale-100"
                                    />
                                </picture>

                                <div className="flex flex-col min-w-0">
                                    <span className="text-white/80 group-hover:text-white font-normal text-sm sm:text-base transition-colors uppercase tracking-tight leading-tight truncate">{song.name}</span>
                                    <span className="text-white/20 text-[9px] font-medium group-hover:text-white/40 transition-colors">Myke Towers</span>
                                </div>

                                <div className="flex justify-end items-center gap-2 sm:gap-4">
                                    <span className="text-white/30 text-xs sm:text-sm font-light">{song.duration}</span>
                                    <Play size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white shrink-0" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};
