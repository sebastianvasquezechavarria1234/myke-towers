import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-pantera/80 backdrop-blur-md border-b border-young-king/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter text-gradient">
          MYKE TOWERS
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.2em]">
          <a href="#home" className="hover:text-young-king transition">Inicio</a>
          <a href="#music" className="hover:text-young-king transition">Música</a>
          <a href="#history" className="hover:text-young-king transition">Biografía</a>
          <a href="#stats" className="hover:text-young-king transition">Estadísticas</a>
        </div>
        <button className="bg-young-king text-black text-[10px] font-black uppercase px-4 py-2 rounded-sm hover:bg-white transition">
          Sigue al Rey
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
