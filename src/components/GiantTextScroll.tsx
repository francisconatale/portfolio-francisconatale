'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WORDS = ['WE ARE', 'WHAT', 'WE', 'DO'];

export default function GiantTextScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray<HTMLElement>('.paint-text');
    if (!rows.length) return;

    // Timeline sincronizada con el scroll del wrapper
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, 
        invalidateOnRefresh: true,
      },
    });

    // Revelado premium: entrada con escala y desenfoque + pintado
    tl.fromTo(rows, 
      { 
        backgroundPositionY: '100%',
        opacity: 0,
        y: 80,
        scale: 0.8,
        filter: 'blur(15px)',
      },
      {
        backgroundPositionY: '0%',
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        stagger: 0.8,
        ease: 'power2.inOut',
        duration: 2,
      }
    );

    // Salida suave para conectar con Clients
    tl.to(rows, {
      opacity: 0.05,
      scale: 0.9,
      y: -40,
      stagger: 0.2,
      ease: 'power1.in',
      duration: 1,
    }, '+=0.5');

  }, { scope: containerRef });

  const paintTextStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(180deg, #ff6b00 50%, rgba(255,255,255,0.06) 50%)',
    backgroundSize: '100% 202%', 
    backgroundPositionY: '100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    padding: '0.25em 0.15em', // Padding extra para evitar cortes en letras como W y E
    margin: '-0.25em 0',
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0f0f11] overflow-visible"
      style={{ height: '300vh' }}
    >
      <div 
        ref={stickyInnerRef}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20"
      >
        <div className="flex flex-col items-center text-center w-full max-w-7xl px-4">
          {WORDS.map((word) => (
            <div
              key={word}
              className="paint-text font-black leading-[0.9] tracking-[-0.08em] uppercase select-none"
              style={{ ...paintTextStyle, fontSize: 'clamp(50px, 13vw, 170px)' }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}