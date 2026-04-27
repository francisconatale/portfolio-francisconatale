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

      // Pre-calculate positions for the dock animation
      const getDeltas = () => {
        const heroRect = heroLogo.getBoundingClientRect();
        const headerRect = headerLogo.getBoundingClientRect();
        
        // We need the current transform to calculate the "real" base position
        const style = window.getComputedStyle(heroLogo);
        const matrix = new DOMMatrix(style.transform);
        
        const curX = matrix.m41;
        const curY = matrix.m42;

        return {
          x: (headerRect.left + headerRect.width / 2) - (heroRect.left - curX + heroRect.width / 2),
          y: (headerRect.top + headerRect.height / 2) - (heroRect.top - curY + heroRect.height / 2),
          scale: headerRect.width / heroRect.width,
        };
      };

      // ✅ Main Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyWrapRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5, // Increased for more "weight" and smoothness
          invalidateOnRefresh: true,
        }
      });

      tl.to(subRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.2, // Occurs in the first 20% of the scrub
        ease: 'power2.inOut'
      })
      .to(heroLogo, {
        x: () => getDeltas().x,
        y: () => getDeltas().y,
        scale: () => getDeltas().scale,
        duration: 1,
        ease: 'power3.inOut', // Organic acceleration and deceleration
      }, 0) // Starts at 0 but the duration is longer
      .to(heroLogo, {
        opacity: 0,
        duration: 0.1,
      }, 0.9) // Fade out at the very end
      .to(headerLogo, {
        opacity: 1,
        duration: 0.1,
      }, 0.9); // Fade in the real header logo at the same time
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
      </div>
    </div>
  );
}