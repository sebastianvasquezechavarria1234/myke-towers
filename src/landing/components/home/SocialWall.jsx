import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Send, Heart, MessageCircle } from "lucide-react";

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
        <section className="mt-[200px] mb-[150px] max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                        Instagram <br />
                        <span className="font-secundary text-[var(--green)] normal-case text-7xl md:text-9xl">Feed</span>
                    </h2>
                    <p className="text-white/30 uppercase tracking-[0.5em] text-[10px] font-bold">
                        Vibras del Young King Empire
                    </p>
                </div>
                <div className="flex gap-4">
                    <a 
                        href="https://instagram.com/myketowers" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:border-[var(--green)] transition-all text-[11px] uppercase tracking-widest font-black bg-white/5 hover:text-[var(--green)] group"
                    >
                        <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                        @myketowers
                    </a>
                </div>
            </div>

            {/* BENTO GRID DE INSTAGRAM */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
                {posts.map((post, idx) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className={`${post.size} relative group overflow-hidden rounded-2xl bg-white/5 border border-white/5`}
                    >
                        {/* IMAGEN */}
                        <img 
                            src={post.url} 
                            alt={post.caption || "Myke Towers IG"} 
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-1"
                            loading="lazy"
                        />
                        
                        {/* OVERLAY TIPO INSTAGRAM AL HACER HOVER */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-[var(--green)] p-0.5 overflow-hidden">
                                    <img src={posts[0].url} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <Instagram size={20} className="text-white/50" />
                            </div>

                            <div>
                                <p className="text-white font-medium text-sm leading-snug mb-4 line-clamp-2">
                                    {post.caption || "🐈‍⬛ #LaPanteraNegra #MykeTowers"}
                                </p>
                                <div className="flex gap-4 text-white/80">
                                    <div className="flex items-center gap-1.5">
                                        <Heart size={16} fill="white" className="text-white" />
                                        <span className="text-[12px] font-bold">428k</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MessageCircle size={16} fill="white" className="text-white" />
                                        <span className="text-[12px] font-bold">12k</span>
                                    </div>
                                    <Send size={16} className="ml-auto" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
