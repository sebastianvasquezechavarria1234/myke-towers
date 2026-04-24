import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Section from './components/Section';
import VideoCard from './components/VideoCard';
import { getHistory, getStats, getVideos } from './services/api';

function App() {
  const [history, setHistory] = useState(null);
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setVideos(videosData.videos.slice(0, 6)); // First 6 videos
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-pantera text-white min-h-screen font-sans selection:bg-young-king selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-pantera/10 via-pantera/40 to-pantera"></div>
        
        <div className="relative z-10 text-center px-6">
          <span className="text-young-king text-xs font-black uppercase tracking-[0.5em] block mb-4 animate-pulse">
            The Young King Returns
          </span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 leading-none">
            MYKE <br className="md:hidden" /> <span className="text-gradient">TOWERS</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-lg uppercase tracking-widest font-medium mb-10">
            Líder del movimiento urbano. La pantera de Puerto Rico.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#music" className="bg-young-king text-black font-black uppercase px-10 py-4 text-sm hover:bg-white transition tracking-widest">
              Escuchar Ahora
            </a>
            <a href="#history" className="border border-white/20 text-white font-black uppercase px-10 py-4 text-sm hover:bg-white hover:text-black transition tracking-widest">
              Biografía
            </a>
          </div>
        </div>
      </div>

      {/* Music Section */}
      <Section id="music" title="Últimos Éxitos" subtitle="Música">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-young-king border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </Section>

      {/* History Section */}
      <Section id="history" title="La Historia" subtitle="El Origen" className="bg-black/40">
        {history && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {history.biografia}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-young-king text-[10px] font-black uppercase tracking-widest mb-2">Nombre Real</h4>
                  <p className="font-bold">{history.nombreReal}</p>
                </div>
                <div>
                  <h4 className="text-young-king text-[10px] font-black uppercase tracking-widest mb-2">Origen</h4>
                  <p className="font-bold">{history.origen}</p>
                </div>
                <div>
                  <h4 className="text-young-king text-[10px] font-black uppercase tracking-widest mb-2">Nacimiento</h4>
                  <p className="font-bold">{history.nacimiento}</p>
                </div>
                <div>
                  <h4 className="text-young-king text-[10px] font-black uppercase tracking-widest mb-2">Géneros</h4>
                  <p className="font-bold text-xs uppercase">{history.generos.join(" / ")}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 border border-young-king/30 -z-10 translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=2070" 
                alt="Myke Towers" 
                className="grayscale hover:grayscale-0 transition duration-700 w-full aspect-[4/5] object-cover border border-white/10"
              />
            </div>
          </div>
        )}
      </Section>

      {/* Stats Section */}
      <Section id="stats" title="El Impacto" subtitle="Estadísticas">
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 p-8 border border-white/10 text-center hover:border-young-king/50 transition">
              <div className="text-4xl font-black mb-2 text-young-king">TOP 50</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Global en Spotify</div>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 text-center hover:border-young-king/50 transition">
              <div className="text-4xl font-black mb-2 text-young-king">PLATINO</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Múltiples Álbumes</div>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 text-center hover:border-young-king/50 transition">
              <div className="text-xl font-black mb-2 uppercase truncate">{stats.cancionMasExitosa}</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Canción más exitosa</div>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 text-center hover:border-young-king/50 transition">
              <div className="text-xl font-black mb-2 uppercase">{stats.apodos[2]}</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Apodo icónico</div>
            </div>
          </div>
        )}
      </Section>

      <Footer />
    </div>
  );
}

export default App;
