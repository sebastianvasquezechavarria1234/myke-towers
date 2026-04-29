import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer className="mt-[120px] w-full">

            {/* ── CTA BANNER (tarjeta oscura superior) ── */}
            <div className="max-w-[1200px] mx-auto px-4 mb-[-2px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0d0d0d] border border-white/10 rounded-3xl px-8 md:px-12 py-8 overflow-hidden z-10"
                >
                    {/* Glow de fondo */}
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none" />
                    <div className="absolute right-0 top-0 w-60 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none" />

                    {/* Icono + Texto */}
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center text-white font-black text-2xl shadow-lg select-none shrink-0">
                            M
                        </div>
                        <div>
                            <p className="text-white font-bold text-lg md:text-xl leading-tight">Escucha a Myke Towers</p>
                            <p className="text-white/40 text-sm font-light mt-0.5">Disponible en todas las plataformas de streaming.</p>
                        </div>
                    </div>

                    {/* Botones de plataformas */}
                    <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
                        <a href="https://open.spotify.com/artist/7iK8pNZtYv9Gv38zGImunG" target="_blank" rel="noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1DB954] hover:brightness-110 transition text-black text-[13px] font-bold">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                            Spotify
                        </a>
                        <a href="https://music.apple.com/us/artist/myke-towers/1065981054" target="_blank" rel="noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition text-white text-[13px] font-bold">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
                            Apple Music
                        </a>
                        <a href="https://youtube.com/@myketowers" target="_blank" rel="noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition text-white text-[13px] font-bold">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            YouTube
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* ── BLOQUE GRADIENTE PRINCIPAL ── */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative w-full overflow-hidden"
                style={{
                    background: "#3a3faa",
                    backgroundImage: `
                        radial-gradient(ellipse at 100% 0%, #e86030 0%, transparent 50%),
                        radial-gradient(ellipse at 100% 50%, #a0c8f0 0%, transparent 45%),
                        radial-gradient(ellipse at 100% 100%, #d090e0 0%, transparent 50%),
                        radial-gradient(ellipse at 0% 100%, #2525a0 0%, transparent 60%),
                        radial-gradient(ellipse at 50% 50%, #5055c8 0%, transparent 70%)
                    `
                }}
            >
                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
                />

                <div className="relative z-10 max-w-[1200px] mx-auto px-8 pt-16 pb-10">

                    {/* NOMBRE GIGANTE */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="font-secundary text-[clamp(60px,10vw,160px)] leading-none text-white/90 mb-12 tracking-tight"
                    >
                        Myke<br />Towers
                    </motion.h1>

                    {/* GRID DE LINKS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 border-t border-white/10 pt-10">
                        <div className="space-y-4">
                            <p className="text-white/30 text-[11px] uppercase tracking-widest font-medium">Navegación</p>
                            <ul className="space-y-3">
                                <li><Link to="/" className="text-white/70 hover:text-white text-sm font-light transition-colors">Inicio</Link></li>
                                <li><Link to="/biografia" className="text-white/70 hover:text-white text-sm font-light transition-colors">Biografía</Link></li>
                                <li><a href="https://www.myketowerspr.com/" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white text-sm font-light transition-colors">Sitio oficial</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="text-white/30 text-[11px] uppercase tracking-widest font-medium">Música</p>
                            <ul className="space-y-3">
                                <li><a href="https://open.spotify.com/artist/7iK8pNZtYv9Gv38zGImunG" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white text-sm font-light transition-colors">Spotify</a></li>
                                <li><a href="https://music.apple.com/us/artist/myke-towers/1065981054" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white text-sm font-light transition-colors">Apple Music</a></li>
                                <li><a href="https://youtube.com/@myketowers" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white text-sm font-light transition-colors">YouTube</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="text-white/30 text-[11px] uppercase tracking-widest font-medium">Redes</p>
                            <ul className="space-y-3">
                                <li><a href="https://instagram.com/myketowers" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white text-sm font-light transition-colors">Instagram</a></li>
                                <li><a href="https://x.com/myketowers" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white text-sm font-light transition-colors">X / Twitter</a></li>
                                <li><a href="https://tiktok.com/@myketowers" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white text-sm font-light transition-colors">TikTok</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="text-white/30 text-[11px] uppercase tracking-widest font-medium">Dev</p>
                            <ul className="space-y-3">
                                <li><a href="https://github.com/sebastianvasquezechavarria1234" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white text-sm font-light transition-colors">GitHub</a></li>
                                <li><a href="https://sebas-dev.vercel.app/" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white text-sm font-light transition-colors">Portfolio</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* BOTTOM BAR */}
                    <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                        <p className="text-white/30 text-xs font-light">
                            © 2027 Young King Entertainment. Todos los derechos reservados.
                        </p>
                        <p className="text-white/30 text-xs font-light">
                            Desarrollado por Sebastian Vasquez
                        </p>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
};