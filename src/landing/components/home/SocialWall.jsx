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
            className={`${post.size} relative group overflow-hidden bg-white/5 rounded-sm cursor-pointer block aspect-square md:aspect-auto`}
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
        <section className="mt-[200px] mb-[150px] max-w-[1200px] mx-auto px-[10px]">
            {/* TÍTULO AL ESTILO DE LA SECCIÓN DE MÚSICA */}
            <h1 className="mb-[50px] text-center">
                Instagram
                <span className="pl-[20px] font-secundary">
                    Experience
                </span>
            </h1>

            {/* GRID CON EL MISMO MAX-WIDTH Y COMPORTAMIENTO */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[15px] auto-rows-[250px]">
                {posts.slice(0, 12).map((post, idx) => (
                    <SocialCard key={post.id} post={post} idx={idx} />
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <a 
                    href="https://instagram.com/myketowers" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-10 py-4 border border-white/10 hover:border-[var(--green)] hover:text-[var(--green)] transition-all text-[11px] uppercase tracking-[0.3em] font-black bg-white/5 rounded-full"
                >
                    Seguir a @myketowers
                </a>
            </div>
        </section>
    );
};
