'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroABCS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación de Entrada
      gsap.fromTo(textWrapRef.current, 
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
      );

      // 2. Animación de Scroll (Sin Pin, 100% natural)
      const stTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",      // Empieza al scrollear hacia abajo
          end: "bottom top",     // Termina cuando la sección sale por arriba
          scrub: true,           // Sincronizado exacto con el scroll
        }
      });

      // El texto se achica de forma constante durante todo el scroll
      stTl.to(textWrapRef.current, {
        scale: 0.4,              
        ease: "none",            // Lineal, para que responda a cada milímetro de scroll
        duration: 1
      }, 0);

      // El texto se desvanece SOLO al final (último 30% del trayecto), 
      // justo cuando está a punto de salir de la pantalla
      stTl.to(textWrapRef.current, {
        opacity: 0,
        ease: "none",
        duration: 0.3
      }, 0.7);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden"
    >
      <div 
        ref={textWrapRef}
        className="flex flex-col items-center text-center px-4 will-change-transform"
      >
        <h1 
          className="text-[#E03C1F] font-bold tracking-tighter leading-[0.85]"
          style={{ 
            fontSize: 'clamp(40px, 12vw, 180px)', 
            fontFamily: "'JetBrains Mono', monospace"
          }}
        >
          FRANCISCO <br></br> NATALE
        </h1>

        <p 
          className="text-black/50 text-[9px] md:text-xs font-medium tracking-[0.3em] mt-6 uppercase"
        >
          FULL STACK DEVELOPER 
        </p>
      </div>
    </section>
  );
}
