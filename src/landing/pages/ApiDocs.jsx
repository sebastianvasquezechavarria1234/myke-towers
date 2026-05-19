import React, { useState } from "react";
import { Layout } from "../layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "../components/home/Hero";
import { socialWall } from "../../data/staticData";
import { 
    Terminal, 
    Copy, 
    Check, 
    Globe, 
    Database, 
    Music, 
    Instagram, 
    Youtube, 
    User, 
    BookOpen, 
    Code, 
    Cpu,
    ArrowUpRight,
    Server,
    ExternalLink
} from "lucide-react";

const ENDPOINTS_DATA = [
    {
        id: "overview",
        title: "Información General",
        icon: BookOpen,
        description: "Bienvenido a la API Profesional de Myke Towers. Esta API está diseñada para desarrolladores que desean consumir datos estructurados sobre la carrera, discografía, videos y presencia en redes sociales de 'El Young King'. La base de la API está optimizada para ser ultra rápida y de libre consumo público.",
        baseUrl: "https://myke-towers-api.onrender.com", // Fallback URL o URL demo
        localUrl: "http://localhost:3000"
    },
    {
        id: "albums",
        title: "1. Obtener Álbumes (GET /albums)",
        icon: Database,
        method: "GET",
        path: "/albums",
        description: "Devuelve la discografía completa de Myke Towers, incluyendo información detallada de cada álbum, portadas en alta resolución, años de lanzamiento y la lista completa de canciones en cada producción.",
        params: [],
        response: [
            {
                "id": "island-boyz-2025",
                "title": "ISLAND BOYZ",
                "year": "2025",
                "format": "Álbum de Estudio",
                "image": "https://cdn-images.dzcdn.net/images/cover/...",
                "songsCount": 23,
                "tracklist": [
                    { "track": 1, "name": "LA DESPEDIDA (feat. DFZM)", "duration": "03:40" },
                    { "track": 2, "name": "JETSKO", "duration": "02:49" }
                ]
            }
        ],
        code: {
            curl: "curl -X GET https://myke-towers-api.onrender.com/albums",
            javascript: "fetch('https://myke-towers-api.onrender.com/albums')\n  .then(res => res.json())\n  .then(data => console.log(data));",
            python: "import requests\n\nresponse = requests.get('https://myke-towers-api.onrender.com/albums')\nprint(response.json())"
        }
    },
    {
        id: "album-songs",
        title: "2. Detalle de Álbum (GET /albums/:id/songs)",
        icon: Music,
        method: "GET",
        path: "/albums/:id/songs",
        description: "Obtiene información específica y la lista de canciones de un álbum por su identificador único (ID).",
        params: [
            { name: "id", type: "string", required: true, description: "El ID único del álbum (ej: island-boyz-2025)" }
        ],
        response: {
            "album": "ISLAND BOYZ",
            "year": "2025",
            "image": "https://cdn-images.dzcdn.net/images/cover/...",
            "songs": [
                { "track": 1, "name": "LA DESPEDIDA (feat. DFZM)", "duration": "03:40" },
                { "track": 2, "name": "JETSKO", "duration": "02:49" }
            ]
        },
        code: {
            curl: "curl -X GET https://myke-towers-api.onrender.com/albums/island-boyz-2025/songs",
            javascript: "fetch('https://myke-towers-api.onrender.com/albums/island-boyz-2025/songs')\n  .then(res => res.json())\n  .then(data => console.log(data));",
            python: "import requests\n\nresponse = requests.get('https://myke-towers-api.onrender.com/albums/island-boyz-2025/songs')\nprint(response.json())"
        }
    },
    {
        id: "social",
        title: "3. Muro Social (GET /social)",
        icon: Instagram,
        method: "GET",
        path: "/social",
        description: "Devuelve los posts configurados para el muro social de Instagram de la página web oficial, con sus respectivas imágenes o videos, y clases CSS de grilla asociadas.",
        params: [],
        response: [
            {
                "id": 1,
                "type": "ig",
                "url": "https://i.pinimg.com/736x/c8/82/b5/...",
                "size": "col-span-2 row-span-2"
            },
            {
                "id": 2,
                "type": "video",
                "url": "https://v1.pinimg.com/videos/mc/...",
                "size": "col-span-1 row-span-1"
            }
        ],
        code: {
            curl: "curl -X GET https://myke-towers-api.onrender.com/social",
            javascript: "fetch('https://myke-towers-api.onrender.com/social')\n  .then(res => res.json())\n  .then(data => console.log(data));",
            python: "import requests\n\nresponse = requests.get('https://myke-towers-api.onrender.com/social')\nprint(response.json())"
        }
    },
    {
        id: "videos",
        title: "4. Videos de YouTube (GET /videos)",
        icon: Youtube,
        method: "GET",
        path: "/videos",
        description: "Devuelve una lista de hasta 30 videos oficiales y en vivo de Myke Towers en YouTube con metadatos extendidos como vistas, duración, fecha de publicación, director asignado y etiqueta de 'esNuevo'.",
        params: [],
        response: [
            {
                "id": "3rg0p23brQ0",
                "titulo": "W Sound 23 “5 Estrellas” - Myke Towers, Westcol, Ovy On The Drums",
                "vistas": 11664763,
                "duracion": "3:11",
                "publicado": "3 months ago",
                "imagen": "https://i.ytimg.com/vi/3rg0p23brQ0/hq720.jpg",
                "url": "https://youtube.com/watch?v=3rg0p23brQ0",
                "tipo": "Video Oficial",
                "album": "La Pantera Negra",
                "director": "Javyer",
                "esNuevo": true
            }
        ],
        code: {
            curl: "curl -X GET https://myke-towers-api.onrender.com/videos",
            javascript: "fetch('https://myke-towers-api.onrender.com/videos')\n  .then(res => res.json())\n  .then(data => console.log(data));",
            python: "import requests\n\nresponse = requests.get('https://myke-towers-api.onrender.com/videos')\nprint(response.json())"
        }
    },
    {
        id: "biography",
        title: "5. Biografía e Info (GET /historia)",
        icon: User,
        method: "GET",
        path: "/historia",
        description: "Obtiene información biográfica estructurada sobre Myke Towers, incluyendo su nombre real, fecha de nacimiento, origen, descripción detallada de su carrera y lista de sus logros más significativos.",
        params: [],
        response: {
            "nombreReal": "Michael Anthony Torres Monge",
            "nombreArtistico": "Myke Towers",
            "nacimiento": "15 de enero de 1994",
            "origen": "Río Piedras, Puerto Rico",
            "generos": ["Reggaetón", "Trap Latino", "Pop Urbano"],
            "biografia": "Conocido como 'El Young King'...",
            "logros": ["Múltiples nominaciones a los Latin Grammy", "Top global con el éxito 'LALA'"]
        },
        code: {
            curl: "curl -X GET https://myke-towers-api.onrender.com/historia",
            javascript: "fetch('https://myke-towers-api.onrender.com/historia')\n  .then(res => res.json())\n  .then(data => console.log(data));",
            python: "import requests\n\nresponse = requests.get('https://myke-towers-api.onrender.com/historia')\nprint(response.json())"
        }
    },
    {
        id: "stats",
        title: "6. Estadísticas de Carrera (GET /stats)",
        icon: Cpu,
        method: "GET",
        path: "/stats",
        description: "Devuelve estadísticas clave de Myke Towers, incluyendo su posicionamiento global actual en Spotify, canciones más icónicas y sus apodos.",
        params: [],
        response: {
            "oyentesMensuales": "Top 50 Global en Spotify",
            "cancionMasExitosa": "LALA / Piensan",
            "albumesPrincipales": ["Easy Money Baby", "Lyke Mike", "La Vida Es Una", "La Pantera Negra"],
            "apodos": ["El Young King", "Myke", "La Pantera"]
        },
        code: {
            curl: "curl -X GET https://myke-towers-api.onrender.com/stats",
            javascript: "fetch('https://myke-towers-api.onrender.com/stats')\n  .then(res => res.json())\n  .then(data => console.log(data));",
            python: "import requests\n\nresponse = requests.get('https://myke-towers-api.onrender.com/stats')\nprint(response.json())"
        }
    }
];

export const ApiDocs = () => {
    const [selectedTab, setSelectedTab] = useState("overview");
    const [hoveredTab, setHoveredTab] = useState(null);
    const [codeLanguage, setCodeLanguage] = useState("javascript");
    const [copiedText, setCopiedText] = useState(null);

    const activeData = ENDPOINTS_DATA.find(d => d.id === selectedTab) || ENDPOINTS_DATA[0];

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopiedText(key);
        setTimeout(() => setCopiedText(null), 2000);
    };

    return (
        <Layout>
            <Hero 
                tagline="#Young King API. Datos en tiempo real."
                title={
                    <>
                        Documentación de 
                        <span className="px-[10px] font-secundary text-[var(--blue)]">API</span> 
                        y recursos para 
                        <span className="px-[10px] font-secundary text-[var(--blue)]">desarrolladores</span>.
                    </>
                }
                images={[]}
                showVideo={false}
                hasBorder={false}
            />

            <div className="pb-24 max-w-[1100px] mx-auto px-6 pt-16">
                
                {/* Cabecera / Info del Servidor */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 pb-12 border-b border-white/[0.06] text-center"
                >
                    <p className="text-white/40 text-base md:text-lg max-w-[700px] mx-auto font-light leading-relaxed mb-8">
                        Accede a todos los endpoints disponibles de la API oficial de Myke Towers. Integra la discografía, muro social, biografía y estadísticas directamente en tus propios proyectos de desarrollo.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-6">
                        <a 
                            href="https://github.com/sebastianvasquezechavarria1234/myke-towers-api"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-150 text-[12px] font-mono tracking-wide"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            <span className="underline underline-offset-4 decoration-white/30 italic">Repositorio</span>
                            <ExternalLink size={12} />
                        </a>
                        <a
                            href="https://myke-towers-api.onrender.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-150 text-[12px] font-mono tracking-wide"
                        >
                            <Server size={14} />
                            <span className="underline underline-offset-4 decoration-white/30 italic">API <span className="text-white/30">—</span> myke-towers-api.onrender.com</span>
                            <ExternalLink size={12} />
                        </a>
                    </div>
                </motion.div>

                {/* Dashboard Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-10 relative">
                    
                    <div className="relative lg:col-span-3">
                        <div className="lg:sticky lg:top-[120px] flex flex-col gap-1 bg-black/60 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-y lg:border-none border-white/5 py-4 lg:py-0 mb-8 lg:mb-0">
                            <div className="hidden lg:flex items-center px-4 mb-5">
                                <span className="text-white/20 text-[9px] font-light">navegación</span>
                            </div>
                            <div className="relative flex lg:flex-col gap-0 overflow-x-auto lg:overflow-visible px-1 lg:px-0">
                                {ENDPOINTS_DATA.map((endpoint) => {
                                    const IconComp = endpoint.icon;
                                    const isSelected = selectedTab === endpoint.id;
                                    return (
                                        <button
                                            key={endpoint.id}
                                            onClick={() => setSelectedTab(endpoint.id)}
                                            onMouseEnter={() => setHoveredTab(endpoint.id)}
                                            onMouseLeave={() => setHoveredTab(null)}
                                            className={`flex items-center gap-3 pl-4 pr-3 h-10 text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal flex-shrink-0 ${
                                                isSelected 
                                                    ? "text-white font-medium" 
                                                    : "text-white/30 hover:text-white/60"
                                            }`}
                                        >
                                            <IconComp size={14} className="text-white/60" />
                                            <span className="text-[12px] truncate">{endpoint.title.replace(/\(.*?\)/g, "")}</span>
                                        </button>
                                    );
                                })}
                                <motion.div
                                    className="hidden lg:block absolute left-0 w-0.5 bg-white/80"
                                    initial={false}
                                    style={{ height: 28, top: 6 }}
                                    animate={{ y: ENDPOINTS_DATA.findIndex(d => d.id === (hoveredTab || selectedTab)) * 40 }}
                                    transition={{ type: "spring", stiffness: 420, damping: 20 }}
                                />
                            </div>
                        </div>
                        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* Contenido del Endpoint */}
                    <div className="lg:col-span-9 space-y-8 lg:pl-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedTab}
                                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                {/* Info Principal */}
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            {activeData.method && (
                                                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] google-sans-code-api font-bold tracking-wider rounded">
                                                    {activeData.method}
                                                </span>
                                            )}
                                            {activeData.path && (
                                                <span className="text-white/30 google-sans-code-api text-xs">
                                                    <span className="text-white/10">{activeData.path.split('/').slice(0, -1).join('/')}/</span>{activeData.path.split('/').pop()}
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{activeData.title.replace(/^[\d]+\.\s*/, '')}</h2>
                                    </div>
                                    <p className="text-white/40 text-sm md:text-base leading-relaxed font-light border-l-2 border-white/5 pl-4">
                                        {activeData.description}
                                    </p>

                                    {/* Parámetros de Ruta/Query */}
                                    {activeData.params && activeData.params.length > 0 && (
                                        <div className="pt-5 border-t border-white/[0.04] space-y-4">
                                            <h3 className="text-white/50 text-[10px] google-sans-code-api tracking-[0.15em]">PARÁMETROS</h3>
                                            <div className="overflow-x-auto -mx-6 md:-mx-10">
                                                <table className="w-full text-left text-xs">
                                                    <thead>
                                                        <tr className="border-b border-white/[0.04]">
                                                            <th className="py-3 px-6 text-white/20 google-sans-code-api text-[10px] tracking-wider font-medium">Nombre</th>
                                                            <th className="py-3 px-6 text-white/20 google-sans-code-api text-[10px] tracking-wider font-medium">Tipo</th>
                                                            <th className="py-3 px-6 text-white/20 google-sans-code-api text-[10px] tracking-wider font-medium">Requerido</th>
                                                            <th className="py-3 px-6 text-white/20 google-sans-code-api text-[10px] tracking-wider font-medium">Descripción</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {activeData.params.map((p, idx) => (
                                                            <tr key={idx} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                                                                <td className="py-3.5 px-6 text-white/80 google-sans-code-api text-[12px]">{p.name}</td>
                                                                <td className="py-3.5 px-6">
                                                                    <span className="text-[var(--blue)] google-sans-code-api text-[11px] bg-[var(--blue)]/5 px-2 py-0.5 rounded">{p.type}</span>
                                                                </td>
                                                                <td className="py-3.5 px-6">
                                                                    <span className={`text-[10px] google-sans-code-api tracking-wider ${p.required ? "text-red-400/80" : "text-white/20"}`}>
                                                                        {p.required ? "REQUERIDO" : "OPCIONAL"}
                                                                    </span>
                                                                </td>
                                                                <td className="py-3.5 px-6 text-white/40 text-[12px]">{p.description}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Pestaña del Overview General */}
                                {selectedTab === "overview" && (
                                    <div className="space-y-6">

                                        {/* Root endpoint response block */}
                                        <div className="bg-zinc-950/80 border border-white/[0.06] flex flex-col overflow-hidden hover:border-white/[0.1] transition-colors duration-500">
                                            <div className="flex justify-between items-center border-b border-white/[0.04] bg-black/30 px-5 py-2.5">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] google-sans-code-api font-bold tracking-wider rounded">GET</span>
                                                    <span className="text-white/30 google-sans-code-api text-xs">
                                                        <span className="text-white/10">https://myke-towers-api.onrender.com</span>/
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[9px] text-white/20 google-sans-code-api tracking-wider">RESPUESTA &nbsp;·&nbsp; <span className="text-emerald-400/60">200 OK</span></span>
                                                    <button
                                                        onClick={() => copyToClipboard(JSON.stringify({
                                                            "mensaje": "Bienvenido a la API Profesional de Myke Towers",
                                                            "version": "3.0.0",
                                                            "descripción": "API optimizada con datos locales y conexión a iTunes/YouTube.",
                                                            "endpoints": [
                                                                "/albums - Discografía completa (Local)",
                                                                "/albums/:id/songs - Canciones de un álbum (Local)",
                                                                "/social - Posts del muro social",
                                                                "/historia - Biografía y datos personales",
                                                                "/videos - Videos de YouTube",
                                                                "/dynamic-albums - Discografía en tiempo real (iTunes)"
                                                            ]
                                                        }, null, 2), "root-response")}
                                                        className="p-1.5 text-white/20 hover:text-white/60 transition-colors"
                                                        title="Copiar respuesta JSON"
                                                    >
                                                        {copiedText === "root-response" ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                                                    </button>
                                                </div>
                                            </div>
                                            <pre className="p-5 text-[11px] text-white/50 google-sans-code-api overflow-auto max-h-[340px] whitespace-pre leading-relaxed custom-scrollbar">
                                                <code>{`{
  `}<span className="text-[var(--blue)]/80">"mensaje"</span>{`: `}<span className="text-emerald-300/80">"Bienvenido a la API Profesional de Myke Towers"</span>{`,
  `}<span className="text-[var(--blue)]/80">"version"</span>{`: `}<span className="text-emerald-300/80">"3.0.0"</span>{`,
  `}<span className="text-[var(--blue)]/80">"descripción"</span>{`: `}<span className="text-emerald-300/80">"API optimizada con datos locales y conexión a iTunes/YouTube."</span>{`,
  `}<span className="text-[var(--blue)]/80">"endpoints"</span>{`: [
    `}<span className="text-emerald-300/80">"/albums"</span>{`               `}<span className="text-white/20">// Discografía completa (Local)</span>{`
    `}<span className="text-emerald-300/80">"/albums/:id/songs"</span>{`      `}<span className="text-white/20">// Canciones de un álbum (Local)</span>{`
    `}<span className="text-emerald-300/80">"/social"</span>{`                `}<span className="text-white/20">// Posts del muro social</span>{`
    `}<span className="text-emerald-300/80">"/historia"</span>{`              `}<span className="text-white/20">// Biografía y datos personales</span>{`
    `}<span className="text-emerald-300/80">"/videos"</span>{`                `}<span className="text-white/20">// Videos de YouTube</span>{`
    `}<span className="text-emerald-300/80">"/dynamic-albums"</span>{`        `}<span className="text-white/20">// Discografía en tiempo real (iTunes)</span>{`
  ]
}`}</code>
                                            </pre>
                                        </div>

                                        {/* Endpoint index table */}
                                        <div className="bg-zinc-900/20 border border-white/[0.06] overflow-hidden">
                                            <div className="px-6 py-4 border-b border-white/[0.04] flex items-center gap-2">
                                                <Cpu size={13} className="text-white/30" />
                                                <span className="text-white/30 text-[10px] google-sans-code-api tracking-[0.15em]">ÍNDICE DE ENDPOINTS</span>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-xs">
                                                    <thead>
                                                        <tr className="border-b border-white/[0.04]">
                                                            <th className="py-3 px-6 text-white/20 google-sans-code-api text-[10px] tracking-wider font-medium">Método</th>
                                                            <th className="py-3 px-6 text-white/20 google-sans-code-api text-[10px] tracking-wider font-medium">Ruta</th>
                                                            <th className="py-3 px-6 text-white/20 google-sans-code-api text-[10px] tracking-wider font-medium">Descripción</th>
                                                            <th className="py-3 px-6 text-white/20 google-sans-code-api text-[10px] tracking-wider font-medium">Fuente</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[
                                                            { method: "GET", path: "/", desc: "Información general y bienvenida", source: "Local" },
                                                            { method: "GET", path: "/albums", desc: "Discografía completa de Myke Towers", source: "Local" },
                                                            { method: "GET", path: "/albums/:id/songs", desc: "Canciones de un álbum por ID", source: "Local" },
                                                            { method: "GET", path: "/social", desc: "Posts del muro social", source: "Local" },
                                                            { method: "GET", path: "/historia", desc: "Biografía y datos personales", source: "Local" },
                                                            { method: "GET", path: "/videos", desc: "Videos musicales de YouTube", source: "YouTube API" },
                                                            { method: "GET", path: "/dynamic-albums", desc: "Discografía en tiempo real", source: "iTunes API" },
                                                            { method: "GET", path: "/stats", desc: "Estadísticas generales", source: "Local" },
                                                        ].map((ep, i) => (
                                                            <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.015] transition-colors group">
                                                                <td className="py-3.5 px-6">
                                                                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] google-sans-code-api font-bold rounded">{ep.method}</span>
                                                                </td>
                                                                <td className="py-3.5 px-6 text-white/70 google-sans-code-api text-[12px] group-hover:text-white transition-colors">{ep.path}</td>
                                                                <td className="py-3.5 px-6 text-white/35 text-[12px]">{ep.desc}</td>
                                                                <td className="py-3.5 px-6">
                                                                    <span className={`text-[10px] google-sans-code-api tracking-wider px-2 py-0.5 rounded ${
                                                                        ep.source === "Local" 
                                                                            ? "text-white/30 bg-white/5" 
                                                                            : ep.source === "iTunes API"
                                                                                ? "text-pink-400/60 bg-pink-500/5"
                                                                                : "text-red-400/60 bg-red-500/5"
                                                                    }`}>{ep.source}</span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Info cards at the bottom */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                                                        <Globe size={13} className="text-white/40" />
                                                    </div>
                                                    <h3 className="text-white font-semibold text-sm">Consumo Directo</h3>
                                                </div>
                                                <p className="text-white/35 text-[13px] leading-relaxed font-light">
                                                    La API no requiere tokens ni llaves de autenticación. CORS habilitado públicamente. Puedes realizar peticiones de forma ilimitada desde cualquier cliente REST o aplicación.
                                                </p>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                                                        <Code size={13} className="text-white/40" />
                                                    </div>
                                                    <h3 className="text-white font-semibold text-sm">Formatos de Respuesta</h3>
                                                </div>
                                                <p className="text-white/35 text-[13px] leading-relaxed font-light">
                                                    Todas las respuestas son devueltas en formato estándar <span className="text-white/60 google-sans-code-api text-[11px]">JSON</span> con codificación UTF-8 y respuestas HTTP rápidas optimizadas mediante caché interna.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}


                                {/* Pestaña de Consumo y Respuesta JSON (solo para Endpoints) */}
                                {selectedTab !== "overview" && (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                        
                                        {/* Bloque de código */}
                                        <div className="bg-zinc-950/80 border border-white/[0.06] flex flex-col overflow-hidden group hover:border-white/[0.1] transition-colors duration-500">
                                            <div className="flex justify-between items-center border-b border-white/[0.04] bg-black/30 px-5 py-2.5">
                                                <div className="flex gap-1.5">
                                                    {["javascript", "python", "curl"].map((lang) => (
                                                        <button
                                                            key={lang}
                                                            onClick={() => setCodeLanguage(lang)}
                                                            className={`px-3 py-1 text-[10px] google-sans-code-api tracking-wider transition-all duration-300 rounded ${
                                                                codeLanguage === lang 
                                                                    ? "bg-white/10 text-white font-semibold" 
                                                                    : "text-white/20 hover:text-white/50"
                                                            }`}
                                                        >
                                                            {lang === "javascript" ? "js" : lang}
                                                        </button>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(activeData.code[codeLanguage], "code")}
                                                    className="p-1.5 text-white/20 hover:text-white/60 transition-colors"
                                                    title="Copiar código"
                                                >
                                                    {copiedText === "code" ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                                                </button>
                                            </div>
                                            <pre className="flex-1 p-5 text-[11px] text-emerald-300/80 google-sans-code-api overflow-auto max-h-[350px] whitespace-pre leading-relaxed custom-scrollbar">
                                                <code>{activeData.code[codeLanguage]}</code>
                                            </pre>
                                        </div>

                                        {/* Bloque de respuesta JSON */}
                                        <div className="bg-zinc-950/80 border border-white/[0.06] flex flex-col overflow-hidden group hover:border-white/[0.1] transition-colors duration-500">
                                            <div className="flex justify-between items-center border-b border-white/[0.04] bg-black/30 px-5 py-2.5">
                                                <span className="text-[9px] text-white/20 google-sans-code-api tracking-wider">RESPUESTA &nbsp;·&nbsp; <span className="text-emerald-400/60">200 OK</span></span>
                                                <button
                                                    onClick={() => copyToClipboard(JSON.stringify(activeData.response, null, 2), "response")}
                                                    className="p-1.5 text-white/20 hover:text-white/60 transition-colors"
                                                    title="Copiar respuesta JSON"
                                                >
                                                    {copiedText === "response" ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                                                </button>
                                            </div>
                                            <pre className="flex-1 p-5 text-[11px] text-white/40 google-sans-code-api overflow-auto max-h-[350px] whitespace-pre leading-relaxed custom-scrollbar">
                                                <code>{JSON.stringify(activeData.response, null, 2)}</code>
                                            </pre>
                                        </div>
                                    </div>
                                )}

                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

            </div>
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 0px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.12); }
            `}</style>
        </Layout>
    );
};
