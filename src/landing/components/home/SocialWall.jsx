import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

const SocialCard = ({ post, idx }) => {
    const [hovered, setHovered] = useState(false);
    const displayIndex = String(idx + 1).padStart(2, '0');

    return (
        <motion.a
            href="https://instagram.com/myketowers"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="block group"
        >
            {/* PICTURE CONTAINER - Matching Music Card Height */}
            <div className="relative overflow-hidden h-[200px] md:h-[350px]">
                {post.type === "video" ? (
                    <video 
                        src={post.url} 
                        className="w-full h-full object-cover transition-all duration-700"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    <motion.img 
                        src={post.url} 
                        alt="Myke Towers Social" 
                        className="w-full h-full object-cover"
                        animate={{ scale: hovered ? 1 : 1.05 }}
                        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    />
                )}

                {/* OVERLAY MINIMALISTA (Icono Instagram) */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                background: "rgba(0,0,0,0.2)"
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center shadow-2xl"
                            >
                                <Instagram size={24} className="text-white" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.a>
    );
};

import { CardSkeleton } from "./Skeleton";

// ... (SocialCard component remains same)

export const SocialWall = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/social")
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading social posts:", err);
                setLoading(false);
            });
    }, []);

    return (
        <section className="mt-[100px] md:mt-[200px] mb-[80px] md:mb-[150px] max-w-[1200px] mx-auto px-6">
            <h1 className="mb-[40px] md:mb-[60px] text-center">
                Instagram
                <span className="md:pl-[20px] font-secundary block md:inline">
                    Experience
                </span>
            </h1>

            {/* GRID UNIFICADO CON LA SECCIÓN DE MÚSICA — Compactado sin textos */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[10px] md:gap-[15px]">
                {loading ? (
                    [...Array(6)].map((_, idx) => <CardSkeleton key={idx} />)
                ) : (
                    posts.slice(0, 9).map((post, idx) => (
                        <SocialCard key={post.id} post={post} idx={idx} />
                    ))
                )}
            </div>

            <div className="mt-20 flex justify-center">
                <a 
                    href="https://instagram.com/myketowers" 
                    target="_blank" 
                    rel="noreferrer"
                    className="group relative transition-colors duration-300"
                >
                    <span className="text-white/40 group-hover:text-white text-[13px] font-light transition-colors duration-300">
                        ver más en instagram
                    </span>
                </a>
            </div>
        </section>
    );
};
