import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

/* Constantes de Estilo */
const GRADIENT_BORDER = "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)";
const VERTICAL_GRADIENT = "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)";

/* Ícono flecha externa (Lucide) */
const ExternalIcon = () => (
    <span className="inline-flex items-center justify-center shrink-0 opacity-100 transition-opacity ml-1.5">
        <ExternalLink size={11} strokeWidth={1.5} />
    </span>
);

/* Íconos para los botones de acción */
const GithubIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

const RepoIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

const PortfolioIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

/* Ícono social en CÍRCULO */
const SocialCircle = ({ href, children, title }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        title={title}
        className="flex items-center justify-center transition-all duration-300 group"
        style={{
            width: "36px",
            height: "34px",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "50%",
            color: "rgba(255,255,255,0.4)",
        }}
        onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        }}
        onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
            e.currentTarget.style.background = "transparent";
        }}
    >
        {children}
    </a>
);

/* Link de navegación simple */
const NavLink = ({ to, href, children, external }) => {
    const cls = "text-[13px] font-light transition-colors duration-200 flex items-center group py-1";
    const style = { color: "rgba(255,255,255,0.35)" };
    const hover = e => e.currentTarget.style.color = "#ffffff";
    const leave = e => e.currentTarget.style.color = "rgba(255,255,255,0.35)";

    if (href) return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}
            className={cls} style={style} onMouseEnter={hover} onMouseLeave={leave}>
            {children} <ExternalIcon />
        </a>
    );
    return (
        <Link to={to} className={cls} style={style} onMouseEnter={hover} onMouseLeave={leave}>
            {children} <ExternalIcon />
        </Link>
    );
};

/* Botón Minimalista */
const ActionButton = ({ href, children, icon: Icon }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noreferrer"
        className="font-light transition-all duration-300 flex items-center gap-1.5 group py-0.5"
        style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}
        onMouseEnter={e => e.currentTarget.style.color = "#ffffff"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
    >
        <span className="opacity-90 group-hover:opacity-100 transition-opacity">
            <Icon />
        </span>
        <span className="underline underline-offset-4 decoration-white/20 group-hover:decoration-white/50">
            {children}
        </span>
    </a>
);

export const Footer = () => {
    return (
        <footer className="w-full px-6 pb-12" style={{ marginTop: "140px" }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-[1240px] mx-auto rounded-[32px] overflow-hidden relative"
                style={{
                    background: "linear-gradient(to bottom, rgba(33, 36, 41, 0.8), transparent)",
                    backdropFilter: "blur(12px)",
                    borderTop: "2px solid rgba(255,255,255,0.06)",
                }}
            >
                <div className="flex flex-col md:flex-row items-center p-10 md:p-14 gap-12 md:gap-0">

                    {/* ── COLUMNA IZQUIERDA ── */}
                    <div className="flex-1 flex flex-col gap-8 pr-0 md:pr-12">
                        {/* Cabecera */}
                        <div className="flex flex-col leading-[0.8]">
                            <span className="font-secundary text-white text-[44px]" style={{ fontWeight: 100 }}>Myke Towers</span>
                            <span className="font-secundary text-white/20 text-[32px] italic" style={{ fontWeight: 100 }}>Young King Baby</span>
                        </div>

                        {/* Tagline Profesional */}
                        <p className="text-white/80 text-[20px] md:text-[24px] leading-[1.4] font-light tracking-tight max-w-[420px]">
                            Un proyecto editorial de vanguardia enfocado en la experiencia digital del artista. Diseñado y desarrollado por Sebastian Vasquez Echavarria.
                        </p>

                        {/* Botones de Acción */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5">
                            <ActionButton href="https://github.com/sebastianvasquezechavarria1234/myke-towers" icon={RepoIcon}>
                                Ver Repositorio
                            </ActionButton>
                            <ActionButton href="https://github.com/sebastianvasquezechavarria1234" icon={GithubIcon}>
                                Mi GitHub
                            </ActionButton>
                            <ActionButton href="https://sebas-dev.vercel.app/" icon={PortfolioIcon}>
                                Portfolio Web
                            </ActionButton>
                        </div>

                        {/* Copyright */}
                        <div>
                            <p className="font-thin tracking-[0.05em] opacity-80" style={{ fontSize: "10px" }}>
                                © 2027 Young King Entertainment. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>

                    {/* Divisor Vertical 1 */}
                    <div className="hidden md:block w-[1.5px] self-stretch my-4" 
                        style={{ background: VERTICAL_GRADIENT }} 
                    />

                    {/* ── COLUMNAS CENTRALES ── */}
                    <div className="flex-[1.2] flex flex-col md:flex-row px-0 md:px-12 gap-8 md:gap-0">
                        {/* Navegación */}
                        <div className="flex-1 flex flex-col gap-1.5">
                            <p className="text-[11px] font-medium text-white/90 mb-3">Páginas</p>
                            <NavLink to="/">Inicio</NavLink>
                            <NavLink to="/biografia">Biografía</NavLink>
                            <NavLink to="/">Discografía</NavLink>
                            <NavLink to="/">Música</NavLink>
                            <NavLink to="/">Social Wall</NavLink>
                        </div>
                        {/* Oficial */}
                        <div className="flex-1 flex flex-col gap-1.5">
                            <p className="text-[11px] font-medium text-white/90 mb-3">Oficial</p>
                            <NavLink href="https://www.myketowerspr.com/" external>Sitio Web</NavLink>
                            <NavLink href="https://www.instagram.com/myketowers" external>Instagram</NavLink>
                            <NavLink href="https://www.tiktok.com/@myketowers" external>TikTok</NavLink>
                        </div>
                    </div>

                    {/* Divisor Vertical 2 */}
                    <div className="hidden md:block w-[1.5px] self-stretch my-4" 
                        style={{ background: VERTICAL_GRADIENT }} 
                    />

                    {/* ── COLUMNA DERECHA ── */}
                    <div className="flex flex-row md:flex-col items-center justify-center gap-4 pl-0 md:pl-12">
                        <SocialCircle href="https://open.spotify.com/artist/7iK8pNZtYv9Gv38zGImunG" title="Spotify">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                        </SocialCircle>
                        <SocialCircle href="https://music.apple.com/us/artist/myke-towers/1065981054" title="Apple Music">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
                        </SocialCircle>
                        <SocialCircle href="https://youtube.com/@myketowers" title="YouTube">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </SocialCircle>
                        <SocialCircle href="https://instagram.com/myketowers" title="Instagram">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                        </SocialCircle>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
};