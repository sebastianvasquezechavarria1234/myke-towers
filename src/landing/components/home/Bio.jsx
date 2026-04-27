import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Bio = () => {
    const [info, setInfo] = useState(null);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resInfo, resStats] = await Promise.all([
                    fetch("http://localhost:3000/historia"),
                    fetch("http://localhost:3000/stats")
                ]);
                setInfo(await resInfo.json());
                setStats(await resStats.json());
            } catch (error) {
                console.error("Error fetching bio data:", error);
            }
        };
        fetchData();
    }, []);

    if (!info || !stats) return null;

    return (
        <section className="mt-[200px] mb-[150px] max-w-[1200px] mx-auto px-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-[60px] overflow-hidden backdrop-blur-3xl relative">
                
                {/* DECORATIVE LIGHT */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--blue)]/10 blur-[120px] -z-10 rounded-full" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    
                    {/* LEFT: CONTENT AREA */}
                    <div className="p-12 md:p-20 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] mb-8 rounded-full">
                                Official Profile
                            </span>
                            
                            <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[0.8] uppercase tracking-tighter">
                                Myke <br />
                                <span className="font-secundary text-[var(--blue)] normal-case text-7xl md:text-9xl">Towers</span>
                            </h2>
                            
                            <p className="text-white/50 text-lg leading-relaxed mb-12 max-w-md font-light">
                                {info.biografia.split('. ')[0]}. Descubre la trayectoria completa del Young King que está redefiniendo el género urbano.
                            </p>

                            <Link to="/biografia">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 border border-white/20 hover:border-white rounded-full text-[10px] uppercase tracking-[0.4em] font-black transition-colors"
                                >
                                    biografia de l young king
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* RIGHT: STATS & DATA AREA */}
                    <div className="bg-white/5 p-12 md:p-20 flex flex-col justify-center border-l border-white/10">
                        <div className="space-y-12">
                            {/* STAT 1 */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">Alcance Global</p>
                                <div className="flex items-baseline gap-4">
                                    <h3 className="text-5xl font-black text-white leading-none">{stats.oyentesMensuales.split(' ')[0]}</h3>
                                    <p className="text-xs text-[var(--green)] font-bold tracking-widest uppercase">Monthly</p>
                                </div>
                            </motion.div>

                            {/* STAT 2 */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">Éxito Principal</p>
                                <h3 className="text-3xl font-black text-[var(--blue)] uppercase leading-tight">{stats.cancionMasExitosa}</h3>
                            </motion.div>

                            {/* STAT 3 */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="pt-8 border-t border-white/10"
                            >
                                <div className="flex flex-wrap gap-2">
                                    {info.generos.map((gen) => (
                                        <span key={gen} className="text-[9px] uppercase tracking-[0.2em] px-3 py-1 bg-white/5 rounded-md text-white/40 border border-white/5">
                                            {gen}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
