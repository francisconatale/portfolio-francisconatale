'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GiantTextScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = rowsRef.current?.querySelectorAll('.paint-text');
      if (!rows || rows.length === 0) return;

      // Creamos una Timeline única para toda la secuencia
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 30%',    // Empieza cuando el contenedor llega a la parte superior/media
          end: 'bottom 70%',   // Termina cuando el contenedor va saliendo
          scrub: 0.5,          // Un poco de suavizado (0.5s) para que se sienta más orgánico
        },
      });

      // Añadimos cada fila a la timeline para que se ejecuten una tras otra
      rows.forEach((row) => {
        tl.to(row, {
          backgroundPositionY: '0%', 
          ease: 'none',
          duration: 1, // Duración relativa dentro de la timeline
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const paintTextStyle = {
    backgroundImage: 'linear-gradient(180deg, #ffffff 50%, rgba(255, 255, 255, 0.1) 50%)',
    backgroundSize: '100% 200%',
    backgroundPosition: '0% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#0a0a0a] py-[15vh] flex flex-col items-center justify-center overflow-hidden"
    >
      <div 
        ref={rowsRef}
        className="flex flex-col items-center text-center w-full px-4"
      >
        <div 
          className="paint-text font-black leading-[0.9] tracking-[-0.07em] uppercase"
          style={{ ...paintTextStyle, fontSize: 'clamp(60px, 12vw, 180px)' }}
        >
          WE ARE
        </div>
        <div 
          className="paint-text font-black leading-[0.9] tracking-[-0.07em] uppercase"
          style={{ ...paintTextStyle, fontSize: 'clamp(60px, 12vw, 180px)' }}
        >
          WHAT
        </div>
        <div 
          className="paint-text font-black leading-[0.9] tracking-[-0.07em] uppercase"
          style={{ ...paintTextStyle, fontSize: 'clamp(60px, 12vw, 180px)' }}
        >
          WE
        </div>
        <div 
          className="paint-text font-black leading-[0.9] tracking-[-0.07em] uppercase"
          style={{ ...paintTextStyle, fontSize: 'clamp(60px, 12vw, 180px)' }}
        >
          DO
        </div>
      </div>
    </section>
  );
}
