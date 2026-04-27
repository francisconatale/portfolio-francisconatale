'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate loader delay or just start immediately
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      // Animación de entrada
      gsap.fromTo('.hero-line', 
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo('.hero-sidebar',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.7, ease: 'power3.out' }
      );

      // Parallax
      gsap.to('.hero-title', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      // Stats Counter
      if (statsRef.current) {
        const stats = statsRef.current.querySelectorAll('.stat-num');
        stats.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count') || '0');
          gsap.to(stat, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 90%',
            }
          });
        });
      }
    });

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section id="hero">
      <div className="grid-overlay">
        {[...Array(4)].map((_, i) => <div key={i} className="grid-col"></div>)}
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-line">FRANCISCO</span>
          <span className="hero-line">NATALE</span>
        </h1>
      </div>

      <div className="hero-sidebar">
        <div className="hero-about">
          <p className="hero-label">About</p>
          <p className="hero-text">
            I'm a web developer focused on building modern, fast, and
            reliable websites. I care about how it performs, scales, and feels for users.
          </p>
          <a href="#about" className="btn-arrow">
            Learn more
            <svg className="arrow-icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      <div className="hero-stats" ref={statsRef}>
        <div className="stat">
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="stat-num" data-count="30">0</span>
            <span className="stat-plus">+</span>
          </div>
          <span className="stat-label">Projects Completed</span>
        </div>
        <div className="stat">
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="stat-num" data-count="3">0</span>
            <span className="stat-plus">+</span>
          </div>
          <span className="stat-label">Years of Experience</span>
        </div>
        <div className="stat">
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="stat-num" data-count="98">0</span>
          </div>
          <span className="stat-label">/100 Average Performance</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
