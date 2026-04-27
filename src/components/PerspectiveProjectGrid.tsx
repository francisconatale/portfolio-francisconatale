'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  { 
    title: 'E-commerce Scalable', 
    category: 'Solución de Negocio', 
    description: 'Optimización de procesos de venta y escalabilidad de infraestructura.',
    color: '#0a0a0a' 
  },
  { 
    title: 'Fintech Dashboard', 
    category: 'Seguridad y Usabilidad', 
    description: 'Visualización de datos críticos con altos estándares de seguridad.',
    color: '#0f0f11' 
  },
  { 
    title: 'SaaS Platform', 
    category: 'Adaptabilidad Técnica', 
    description: 'Migración a arquitectura moderna para mejorar el performance en un 40%.',
    color: '#1a1a1a' 
  },
  { 
    title: 'Mobile Experience', 
    category: 'Diseño Estratégico', 
    description: 'Interfaz enfocada en la retención de usuarios y facilidad de uso.',
    color: '#050505' 
  },
];

export default function PerspectiveProjectGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.project-card');
    
    cards.forEach((card) => {
      gsap.fromTo(card,
        { 
          rotationX: -10, 
          y: 50, 
          opacity: 0,
          transformPerspective: 1000 
        },
        {
          rotationX: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=50',
            end: 'top center',
            scrub: 1,
          }
        }
      );
    });
  }, []);

  return (
<section id="projects" ref={containerRef} className="py-48 px-6 md:px-24 bg-[var(--background)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="mb-32 flex flex-col md:flex-row items-baseline gap-8 border-b border-[var(--white)]/10 pb-12">
          <h2 className="text-6xl md:text-[9rem] font-bold text-[var(--white)] tracking-tighter uppercase leading-none" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Works <span className="text-[#ff6b00]">.</span>
          </h2>
          <p className="text-[var(--white)]/40 text-lg md:text-2xl italic max-w-xl font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
            "Solving complex business problems through <br className="hidden md:block"/> high-performance digital engineering."
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
          {PROJECTS.map((project, i) => (
            <div 
              key={i} 
              className={`project-card group relative aspect-[14/16] overflow-hidden bg-[var(--card-bg)] border border-[var(--white)]/5 cursor-pointer transition-colors duration-700 
                ${i % 2 !== 0 ? 'md:mt-48' : ''}`}
            >
              <div 
                className="absolute inset-0 opacity-10 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                style={{ backgroundColor: project.color }}
              />
              <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-[#ff6b00] font-black">{project.category}</span>
                  <span className="text-[var(--white)]/10 font-mono text-4xl">0{i + 1}</span>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-4xl md:text-5xl font-black text-[var(--white)] uppercase tracking-tighter leading-none" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {project.title}
                  </h3>
                  <div className="h-px w-12 bg-[#ff6b00] group-hover:w-full transition-all duration-700 origin-left" />
                  <p className="text-[var(--white)]/60 text-xl font-serif italic leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    "{project.description}"
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
