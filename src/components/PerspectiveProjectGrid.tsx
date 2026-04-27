'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  { title: 'Digital Elegance', category: 'Web Design', color: '#1a1a1a' },
  { title: 'Future Pulse', category: 'Brand Identity', color: '#2a1a2a' },
  { title: 'Core Nexus', category: 'Development', color: '#1a2a2a' },
  { title: 'Ethereal Flow', category: 'Motion', color: '#2a2a1a' },
];

export default function PerspectiveProjectGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.project-card');
    
    cards.forEach((card) => {
      gsap.fromTo(card,
        { 
          rotationX: -20, 
          y: 100, 
          opacity: 0,
          transformPerspective: 1000 
        },
        {
          rotationX: 0,
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: 1,
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-10 bg-black overflow-hidden">
      <h2 className="text-6xl font-bold mb-20 text-white tracking-tighter">SELECTED WORKS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {PROJECTS.map((project, i) => (
          <div 
            key={i} 
            className="project-card group relative aspect-video rounded-2xl overflow-hidden bg-[#111] border border-white/5 cursor-pointer"
          >
            <div 
              className="absolute inset-0 opacity-40 group-hover:scale-110 transition-transform duration-700"
              style={{ backgroundColor: project.color }}
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="text-xs uppercase tracking-widest text-white/50 mb-2">{project.category}</span>
              <h3 className="text-3xl font-bold text-white">{project.title}</h3>
            </div>
            {/* Efecto de brillo al pasar el mouse */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
