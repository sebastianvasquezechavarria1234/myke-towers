import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Section from './components/Section';

function App() {
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
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Content Placeholder for Step 4 */}
      <Section id="music" title="Últimos Éxitos" subtitle="Música">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 uppercase text-[10px] font-bold tracking-[0.2em]">
              Cargando Videos...
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
}

export default App;
