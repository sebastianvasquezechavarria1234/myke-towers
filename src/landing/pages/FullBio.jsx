import React, { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { motion } from "framer-motion";
import { DiscographySection } from "../components/home/DiscographySection";
import { Hero } from "../components/home/Hero";

const ERAS = [
    {
        years: "2016 — 2018",
        index: "01",
        title: "Ascenso del Prodigio Urbano",
        subtitle: "Los inicios triunfales",
        content: "En 2016 publicó su mixtape debut El final del principio, que debutó en el primer lugar de la lista iTunes y alcanzó el puesto número doce en el Latin Rhythm Albums. En 2017 ganó el Premio Por Mejor Álbum Mixtape del año en los Premios Billboard de la Música Latina. El disco estuvo producido por G Starr Entertainment con sencillos como «Dinero en mano», «Déjate ver», «No sabe nada» o «Alternativas».",
        stat: "#1 iTunes"
    },
    {
        years: "2019 — 2020",
        index: "02",
        title: "La Consagración Internacional",
        subtitle: "Explosión musical global",
        content: "En 2019 estrenó «Si se da» junto a Farruko, colaboró con Becky G en «Dollar» y lanzó «Perriandote» con Luigi 21 Plus y Ñengo Flow. El 24 de enero de 2020 publicó Easy Money Baby, su álbum debut en honor a su hijo Shawn Torres. El álbum llegó al #1 en el Top Latin Albums durante 83 semanas consecutivas y fue nominado al Grammy Latino. «Mi niña» con Wisin alcanzó el #1 en Latin Airplay de Billboard.",
        stat: "83 semanas #1"
    },
    {
        years: "2021 — 2022",
        index: "03",
        title: "Renacimiento y Tributo",
        subtitle: "El legado de Lyke Mike",
        content: "El 23 de abril de 2021 publicó su segundo álbum Lyke Mike. El título hace referencia a su nombre artístico anterior, mientras que el número de pistas (23) homenajea el número de camiseta del exbaloncestista Michael Jordan. Cuenta con las colaboraciones de Jon Z, Ñengo Flow y Sahir.",
        stat: "23 tracks"
    },
    {
        years: "2023",
        index: "04",
        title: "Diversidad y Dominio Global",
        subtitle: "La era de la innovación",
        content: "El 23 de marzo lanzó La vida es una, con 23 canciones y colaboraciones de Arcángel, J Balvin, Ozuna y Daddy Yankee. En julio, «Lala» se viralizó en TikTok y se convirtió en la primera canción de Towers en liderar el Billboard Global 200 Excl. US. Ese mismo mes firmó con S10 Entertainment de Brandon Silverstein.",
        stat: "#1 Billboard Global"
    },
    {
        years: "2024 — 2025",
        index: "05",
        title: "Dominio Total",
        subtitle: "La Pantera y nuevas alturas",
        content: "El 22 de agosto de 2024 publicó La Pantera Negra con Bad Bunny, Peso Pluma, De La Ghetto, Cosculluela y más. Mezcla trap, reggaetón y dancehall. A finales de 2024 colaboró con Duki en «Nueva Era», el sencillo más exitoso de Ameri. En 2025 lanzó Island Boyz, su séptimo álbum de estudio.",
        stat: "Island Boyz · 2025"
    }
];

export const FullBio = () => {
    const [activeEra, setActiveEra] = useState(0);
    const [albums, setAlbums] = useState([]);
    const [socialImages, setSocialImages] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch("http://localhost:3000/albums")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => parseInt(b.year) - parseInt(a.year));
                setAlbums(sorted);
            })
            .catch(err => console.error("Error fetching albums:", err));

        fetch("http://localhost:3000/social")
            .then(res => res.json())
            .then(data => {
                // Seleccionamos específicamente los índices 3, 6 y 5 para Biografía
                const selected = [data[3], data[6], data[5]].map(p => p?.url);
                setSocialImages(selected);
            })
            .catch(err => console.error("Error fetching social:", err));
    }, []);

    return (
        <Layout>
            <Hero 
                tagline="#El rap es mi esencia. La calle mi escuela"
                title={
                    <>
                        Desde 
                        <span className="px-[10px] font-secundary text-[var(--blue)]">Puerto Rico</span> 
                        al mundo, una historia de 
                        <span className="px-[10px] font-secundary text-[var(--blue)]">superación</span> 
                        y éxito.
                    </>
                }
                images={socialImages.length >= 3 ? socialImages : []}
                showVideo={false}
                hasBorder={false}
            />

            <section className="pb-[120px] max-w-[1100px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* INTRO TEXT */}
                    <div className="max-w-[680px] mx-auto mb-28 text-center space-y-5">
                        <p className="text-white/50 text-xl leading-[1.9] font-light">
                            Nacido en Río Piedras, Puerto Rico, Myke Towers transformó el rap de los 90 en un movimiento global. Desde SoundCloud hasta los escenarios más grandes, su evolución como el <span className="text-white/70 font-medium">Young King</span> ha redefinido el género urbano.
                        </p>
                    </div>

                    {/* SEPARATOR */}
                    <div className="flex items-center gap-6 mb-32">
                        <div className="flex-1 h-px bg-white/[0.06]" />
                        <span className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">Cronología de Éxitos</span>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                    </div>

                    {/* EDITORIAL TIMELINE EXPERIENCE */}
                    <div className="relative pl-10 md:pl-20 border-l border-white/[0.05]">
                        {/* PROGRESS LINE */}
                        <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute left-[-1px] top-0 w-[1px] bg-[var(--green)] shadow-[0_0_15px_var(--green)] origin-top"
                        />

                        <div className="space-y-40">
                            {ERAS.map((era, idx) => (
                                <motion.div 
                                    key={era.index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                                    className="relative grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16"
                                >
                                    {/* FLOATING YEAR INDICATOR */}
                                    <div className="absolute left-[-40px] md:left-[-100px] top-0 flex flex-col items-center">
                                        <div className="w-3 h-3 bg-white rounded-full mb-4 border-4 border-[#212429] z-10" />
                                        <span className="text-white/20 text-xs font-black rotate-90 origin-left mt-8 tracking-[0.3em] whitespace-nowrap">
                                            {era.years}
                                        </span>
                                    </div>

                                    {/* CONTENT BLOCK */}
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <span className="text-[var(--green)] font-secundary text-4xl lowercase">{era.subtitle}</span>
                                            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight max-w-[600px]">
                                                {era.title}
                                            </h3>
                                        </div>

                                        <p className="text-white/50 text-lg leading-relaxed font-light max-w-[650px]">
                                            {era.content}
                                        </p>

                                        <div className="flex items-center gap-10 pt-4">
                                            <div className="flex flex-col">
                                                <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest mb-1">Logro Destacado</span>
                                                <span className="text-white/80 font-bold text-sm uppercase">{era.stat}</span>
                                            </div>
                                            <div className="h-10 w-px bg-white/10" />
                                            <div className="flex flex-col">
                                                <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest mb-1">Era</span>
                                                <span className="text-white/80 font-bold text-sm uppercase">#{era.index}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* VISUAL GALLERY FOR THE ERA */}
                                    <div className="relative hidden lg:block">
                                        <div className="grid grid-cols-2 gap-4">
                                            {albums
                                                .filter(a => {
                                                    const startYear = parseInt(era.years.split(" — ")[0]);
                                                    const endYear = era.years.includes(" — ") ? parseInt(era.years.split(" — ")[1]) : startYear;
                                                    const albumYear = parseInt(a.year);
                                                    return albumYear >= startYear && albumYear <= endYear;
                                                })
                                                .slice(0, 4)
                                                .map((album, aIdx) => (
                                                    <motion.div
                                                        key={album.id}
                                                        whileHover={{ scale: 1.05, y: -5 }}
                                                        className={`aspect-square bg-white/5 overflow-hidden ${aIdx % 2 !== 0 ? 'mt-8' : ''}`}
                                                    >
                                                        <img 
                                                            src={album.image} 
                                                            alt="" 
                                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                                        />
                                                    </motion.div>
                                                ))
                                            }
                                        </div>
                                        {/* DECORATIVE ELEMENT */}
                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--green)]/5 rounded-full blur-3xl" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* DISCOGRAFÍA DINÁMICA */}
                    <DiscographySection padding="mt-40 mb-0" />



                    {/* QUOTE FINAL */}
                    <div className="mt-28 text-center">
                        <p className="font-secundary text-5xl text-white/[0.07]">
                            "Young Kingz Baby"
                        </p>
                    </div>
                </motion.div>
            </section>
        </Layout>
    );
};
