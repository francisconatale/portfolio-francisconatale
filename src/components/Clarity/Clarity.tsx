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
    if (!containerRef.current || !textRef.current || !plusRef.current || !zoomPlusRef.current) return;

    const getPlusCenter = () => {
      if (!plusRef.current) return { x: 0, y: 0 };
      const rect = plusRef.current.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Reduced from 300% to make it feel faster
        pin: true,
        scrub: 0.5, // Faster scrub response
        invalidateOnRefresh: true,
        onRefresh: () => {
          const center = getPlusCenter();
          gsap.set(zoomPlusRef.current, { x: center.x, y: center.y });
        }
      }
    });

    // Initial setup
    tl.set(zoomPlusRef.current, {
      x: () => getPlusCenter().x,
      y: () => getPlusCenter().y,
      xPercent: -50,
      yPercent: -50,
      scale: 0, 
      opacity: 1,
      visibility: "visible"
    });

    // 1. Reveal Text
    tl.fromTo(textRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // 2. Zoom the PLUS
    tl.to(zoomPlusRef.current, {
      scale: 250, 
      duration: 2, // Reduced from 4
      ease: "power2.in",
    }, "-=0.2");

    // 3. Change Body Theme & Fade Clarity Background simultaneously
    tl.to('body', {
      onStart: () => {
        document.body.classList.add('light-theme');
        gsap.to('.mesh-canvas', { opacity: 0, duration: 0.3 });
      },
      onReverseComplete: () => {
        document.body.classList.remove('light-theme');
        gsap.to('.mesh-canvas', { opacity: 0.6, duration: 0.3 });
      },
      duration: 0.1
    }, ">-0.2");

    tl.to(containerRef.current, {
      backgroundColor: '#ffffff',
      duration: 0.2
    }, "<");

    // 4. Fade out the zoom-plus and the original text quickly
    tl.to([zoomPlusRef.current, textRef.current], {
      opacity: 0,
      duration: 0.4, // Reduced from 0.8
      ease: "power1.inOut"
    }, ">");

    tl.to({}, { duration: 0.5 });

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
      <div className="zoom-plus" ref={zoomPlusRef}>+</div>
    </section>
  );
};

export default Clarity;
