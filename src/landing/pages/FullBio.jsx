import React, { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { motion } from "framer-motion";

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <section className="pt-[160px] pb-[120px] max-w-[1100px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* HERO */}
                    <div className="text-center mb-24 relative">
                        {/* Young King — muy oscuro/sutil */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 1 }}
                            className="font-secundary text-[clamp(50px,11vw,120px)] leading-none text-white/[0.04] select-none absolute inset-x-0 -top-4 pointer-events-none"
                        >
                            Young King
                        </motion.p>

                        <div className="relative z-10 max-w-[800px] mx-auto">
                            <p className="italic mb-[20px] text-[var(--green)]">#El rap es mi esencia. La calle mi escuela</p>
                            <h1>
                                Desde las calles de Puerto Rico hasta la cima del mundo,
                                <span className="pl-[10px] font-secundary text-[var(--blue)] block md:inline">
                                    cada rima cuenta
                                </span>
                                una historia de superación y
                                <span className="pl-[10px] font-secundary text-[var(--blue)] block md:inline">
                                    pasión absoluta
                                </span>
                            </h1>
                        </div>
                    </div>

                    {/* INTRO TEXT */}
                    <div className="max-w-[680px] mx-auto mb-28 text-center space-y-5">
                        <p className="text-white/50 text-xl leading-[1.9] font-light">
                            Nació el 15 de enero de 1994 en Río Piedras, una antigua localidad que ahora pertenece a San Juan, Puerto Rico. Desde temprana edad demostró interés por la música, inspirado por el rap de la década de 1990.
                        </p>
                        <p className="text-white/40 text-lg leading-[1.9] font-light">
                            En 2013 comenzó a publicar sus primeros temas en SoundCloud. Modificó su nombre de Mike a <span className="text-white/70 font-medium">Myke</span> para juntar las letras «Y» y «K»: <span className="text-white/70 font-medium">Young Kingz</span>.
                        </p>
                    </div>

                    {/* SEPARATOR */}
                    <div className="flex items-center gap-6 mb-20">
                        <div className="flex-1 h-px bg-white/[0.06]" />
                        <span className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">Carrera Musical</span>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                    </div>

                    {/* ERAS — EDITORIAL STYLE */}
                    <div className="space-y-0">
                        {ERAS.map((era, idx) => (
                            <motion.div
                                key={era.index}
                                initial={{ opacity: 0.05, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, margin: "-80px" }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                                className="relative grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr_160px] gap-0 border-t border-white/[0.06] py-10 group"
                            >
                                {/* ACTIVE LEFT BORDER — aparece con el scroll */}
                                <motion.div
                                    initial={{ scaleY: 0, opacity: 0 }}
                                    whileInView={{ scaleY: 1, opacity: 1 }}
                                    viewport={{ once: false, margin: "-80px" }}
                                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                                    style={{ originY: 0 }}
                                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/30"
                                />

                                {/* INDEX */}
                                <div className="flex flex-col justify-start pt-1">
                                    <span className="text-white/15 text-4xl font-black leading-none">
                                        {era.index}
                                    </span>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className="space-y-3 pr-6">
                                    <div className="space-y-1">
                                        <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest">
                                            {era.years}
                                        </p>
                                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                                            {era.title}
                                        </h3>
                                        <p className="text-white/30 text-sm font-light italic">
                                            {era.subtitle}
                                        </p>
                                    </div>
                                    <p className="text-white/50 text-base leading-relaxed font-light max-w-[580px]">
                                        {era.content}
                                    </p>
                                </div>

                                {/* STAT — desktop only */}
                                <div className="hidden md:flex flex-col items-end justify-start pt-1">
                                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold text-right">
                                        {era.stat}
                                    </span>
                                </div>
                            </motion.div>
                        ))}

                        {/* LAST BORDER */}
                        <div className="border-t border-white/[0.06]" />
                    </div>

                    {/* DISCOGRAFÍA */}
                    <div className="mt-28 space-y-12">
                        <div className="flex items-center gap-6">
                            <div className="flex-1 h-px bg-white/[0.06]" />
                            <span className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">Discografía</span>
                            <div className="flex-1 h-px bg-white/[0.06]" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                {
                                    label: "Álbumes de Estudio",
                                    color: "text-white/40",
                                    items: [
                                        { year: "2020", title: "Easy Money Baby" },
                                        { year: "2021", title: "Lyke Mike" },
                                        { year: "2023", title: "La vida es una" },
                                        { year: "2023", title: "LVEU: Vive la tuya... no la mía" },
                                        { year: "2024", title: "La Pantera Negra" },
                                        { year: "2024", title: "Lyke Miike" },
                                        { year: "2025", title: "Island Boyz" },
                                    ]
                                },
                                {
                                    label: "Mixtapes",
                                    color: "text-white/40",
                                    items: [
                                        { year: "2016", title: "El final del principio" },
                                    ]
                                },
                                {
                                    label: "EP",
                                    color: "text-white/40",
                                    items: [
                                        { year: "2020", title: "Para mi ex" },
                                        { year: "2023", title: "Sweet & Sour" },
                                        { year: "2023", title: "Icy Hot" },
                                        { year: "2024", title: "Cassette 01 (con Ovy on the Drums)" },
                                    ]
                                }
                            ].map((col) => (
                                <div key={col.label} className="space-y-4">
                                    <p className={`text-[10px] uppercase tracking-[0.3em] font-bold ${col.color} border-b border-white/[0.06] pb-3`}>
                                        {col.label}
                                    </p>
                                    {col.items.map((a) => (
                                        <div key={a.title} className="flex gap-5 items-baseline group">
                                            <span className="text-white/15 text-xs font-bold shrink-0 group-hover:text-white/30 transition-colors">{a.year}</span>
                                            <span className="text-white/40 text-sm font-light group-hover:text-white/70 transition-colors">{a.title}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

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
