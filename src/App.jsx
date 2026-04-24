import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Section from './components/Section';
import VideoCard from './components/VideoCard';
import { getHistory, getStats, getVideos, searchVideos } from './services/api';

function App() {
  const [history, setHistory] = useState(null);
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyData, statsData, videosData] = await Promise.all([
          getHistory(),
          getStats(),
          getVideos()
        ]);
        setHistory(historyData);
        setStats(statsData);
        setVideos(videosData.videos.slice(0, 6));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    
    setIsSearching(true);
    try {
      const results = await searchVideos(searchTerm);
      setVideos(results.slice(0, 6));
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-pantera text-white min-h-screen font-sans selection:bg-young-king selection:text-black scroll-smooth">
      <Navbar />
      
      {/* Hero Section */}
      <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center"
        ></motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-pantera/10 via-pantera/40 to-pantera"></div>
        
        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-young-king text-xs font-black uppercase tracking-[0.5em] block mb-4 animate-pulse"
          >
            The Young King Returns
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-6 leading-none"
          >
            MYKE <br className="md:hidden" /> <span className="text-gradient">TOWERS</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-gray-400 max-w-xl mx-auto text-sm md:text-lg uppercase tracking-widest font-medium mb-10"
          >
            Líder del movimiento urbano. La pantera de Puerto Rico.
          </motion.p>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <a href="#music" className="bg-young-king text-black font-black uppercase px-10 py-4 text-sm hover:bg-white transition tracking-widest">
              Escuchar Ahora
            </a>
            <a href="#history" className="border border-white/20 text-white font-black uppercase px-10 py-4 text-sm hover:bg-white hover:text-black transition tracking-widest">
              Biografía
            </a>
          </motion.div>
        </div>
      </div>

      {/* Music Section */}
      <Section id="music" title="Últimos Éxitos" subtitle="Música">
        <div className="mb-12">
          <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Buscar videos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-young-king transition font-bold uppercase tracking-widest"
            />
            <button 
              type="submit"
              className="bg-young-king text-black px-6 font-black uppercase text-xs hover:bg-white transition disabled:opacity-50"
              disabled={isSearching}
            >
              {isSearching ? '...' : 'Ir'}
            </button>
          </form>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-young-king border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <VideoCard video={video} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </Section>

      {/* History Section */}
      <Section id="history" title="La Historia" subtitle="El Origen" className="bg-black/40 overflow-hidden">
        {history && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {history.biografia}
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Nombre Real", value: history.nombreReal },
                  { label: "Origen", value: history.origen },
                  { label: "Nacimiento", value: history.nacimiento },
                  { label: "Géneros", value: history.generos.join(" / ") }
                ].map((item, idx) => (
                  <div key={idx}>
                    <h4 className="text-young-king text-[10px] font-black uppercase tracking-widest mb-2">{item.label}</h4>
                    <p className="font-bold text-sm uppercase">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 border border-young-king/30 -z-10 translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=2070" 
                alt="Myke Towers" 
                className="grayscale hover:grayscale-0 transition duration-700 w-full aspect-[4/5] object-cover border border-white/10"
              />
            </motion.div>
          </div>
        )}
      </Section>

      {/* Stats Section */}
      <Section id="stats" title="El Impacto" subtitle="Estadísticas">
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "TOP 50", sub: "Global en Spotify" },
              { label: "PLATINO", sub: "Múltiples Álbumes" },
              { label: stats.cancionMasExitosa, sub: "Canción más exitosa" },
              { label: stats.apodos[2], sub: "Apodo icónico" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 p-8 border border-white/10 text-center hover:border-young-king/50 transition cursor-default"
              >
                <div className="text-2xl font-black mb-2 text-young-king uppercase truncate">{stat.label}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      <Footer />
    </div>
  );
}

export default App;
