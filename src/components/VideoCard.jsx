import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <div className="group bg-white/5 border border-white/10 hover:border-young-king/50 transition duration-500 overflow-hidden rounded-sm">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.imagen} 
          alt={video.titulo} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <a 
            href={video.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-young-king text-black p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition duration-500"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
          </a>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-[10px] font-bold px-2 py-1">
          {video.duracion}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold uppercase truncate mb-1 group-hover:text-young-king transition">{video.titulo}</h3>
        <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <span>{video.vistas} vistas</span>
          <span>{video.publicado}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
