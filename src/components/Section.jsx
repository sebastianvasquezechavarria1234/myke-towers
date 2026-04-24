import React from 'react';

const Section = ({ id, title, subtitle, children, className = "" }) => {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="mb-16">
          {subtitle && (
            <span className="text-young-king text-xs font-black uppercase tracking-[0.4em] block mb-2">
              {subtitle}
            </span>
          )}
          <h2 className="text-4xl md:text-5xl font-black uppercase">{title}</h2>
          <div className="h-1 w-20 bg-young-king mt-4"></div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
