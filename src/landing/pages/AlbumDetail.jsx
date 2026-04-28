import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { motion } from "framer-motion";
import { Play, ArrowLeft, Clock, Disc } from "lucide-react";

export const AlbumDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/albums/${id}/songs`)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching album detail:", err);
                setLoading(false);
            });
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

    return (
        <Layout>
            <section className="min-h-screen pt-[120px] pb-[100px]">
                {/* HERO DEL ÁLBUM */}
                <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-20 items-end mb-20">
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

                    <div className="space-y-8">
                        <Link to="/albums" className="flex items-center gap-2 text-white/40 hover:text-[var(--green)] transition-colors text-[10px] uppercase font-bold tracking-[0.3em]">
                            <ArrowLeft size={14} /> Volver a la discografía
                        </Link>
                        
                        <div>
                            <p className="text-[var(--green)] font-bold text-xs tracking-[0.5em] uppercase mb-4">
                                {data.year} · Official Release
                            </p>
                            <h1 className="text-6xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.8] mb-6">
                                {data.album}
                            </h1>
                        </div>

                        <div className="flex flex-wrap gap-10 items-center">
                            <div className="flex items-center gap-3">
                                <Disc className="text-white/20" size={20} />
                                <span className="text-white/40 text-sm font-light uppercase tracking-widest">{data.songs?.length || 0} Canciones</span>
                            </div>
                            <button className="bg-white text-black px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-[var(--green)] transition-all duration-300 transform hover:scale-105">
                                Escuchar Ahora
                            </button>
                        </div>
                    </div>
                </div>

                {/* LISTA DE CANCIONES */}
                <div className="max-w-[1100px] mx-auto px-6">
                    <div className="grid grid-cols-[50px_1fr_80px] px-6 py-4 border-b border-white/10 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                        <span>#</span>
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
                                className="grid grid-cols-[50px_1fr_80px] items-center px-6 py-6 group hover:bg-white/[0.02] transition-colors cursor-pointer"
                            >
                                <span className="text-white/10 group-hover:text-[var(--green)] font-bold text-sm transition-colors">{song.track || idx + 1}</span>
                                <div className="flex flex-col">
                                    <span className="text-white/70 group-hover:text-white font-bold text-base transition-colors uppercase tracking-tight">{song.name}</span>
                                    <span className="text-white/20 text-[10px] uppercase font-medium group-hover:text-white/40">Myke Towers</span>
                                </div>
                                <div className="flex justify-end items-center gap-4">
                                    <span className="text-white/30 text-sm font-light">{song.duration}</span>
                                    <Play size={16} className="text-[var(--green)] opacity-0 group-hover:opacity-100 transition-opacity fill-[var(--green)]" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};
