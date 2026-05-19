import React, { useState } from "react";
import { Layout } from "../layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
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
            <div className="pt-[100px] md:pt-[150px] pb-24 max-w-[1300px] mx-auto px-6">
                
                {/* Cabecera */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center lg:text-left border-b border-white/5 pb-12"
                >
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                        <Terminal className="text-[var(--blue)] w-8 h-8" />
                        <span className="text-white/40 uppercase tracking-[0.3em] text-xs font-semibold">Desarrolladores</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-6">
                        Documentación de 
                        <span className="font-secundary italic lowercase ml-2 text-[var(--blue)]">API</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-[800px] font-light leading-relaxed">
                        Accede a todos los endpoints disponibles de la API oficial de Myke Towers. Integra la discografía, muro social, biografía y estadísticas directamente en tus propios proyectos de desarrollo.
                    </p>
                    
                    {/* Botones de Links */}
                    <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                        <a 
                            href="https://github.com/sebastianvasquezechavarria1234/myke-towers-api"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full transition-all duration-300 text-[13px] font-medium"
                        >
                            <span>Repositorio del Backend API</span>
                            <ExternalLink size={14} />
                        </a>
                        <div className="flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-white/5 rounded-full text-white/50 text-[13px]">
                            <Server size={14} className="text-green-400" />
                            <span>Servidor API local activo en:</span>
                            <code className="text-white font-mono bg-white/5 px-2 py-0.5 rounded">http://localhost:3000</code>
                        </div>
                    </div>
                </motion.div>

                {/* Dashboard Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Sidebar de navegación */}
                    <div className="lg:col-span-3 flex flex-col gap-2">
                        <h4 className="text-white/30 text-[11px] uppercase tracking-widest font-semibold px-4 mb-2">Navegación</h4>
                        {ENDPOINTS_DATA.map((endpoint) => {
                            const IconComp = endpoint.icon;
                            const isSelected = selectedTab === endpoint.id;
                            return (
                                <button
                                    key={endpoint.id}
                                    onClick={() => setSelectedTab(endpoint.id)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-none text-left transition-all duration-300 border-l-[3px] ${
                                        isSelected 
                                            ? "bg-white/5 border-[var(--blue)] text-white font-medium" 
                                            : "border-transparent text-white/40 hover:text-white hover:bg-white/[0.02]"
                                    }`}
                                >
                                    <IconComp size={16} className={isSelected ? "text-[var(--blue)]" : ""} />
                                    <span className="text-[13px] tracking-wide truncate">{endpoint.title.replace(/\(.*?\)/g, "")}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Contenido del Endpoint */}
                    <div className="lg:col-span-9 space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-8"
                            >
                                {/* Info Principal */}
                                <div className="bg-zinc-900/40 border border-white/5 p-8 md:p-10 rounded-none space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-3xl font-bold tracking-tight text-white">{activeData.title}</h2>
                                        {activeData.method && (
                                            <div className="flex items-center gap-3 mt-3">
                                                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold font-mono tracking-wider rounded">
                                                    {activeData.method}
                                                </span>
                                                <span className="text-white/60 font-mono text-sm">
                                                    {activeData.path}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-white/50 text-base leading-relaxed font-light">
                                        {activeData.description}
                                    </p>

                                    {/* Parámetros de Ruta/Query */}
                                    {activeData.params && activeData.params.length > 0 && (
                                        <div className="pt-4 border-t border-white/5 space-y-4">
                                            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Parámetros</h3>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-xs font-light text-white/50">
                                                    <thead>
                                                        <tr className="border-b border-white/5 text-white/30 uppercase tracking-widest font-semibold">
                                                            <th className="py-2.5">Parámetro</th>
                                                            <th className="py-2.5">Tipo</th>
                                                            <th className="py-2.5">Requerido</th>
                                                            <th className="py-2.5">Descripción</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-white/5 font-mono">
                                                        {activeData.params.map((p, idx) => (
                                                            <tr key={idx} className="hover:bg-white/[0.01]">
                                                                <td className="py-3 text-white font-bold">{p.name}</td>
                                                                <td className="py-3 text-[var(--blue)]">{p.type}</td>
                                                                <td className="py-3">
                                                                    <span className={p.required ? "text-red-400 font-bold" : "text-white/30"}>
                                                                        {p.required ? "Sí" : "No"}
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 text-white/60 font-sans">{p.description}</td>
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-zinc-900/20 border border-white/5 p-6 space-y-4">
                                            <h3 className="text-white font-bold text-lg">Consumo Directo</h3>
                                            <p className="text-white/40 text-[13px] leading-relaxed">
                                                La API no requiere tokens ni llaves de autenticación (CORS habilitado públicamente). Puedes realizar peticiones de forma ilimitada desde cualquier cliente REST o aplicación.
                                            </p>
                                        </div>
                                        <div className="bg-zinc-900/20 border border-white/5 p-6 space-y-4">
                                            <h3 className="text-white font-bold text-lg">Formatos de Respuesta</h3>
                                            <p className="text-white/40 text-[13px] leading-relaxed">
                                                Todas las respuestas son devueltas en formato estándar **JSON** con codificación de caracteres en UTF-8 y respuestas HTTP rápidas optimizadas mediante caché interna.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Pestaña de Consumo y Respuesta JSON (solo para Endpoints) */}
                                {selectedTab !== "overview" && (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        
                                        {/* Bloque de código */}
                                        <div className="bg-zinc-950 border border-white/5 rounded-none flex flex-col overflow-hidden">
                                            {/* Selector de lenguajes */}
                                            <div className="flex justify-between items-center border-b border-white/5 bg-zinc-900/50 px-4 py-2">
                                                <div className="flex gap-2">
                                                    {["javascript", "python", "curl"].map((lang) => (
                                                        <button
                                                            key={lang}
                                                            onClick={() => setCodeLanguage(lang)}
                                                            className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                                                                codeLanguage === lang 
                                                                    ? "bg-white/10 text-white font-bold" 
                                                                    : "text-white/30 hover:text-white/60"
                                                            }`}
                                                        >
                                                            {lang === "javascript" ? "JS" : lang}
                                                        </button>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(activeData.code[codeLanguage], "code")}
                                                    className="p-2 text-white/40 hover:text-white transition-colors"
                                                    title="Copiar código"
                                                >
                                                    {copiedText === "code" ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                                </button>
                                            </div>
                                            {/* Código */}
                                            <pre className="flex-1 p-6 text-xs text-green-400/90 font-mono overflow-auto max-h-[350px] whitespace-pre leading-relaxed custom-scrollbar">
                                                <code>{activeData.code[codeLanguage]}</code>
                                            </pre>
                                        </div>

                                        {/* Bloque de respuesta JSON */}
                                        <div className="bg-zinc-950 border border-white/5 rounded-none flex flex-col overflow-hidden">
                                            <div className="flex justify-between items-center border-b border-white/5 bg-zinc-900/50 px-4 py-2">
                                                <span className="text-xs text-white/30 font-semibold uppercase tracking-wider">Ejemplo de Respuesta (200 OK)</span>
                                                <button
                                                    onClick={() => copyToClipboard(JSON.stringify(activeData.response, null, 2), "response")}
                                                    className="p-2 text-white/40 hover:text-white transition-colors"
                                                    title="Copiar respuesta JSON"
                                                >
                                                    {copiedText === "response" ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                                </button>
                                            </div>
                                            <pre className="flex-1 p-6 text-xs text-white/50 font-mono overflow-auto max-h-[350px] whitespace-pre leading-relaxed custom-scrollbar">
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
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 0px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
            `}</style>
        </Layout>
    );
};
