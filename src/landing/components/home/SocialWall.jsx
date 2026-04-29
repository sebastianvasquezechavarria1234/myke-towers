import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

const SocialCard = ({ post, idx }) => {
    return (
        <motion.a
            href="https://instagram.com/myketowers"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`${post.size} relative group overflow-hidden bg-white/5 rounded-sm cursor-pointer block h-full w-full`}
        >
            {/* MAIN CONTENT */}
            <div className="w-full h-full">
                {post.type === "video" ? (
                    <video 
                        src={post.url} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    <img 
                        src={post.url} 
                        alt="Myke Towers Social" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                )}
            </div>

            {/* OVERLAY ICON (Minimalist) */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Instagram size={24} className="text-white" />
                </div>
            </div>

            {/* TOP RIGHT ARROW */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                <ArrowUpRight size={18} className="text-white" />
            </div>
        </motion.a>
    );
};

export const SocialWall = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/social")
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error("Error loading social posts:", err));
    }, []);

    if (posts.length === 0) return null;

    return (
        <section className="w-full h-screen relative mt-20">
            {/* TÍTULO SUTIL */}
            <div className="absolute top-10 left-0 w-full z-10 flex justify-center pointer-events-none">
                <h2 className="text-white/80 text-xl md:text-3xl font-secundary tracking-widest drop-shadow-2xl">
                    Social Wall
                </h2>
            </div>

            {/* GRID 4x4 EXACTO - MITAD DEL VIEWPORT */}
            <div className="grid grid-cols-4 grid-rows-4 w-full h-full gap-0.5">
                {posts.slice(0, 16).map((post, idx) => (
                    <SocialCard key={post.id} post={post} idx={idx} />
                ))}
            </div>
            
            {/* Gradiente sutil abajo para que el footer se mezcle bien */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        </section>
    );
};
