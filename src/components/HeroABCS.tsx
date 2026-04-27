'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroABCS() {
  const stickyWrapRef = useRef<HTMLDivElement>(null); // el contenedor alto
  const stickyInnerRef = useRef<HTMLDivElement>(null); // lo que se queda fijo (sticky)
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrada inicial
      gsap.timeline()
        .fromTo(titleRef.current,
          { opacity: 0, y: 60, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: 'expo.out' }
        )
        .fromTo(subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          '-=0.8'
        );

      const headerLogo = document.querySelector<HTMLElement>('#nav-logo');
      const heroLogo = titleRef.current;
      if (!headerLogo || !heroLogo) return;

      gsap.set(headerLogo, { opacity: 0 });
      gsap.set(heroLogo, { transformOrigin: 'center center' });

      const getDeltas = () => {
        const heroRect = heroLogo.getBoundingClientRect();
        const headerRect = headerLogo.getBoundingClientRect();
        return {
          x: (headerRect.left + headerRect.width / 2) - (heroRect.left + heroRect.width / 2),
          y: (headerRect.top + headerRect.height / 2) - (heroRect.top + heroRect.height / 2),
          scale: headerRect.width / heroRect.width,
        };
      };

      // ✅ ScrollTrigger sobre el wrapper alto, SIN pin:true
      // El sticky lo maneja CSS — GSAP solo anima
      ScrollTrigger.create({
        trigger: stickyWrapRef.current,
        start: 'top top',
        end: 'bottom top', // cuando el wrapper sale por arriba
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Fade out sub y hint en el primer 20%
          gsap.set([subRef.current, scrollHintRef.current], {
            opacity: 1 - Math.min(p / 0.2, 1),
            y: p * -30,
          });

          // Logo vuela al header en el 100% del scroll
          const d = getDeltas();
          gsap.set(heroLogo, {
            x: d.x * p,
            y: d.y * p,
            scale: 1 + (d.scale - 1) * p,
          });

          // Handoff al nav logo
          if (p >= 0.98) {
            gsap.set(heroLogo, { opacity: 0 });
            gsap.set(headerLogo, { opacity: 1 });
          } else {
            gsap.set(heroLogo, { opacity: 1 });
            gsap.set(headerLogo, { opacity: 0 });
          }
        },
      });
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    // ✅ wrapper de 200vh — da el espacio de scroll
    <div ref={stickyWrapRef} style={{ height: '200vh' }} className="bg-[#0f0f11]">
      {/* ✅ sticky en CSS puro — sin pin de GSAP */}
      <div
        ref={stickyInnerRef}
        style={{ position: 'sticky', top: 0, height: '100vh' }}
        className="flex items-center justify-center"
      >
        <div className="flex flex-col items-center text-center px-4 z-20">
          <h1
            ref={titleRef}
            className="text-white font-black tracking-[-0.04em] leading-[0.8] uppercase"
            style={{
              fontSize: 'clamp(50px, 15vw, 200px)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            FRANCISCO <br /> NATALE
          </h1>
          <p
            ref={subRef}
            className="text-[#ff6b00] text-[11px] md:text-[13px] font-bold tracking-[0.4em] mt-8 uppercase"
          >
            CREATIVE DEVELOPER
          </p>
        </div>
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-60 text-[#ff6b00] text-[10px] tracking-[0.2em] uppercase font-bold animate-pulse"
        >
          Scroll to explore
        </div>
      </div>
    </div>
  );
}