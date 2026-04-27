"use client";

import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Strategy.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const strategies = [
  { id: '01', title: 'Performance First', color: 'row-dark', text: 'I focus on building websites that load fast and feel smooth from the first interaction.' },
  { id: '02', title: 'Clean & Scalable Code', color: 'row-green', text: 'I write clean, well-structured, and maintainable code with a strong focus on clarity.' },
  { id: '03', title: 'Modern UI & UX', color: 'row-light', text: 'I design and build interfaces with clarity, usability, and consistency in mind.' },
  { id: '04', title: 'Reliable Delivery', color: 'row-dark', text: 'From the initial idea to the final launch, I focus on clear communication.' },
];

const Strategy = () => {
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.strategy-row').forEach((row) => {
      gsap.fromTo(row,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="strategy">
      <div className="strategy-header">
        <p className="section-eyebrow">How I Approach<br />Every Project?</p>
      </div>
      <div className="strategy-rows">
        {strategies.map((s) => (
          <div key={s.id} className={`strategy-row ${s.color}`}>
            <div className="row-content">
              <h3 className="row-title">{s.title}</h3>
              <p className="row-text">{s.text}</p>
              <a href="#about" className="btn-arrow">
                Learn more
                <svg className="arrow-icon" viewBox="0 0 24 24">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </a>
            </div>
            <span className="row-num">{s.id}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Strategy;
