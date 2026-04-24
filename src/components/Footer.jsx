import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black py-16 border-t border-young-king/10">
      <div className="container mx-auto px-6 text-center">
        <div className="text-3xl font-black text-gradient mb-8">MYKE TOWERS</div>
        <div className="flex justify-center gap-6 mb-8 text-gray-500 uppercase text-[10px] font-bold tracking-widest">
          <a href="#" className="hover:text-young-king transition">Instagram</a>
          <a href="#" className="hover:text-young-king transition">Spotify</a>
          <a href="#" className="hover:text-young-king transition">YouTube</a>
          <a href="#" className="hover:text-young-king transition">Twitter</a>
        </div>
        <div className="text-gray-700 text-[10px] font-medium uppercase tracking-[0.3em]">
          &copy; 2024 YOUNG KINGZ WORLDWIDE. DESIGNED BY ANTIGRAVITY.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
