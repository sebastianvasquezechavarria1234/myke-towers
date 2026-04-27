import React, { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { motion } from "framer-motion";

export const FullBio = () => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch("http://localhost:3000/historia")
            .then(res => res.json())
            .then(data => setInfo(data));
    }, []);

    if (!info) return null;

    return (
        <Layout>
            <section className="pt-[200px] pb-[100px] max-w-[900px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-[var(--blue)] font-bold tracking-[0.5em] uppercase text-xs mb-4 text-center">
                        Official Biography
                    </p>
                    <h1 className="text-7xl md:text-9xl text-center mb-16 uppercase font-black leading-none tracking-tighter">
                        Myke <br />
                        <span className="font-secundary normal-case text-[var(--green)]">Towers</span>
                    </h1>

                    <div className="space-y-12 text-white/80 text-xl leading-[1.8] font-light">
                        <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[var(--blue)]">
                            {info.biografia}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-y border-white/10">
                            <div>
                                <h4 className="text-[var(--green)] uppercase tracking-widest font-bold text-sm mb-4">Datos Personales</h4>
                                <ul className="space-y-4 text-base">
                                    <li><span className="opacity-40">Nombre Real:</span> <br/> {info.nombreReal}</li>
                                    <li><span className="opacity-40">Nacimiento:</span> <br/> {info.nacimiento}</li>
                                    <li><span className="opacity-40">Origen:</span> <br/> {info.origen}</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[var(--blue)] uppercase tracking-widest font-bold text-sm mb-4">Legado y Logros</h4>
                                <ul className="space-y-4 text-base">
                                    {info.logros.map((logro, idx) => (
                                        <li key={idx} className="flex gap-3">
                                            <span className="text-[var(--blue)]">/</span> {logro}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <p>
                            A lo largo de su carrera, ha demostrado una versatilidad única, dominando tanto el trap más crudo como el reggaetón más melódico. Su impacto en la cultura urbana es innegable, convirtiéndose en un referente para las nuevas generaciones de artistas que buscan autenticidad y éxito global sin perder sus raíces.
                        </p>
                        
                        <p className="text-3xl font-secundary text-white/40 text-center py-20">
                            "Young Kingz Baby"
                        </p>
                    </div>
                </motion.div>
            </section>
        </Layout>
    );
};
