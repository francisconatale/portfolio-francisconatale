'use client';

import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Iconos en formato SVG para reemplazar lucide-react (que no incluye marcas)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.38 6.52-1.65 6.52-7.07a5.2 5.2 0 0 0-1.4-3.5 4.8 4.8 0 0 0-.1-3.4s-1.1-.4-3.5 1.3a11.5 11.5 0 0 0-6 0C7.1 1.5 6 1.9 6 1.9a4.8 4.8 0 0 0-.1 3.4 5.2 5.2 0 0 0-1.4 3.5c0 5.4 3.3 6.69 6.5 7.07a4.8 4.8 0 0 0-1 3.03V22"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16.11 7.89 16.11 7.89"></path><path d="M15.18 15.18A4 4 0 1 1 8.82 8.82a4 4 0 0 1 6.36 6.36z"></path></svg>
);

// Componente para secciones con jerarquía clara y estilo premium
const InfoSection = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <section className={`mb-24 opacity-0 translate-y-10 scroll-reveal ${className}`}>
    <div className="flex items-center gap-4 mb-10">
      <h2 className="text-[#ff6b00] text-[11px] uppercase tracking-[0.4em] font-bold">
        {title}
      </h2>
      <div className="flex-grow h-px bg-gradient-to-r from-white/10 to-transparent" />
    </div>
    {children}
  </section>
);

const TECH_STACK = [
  { group: "Core Stack", items: ["React", "Java", "TypeScript", "Next.js"] },
  { group: "Data Layer", items: ["PostgreSQL", "NoSQL", "Firebase", "Firestore"] },
  { group: "Specialized", items: ["Embedded Systems", "Hardware Design", "GSAP", "Tailwind"] }
];

export default function AboutPage() {
  useGSAP(() => {
    // 1. Animación del Header (al cargar)
    gsap.fromTo('.header-reveal', 
      { y: 30, autoAlpha: 0 }, 
      { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" }
    );

    // 2. Animación de Secciones al Scrollear
    const sections = gsap.utils.toArray<HTMLElement>('.scroll-reveal');
    sections.forEach((section) => {
      gsap.to(section, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });
    });

    // 3. Animación de "The Professional" linea por linea al scrollear
    const profTexts = gsap.utils.toArray<HTMLElement>('.profesional-text');
    gsap.set(profTexts, { y: 40, opacity: 0 });
    gsap.to(profTexts, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.profesional-container',
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });

    // 4. Animación específica: Slide From Right para la columna técnica
    gsap.fromTo('.reveal-right',
      { x: 50, autoAlpha: 0 },
      { 
        x: 0, 
        autoAlpha: 1, 
        duration: 1.2, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.reveal-right',
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-24 max-w-6xl mx-auto">
      {/* Header Editorial (Animación on Load) */}
      <header className="mb-32 pt-10">
        <h1 className="header-reveal text-5xl md:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.85] mb-12">
          Software driven <br/>
          <span className="text-[#ff6b00] italic font-serif font-light tracking-normal lowercase text-6xl md:text-[6.5rem]">by curiosity.</span>
        </h1>
        <a 
          href="/francisconatale_curriculumvitae.pdf" 
          target="_blank"
          rel="noreferrer"
          className="header-reveal inline-flex items-center gap-3 px-8 py-4 bg-[#ff6b00] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:scale-105 transition-all duration-500"
        >
          View Resume
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        {/* Columna Izquierda: Perfil y Educación */}
        <div className="md:col-span-7">
          <InfoSection title="The Professional" className="profesional-section">
            <div className="profesional-container space-y-2 text-xl text-white/80 leading-relaxed font-light">
              <div className="overflow-hidden"><p className="profesional-text">I build <strong className="font-semibold text-white">secure, user-centric digital products</strong></p></div>
              <div className="overflow-hidden"><p className="profesional-text">focused entirely on solving business problems.</p></div>
              <div className="overflow-hidden"><p className="profesional-text">I don't just write code —</p></div>
              <div className="overflow-hidden pb-4"><p className="profesional-text">I am a <strong className="font-semibold text-white">solution creator</strong>.</p></div>
              
              <div className="overflow-hidden"><p className="profesional-text">My core differentiator is <strong className="font-semibold text-white">technical adaptability</strong>.</p></div>
              <div className="overflow-hidden"><p className="profesional-text">I seamlessly adapt to any stack to deliver</p></div>
              <div className="overflow-hidden"><p className="profesional-text">reliable software that ensures your business grows</p></div>
              <div className="overflow-hidden"><p className="profesional-text">while prioritizing user comfort and security.</p></div>
            </div>
          </InfoSection>

          <InfoSection title="Academic Ledger">
            <div className="flex flex-col">
              {[
                { 
                  title: "B.S. in Computer Science", 
                  place: "Universidad Nacional de Río Cuarto", 
                  date: "2026 — Present",
                  details: "Expanding expertise in advanced computational theory and complex problem-solving."
                },
                { 
                  title: "Computer Systems Analyst", 
                  place: "Universidad Nacional de Río Cuarto", 
                  date: "2022 — 2026",
                  details: "Focused on software engineering fundamentals, algorithms, and systems architecture."
                }
              ].map((edu, i) => (
                <div key={i} className="relative pl-8 py-6 border-l border-white/10 group hover:border-[#ff6b00] transition-colors duration-500">
                  <div className="absolute left-[-5px] top-8 w-2 h-2 rounded-full bg-white/10 group-hover:bg-[#ff6b00] transition-colors duration-500" />
                  <span className="text-[#ff6b00] font-mono text-[10px] tracking-widest block mb-2">{edu.date}</span>
                  <h3 className="text-white text-lg font-bold tracking-tight mb-1">{edu.title}</h3>
                  <p className="text-white/50 text-sm font-serif italic mb-3">{edu.place}</p>
                  <p className="text-white/30 text-xs leading-relaxed max-w-sm">{edu.details}</p>
                </div>
              ))}
            </div>
          </InfoSection>
        </div>

        {/* Columna Derecha: Stack y Métricas (Slide from Right on Scroll) */}
        <div className="md:col-span-5 reveal-right">
          <InfoSection title="Technical Specs">
            <div className="flex flex-col">
              {TECH_STACK.map((s, i) => (
                <div key={i} className="group flex flex-col border-b border-white/5 py-5 hover:border-white/20 transition-colors duration-500">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-3 group-hover:text-white/60 transition-colors">{s.group}</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {s.items.map(item => (
                      <span key={item} className="text-sm font-medium text-white/90">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </InfoSection>
          
          <div className="mt-20 pt-10 border-t border-white/5 scroll-reveal opacity-0 translate-y-10">
            <span className="text-4xl text-[#ff6b00] font-serif leading-none block mb-4">"</span>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-serif italic mb-6">
              Code is a liability until it solves a problem. I optimize for the solution, not the syntax.
            </p>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">— Core Philosophy</span>
          </div>
        </div>
      </div>

      {/* Social Grid */}
      <section className="mt-16 mb-16 scroll-reveal opacity-0 translate-y-10">
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <a href="https://github.com/francisconatale" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/5 rounded-2xl hover:border-[#ff6b00] hover:bg-[#ff6b00]/5 transition-all duration-500 group">
            <GithubIcon className="text-white/50 group-hover:text-[#ff6b00] transition-colors duration-500 mb-4" />
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/30 group-hover:text-[#ff6b00] transition-colors duration-500">Github</span>
          </a>
          <a href="https://linkedin.com/in/1francisco/" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/5 rounded-2xl hover:border-[#ff6b00] hover:bg-[#ff6b00]/5 transition-all duration-500 group">
            <LinkedinIcon className="text-white/50 group-hover:text-[#ff6b00] transition-colors duration-500 mb-4" />
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/30 group-hover:text-[#ff6b00] transition-colors duration-500">LinkedIn</span>
          </a>
          <a href="https://instagram.com/1francisconatale/" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/5 rounded-2xl hover:border-[#ff6b00] hover:bg-[#ff6b00]/5 transition-all duration-500 group">
            <InstagramIcon className="text-white/50 group-hover:text-[#ff6b00] transition-colors duration-500 mb-4" />
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/30 group-hover:text-[#ff6b00] transition-colors duration-500">Instagram</span>
          </a>
        </div>
      </section>

      {/* CTA Premium */}
      <footer className="mb-10 scroll-reveal opacity-0 translate-y-10">
        <div className="p-10 md:p-20 bg-[#ff6b00]/5 border border-[#ff6b00]/10 rounded-3xl text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#ff6b00] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
          <div className="relative z-10 transition-colors duration-700 group-hover:text-black">
            <span className="text-[10px] uppercase tracking-[0.5em] mb-6 block font-black opacity-50 group-hover:opacity-100">Next Step</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">
              Let's build together
            </h2>
            <a 
              href="mailto:your-email@example.com"
              className="inline-block px-8 py-4 bg-white/10 group-hover:bg-black group-hover:text-white text-white font-bold uppercase tracking-widest text-xs rounded-full backdrop-blur-sm transition-all duration-500 hover:scale-105"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
