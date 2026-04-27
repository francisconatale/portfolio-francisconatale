'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WORDS = [
  'CREATIVE', 'FULL STACK', 'FAST', 'RELIABLE', 'NEXT.JS', 
  'ADAPTIVE', 'PREMIUM', 'FIREBASE', 'GSAP', 'UI/UX'
];

export default function RotatingText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Clonamos el contenido para que el loop sea infinito e invisible al ojo
    const content = slider.innerHTML;
    slider.innerHTML = content + content + content; // Triplicamos por seguridad de ancho

    const totalWidth = slider.scrollWidth / 3;

    // Animación infinita lineal
    const anim = gsap.to(slider, {
      x: `-=${totalWidth}`,
      duration: 20, // Velocidad del carrusel
      ease: 'none',
      repeat: -1,
      onReverseComplete: () => {
        gsap.set(slider, { x: 0 });
      }
    });

    // Efecto de pausa al pasar el mouse (Interacción Premium)
    const onMouseEnter = () => gsap.to(anim, { timeScale: 0.2, duration: 0.5 });
    const onMouseLeave = () => gsap.to(anim, { timeScale: 1, duration: 0.5 });

    containerRef.current?.addEventListener('mouseenter', onMouseEnter);
    containerRef.current?.addEventListener('mouseleave', onMouseLeave);

    return () => {
      anim.kill();
      containerRef.current?.removeEventListener('mouseenter', onMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#0f0f11] py-[10vh] overflow-hidden border-t border-b border-white/5"
    >
      <div 
        ref={sliderRef} 
        className="flex whitespace-nowrap items-center"
      >
        {WORDS.map((word, i) => (
          <div key={i} className="flex items-center">
            <span className="text-white text-5xl md:text-[8rem] font-black tracking-tighter uppercase px-8">
              {word}
            </span>
            {/* Divisor premium (un punto naranja o estrella) */}
            <div className="w-3 h-3 md:w-6 md:h-6 bg-[#ff6b00] rounded-full mx-4 rotate-45" />
          </div>
        ))}
      </div>
    </section>
  );
}
