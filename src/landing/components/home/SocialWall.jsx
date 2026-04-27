import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
        <section className="mt-[200px] mb-[100px] max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-black uppercase mb-4 tracking-tighter">
                    Fan <span className="font-secundary text-[var(--blue)] normal-case text-6xl">Experience</span>
                </h2>
                <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">
                    Join the Young King Empire on Social Media
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 h-[800px]">
                {posts.map((post, idx) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`${post.size} relative group overflow-hidden rounded-[30px] border border-white/5 bg-white/5`}
                    >
                        <img 
                            src={post.url} 
                            alt={`Social Post ${post.id}`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                            loading="lazy"
                        />
                        
                        {/* OVERLAY ICON */}
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            {post.type === 'ig' ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                            )}
                        </div>

                        {/* HOVER TITLE */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white">@myketowers</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <a 
                    href="https://instagram.com/myketowers" 
                    target="_blank" 
                    className="px-8 py-4 rounded-full border border-white/10 hover:border-white/40 transition-all text-[10px] uppercase tracking-[0.3em] font-black bg-white/5"
                >
                    Follow the Movement
                </a>
            </div>
        </section>
    );
};
