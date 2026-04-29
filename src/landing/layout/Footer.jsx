import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer className="relative z-50 -mt-[40vh] px-4 pb-6">
            <div className="max-w-[1200px] mx-auto">
                {/* GLASS PANEL — mismo estilo que el header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] rounded-[40px] overflow-hidden p-10 md:p-14"
                >
                    {/* Glow decorativo */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-white/[0.03] blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                        {/* BRAND */}
                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <h2 className="font-secundary text-5xl leading-none">
                                Myke Towers
                            </h2>
                            <p className="text-white/40 max-w-xs leading-relaxed text-sm font-light">
                                El Young King. Liderando el movimiento urbano con cada verso.
                                No seguimos tendencias, somos la tendencia.
                            </p>
                        </div>

                        {/* NAV */}
                        <div className="space-y-4">
                            <h4 className="text-white/20 text-xs font-medium mb-6">Navegación</h4>
                            <ul className="space-y-3">
                                <li><Link to="/" className="text-white/50 hover:text-white transition-colors text-sm font-light">Inicio</Link></li>
                                <li><Link to="/biografia" className="text-white/50 hover:text-white transition-colors text-sm font-light">Biografía</Link></li>
                                <li>
                                    <a href="https://www.myketowerspr.com/" target="_blank" rel="noopener noreferrer"
                                        className="text-white/50 hover:text-white transition-colors text-sm font-light">
                                        Sitio oficial
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* SOCIAL */}
                        <div className="space-y-4">
                            <h4 className="text-white/20 text-xs font-medium mb-6">Síguenos</h4>
                            <ul className="space-y-3 text-white/50">
                                <li>
                                    <a href="https://youtube.com/@myketowers" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-white transition-colors text-sm font-light">
                                        YouTube
                                    </a>
                                </li>
                                <li>
                                    <a href="https://instagram.com/myketowers" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-white transition-colors text-sm font-light">
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="https://open.spotify.com/artist/7iK8pNZtYv9Gv38zGImunG" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-white transition-colors text-sm font-light">
                                        Spotify
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* BOTTOM BAR */}
                    <div className="relative z-10 border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
                        <p className="text-white/20 text-xs font-light">
                            © 2027 Young King Entertainment. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-3 text-white/20 text-xs font-light">
                            <span>Desarrollado por Sebastian Vasquez</span>
                            <span className="text-white/10">·</span>
                            <a
                                href="https://github.com/sebastianvasquezechavarria1234"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white/60 transition-colors underline underline-offset-4"
                            >
                                GitHub
                            </a>
                            <span className="text-white/10">·</span>
                            <a
                                href="https://sebas-dev.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white/60 transition-colors underline underline-offset-4"
                            >
                                Portfolio
                            </a>
                        </div>
                    </div>

                    {/* PROGRESS LINE decorativa (igual al header) */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-b-[40px]" />
                </motion.div>
            </div>
        </footer>
    );
};