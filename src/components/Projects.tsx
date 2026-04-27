'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LOGOS = [
  { name: 'Next.js', url: '/next.svg' },
  { name: 'Vercel', url: '/vercel.svg' },
  { name: 'Window', url: '/window.svg' },
  { name: 'Globe', url: '/globe.svg' },
  { name: 'File', url: '/file.svg' },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3. Estado inicial (GSAP set)
      gsap.set('.project-logo', { 
        opacity: 0, 
        y: 30,
        filter: 'blur(10px)'
      });
      gsap.set('.project-cta', { 
        opacity: 0, 
        y: 20 
      });

      // 4 & 5. Timeline con ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      // 5.1 Animación de logos (Stagger)
      tl.to('.project-logo', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12
      })
      // 5.2 CTA (con ligero overlap/delay)
      .to('.project-cta', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="brands bg-white py-24 md:py-32 overflow-hidden"
    >
      <div ref={containerRef} className="container mx-auto px-6 max-w-7xl flex flex-col items-center">
        
        {/* Fila de Logos */}
        <div 
          ref={logosRef}
          className="logos flex flex-wrap justify-center items-center gap-12 md:gap-20 mb-16"
        >
          {LOGOS.map((logo, index) => (
            <div 
              key={index} 
              className="project-logo group flex items-center justify-center"
            >
              {/* 
                6. Microinteracciones (Hover) 
                Implementadas con CSS para mayor limpieza según recomendación.
              */}
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-8 md:h-10 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-out"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="project-cta">
          <Link 
            href="/projects" 
            className="inline-block px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Ver todos los proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
