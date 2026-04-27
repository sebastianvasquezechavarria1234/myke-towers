import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="mt-[200px] border-t border-white/5 pt-20 pb-10 px-4">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                {/* BRAND */}
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-3xl font-bold mb-6">
                        MYKE <span className="font-secundary text-4xl text-[var(--blue)]">Towers</span>
                    </h2>
                    <p className="text-white/40 max-w-xs leading-relaxed">
                        El Young King. Liderando el movimiento urbano con cada verso. 
                        No seguimos tendencias, somos la tendencia.
                    </p>
                </div>

                {/* LINKS */}
                <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 opacity-40">Navegación</h4>
                    <ul className="space-y-4">
                        <li><Link to="/" className="text-white/60 hover:text-white transition-colors">Inicio</Link></li>
                        <li><Link to="/musica" className="text-white/60 hover:text-white transition-colors">Música</Link></li>
                        <li><Link to="/api" className="text-white/60 hover:text-white transition-colors">API Docs</Link></li>
                    </ul>
                </div>

                {/* SOCIAL */}
                <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 opacity-40">Síguenos</h4>
                    <ul className="space-y-4 text-white/60">
                        <li><a href="https://youtube.com/@myketowers" target="_blank" className="hover:text-white transition-colors">YouTube</a></li>
                        <li><a href="https://instagram.com/myketowers" target="_blank" className="hover:text-white transition-colors">Instagram</a></li>
                        <li><a href="https://open.spotify.com/artist/7iK8pNZtYv9Gv38zGImunG" target="_blank" className="hover:text-white transition-colors">Spotify</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto border-t border-white/5 pt-10 flex flex-col md:row items-center justify-between gap-4">
                <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
                    &copy; 2027 Young King Entertainment. Todos los derechos reservados.
                </p>
                <p className="text-white/10 text-[10px] uppercase tracking-widest font-bold">
                    Designed for Myke Towers Fans
                </p>
            </div>
        </footer>
    );
};