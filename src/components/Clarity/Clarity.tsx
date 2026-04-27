"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Clarity.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Clarity = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const plusRef = useRef<HTMLSpanElement>(null);
  const zoomPlusRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    console.log('Clarity useGSAP running');
    if (!containerRef.current || !textRef.current || !plusRef.current || !zoomPlusRef.current) {
      console.log('Refs missing:', { 
        container: !!containerRef.current, 
        text: !!textRef.current, 
        plus: !!plusRef.current,
        zoomPlus: !!zoomPlusRef.current 
      });
      return;
    }

    const meshCanvas = document.querySelector('.mesh-canvas');
    const container = containerRef.current;
    const zoomPlus = zoomPlusRef.current;
    const text = textRef.current;

    // Get center of inline "+" relative to the pinned section (absolute coords)
    const getPlusCenter = () => {
      const sectionRect = container.getBoundingClientRect();
      const plusRect = plusRef.current!.getBoundingClientRect();
      return {
        x: plusRect.left + plusRect.width / 2 - sectionRect.left,
        y: plusRect.top + plusRect.height / 2 - sectionRect.top,
      };
    };

    // Initial state
    gsap.set(zoomPlus, {
      visibility: 'hidden',
      scale: 0,
      opacity: 1,
      xPercent: -50,
      yPercent: -50,
    });
    gsap.set(text, { clipPath: 'inset(0 100% 0 0)', opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onRefresh: () => {
          const c = getPlusCenter();
          gsap.set(zoomPlus, { x: c.x, y: c.y });
        },
        onEnter: () => {
          const c = getPlusCenter();
          gsap.set(zoomPlus, { x: c.x, y: c.y, visibility: 'visible', scale: 0 });
        },
        onLeaveBack: () => {
          // Full reset when scrolling back above
          gsap.set(zoomPlus, { visibility: 'hidden', scale: 0 });
          gsap.set(container, { opacity: 1, backgroundColor: '#0f0f11' });
          gsap.set(text, { clipPath: 'inset(0 100% 0 0)', opacity: 0, color: '#ffffff' });
          // Reset cross color
          const bars = zoomPlus.querySelectorAll('div');
          bars.forEach(b => (b as HTMLElement).style.backgroundColor = '#ffffff');
          document.body.classList.remove('light-theme');
          if (meshCanvas) gsap.set(meshCanvas, { opacity: 1 });
        },
      },
    });

    // 1. Snap cross to inline "+" position
    tl.set(zoomPlus, {
      x: () => getPlusCenter().x,
      y: () => getPlusCenter().y,
      scale: 0,
      opacity: 1,
      visibility: 'visible',
    });

    // 2. Reveal text (clip-path wipe)
    tl.fromTo(
      text,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

// 3. Expand solid cross
    tl.to(zoomPlus, { scale: 80, duration: 2, ease: 'power2.in' }, '-=0.2');

    // 4. Theme flip - after expansion, no transitions
    tl.add('themeChange');

    tl.to({}, {
      duration: 0,
      onStart: () => {
        document.body.classList.add('light-theme');
        if (meshCanvas) gsap.set(meshCanvas, { opacity: 0 });
      },
      onReverseComplete: () => {
        document.body.classList.remove('light-theme');
      }
    }, 'themeChange');

    tl.set(container, { backgroundColor: '#ffffff' });
    tl.set(text, { color: '#0f0f11' });

    // 5. Fade out text only, keep background white
    tl.to(text, { opacity: 0, duration: 0.3, ease: 'power1.inOut' }, '+=0.1');
    
    // Container stays visible with white background
    tl.set(container, { opacity: 1 });

    // 6. Final hold
    tl.to({}, { duration: 0.1 });

  }, { scope: containerRef });

  return (
    <section id="clarity" ref={containerRef} className="clarity-section">
      <div className="clarity-inner">
        <p className="clarity-big" ref={textRef}>
          <span className="word">CLARITY</span>
          <span className="plus" ref={plusRef}>+</span>
          <span className="word">PERFORMANCE</span>
        </p>
      </div>

      {/*
        Solid CSS cross shape — NOT a text character.
        Two rectangular divs rotated 90° form a perfect "+".
        Scales to any size without font hinting, subpixel, or rasterization artifacts.
      */}
      <div className="zoom-plus" ref={zoomPlusRef}>
        <div className="zoom-plus__h" />
        <div className="zoom-plus__v" />
      </div>
    </section>
  );
};

export default Clarity;
