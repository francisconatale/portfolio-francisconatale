'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CLIENTS = [
  { name: 'HITSHOP', description: 'Launch moments that jumped off the timeline and into culture.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800' },
  { name: 'HITLABS', description: 'A 100-year celebration turned into a cultural roar.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800' },
  { name: 'PAYSTACK', description: 'Playlists and fans pulled into one louder conversation.', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800' },
  { name: 'KIOSKITO', description: 'Campaigns designed to move faster than the algo.', image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800' },
  { name: 'FEDERICO KANAEL', description: 'Stories that made players feel something real.', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800' },
{ name: 'CAMPUS TRANSPORT', description: 'Stories that made players feel something real.', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800' }
]

export default function Clients() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const clients = gsap.utils.toArray<HTMLElement>('.client-name');
    const medias = gsap.utils.toArray<HTMLElement>('.client-media');
    
    // Distancia larga para poder scrollear con calma
    const scrollDistance = CLIENTS.length * 600;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 1, // Tracking firme y constante
        invalidateOnRefresh: true,
      }
    });

    // 1. MOVIMIENTO CONTINUO Y GPU-ACELERADO DE LA LISTA
    if (listRef.current && clients.length > 0) {
      const parentHeight = listRef.current.parentElement!.offsetHeight;
      const firstItem = clients[0];
      const lastItem = clients[clients.length - 1];
      
      const startY = (parentHeight / 2) - (firstItem.offsetTop + firstItem.offsetHeight / 2);
      const endY = (parentHeight / 2) - (lastItem.offsetTop + lastItem.offsetHeight / 2);

      gsap.set(listRef.current, { y: startY });

      // La duración exacta es el número de saltos entre clientes (length - 1)
      tl.to(listRef.current, {
        y: endY,
        ease: "none", 
        duration: CLIENTS.length - 1 
      }, 0);
    }

    // Estado inicial visual: primer elemento activo, el resto inactivo
    gsap.set(clients.slice(1), { color: "#ffffff", opacity: 0.25, filter: "blur(4px)", paddingLeft: "0px", x: 0 });
    gsap.set(medias, { position: 'absolute', inset: 0 }); // todas absolutas
    gsap.set(medias.slice(1), { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" });

    gsap.set(clients[0], { color: "#ff6b00", opacity: 1, paddingLeft: "40px", x: 15, filter: "blur(0px)" });
    gsap.set(medias[0], { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" });
    
    const img0 = medias[0].querySelector('img');
    if (img0) gsap.set(img0, { y: "0%", scale: 1.05, rotation: 0 });

    // 2. ANIMACIONES SINCRONIZADAS POR CLIENTE
    CLIENTS.forEach((_, i) => {
      const centerTime = i;
      const transitionDuration = 0.5; // Tiempo de transición entre clientes
      const holdTime = 0.25; // Tiempo que el cliente se mantiene completamente activo (sin animar)
      
      // A. Entrando al centro: Se enfoca, se pinta de naranja y la imagen se revela
      // Solo para los clientes a partir del segundo, ya que el primero ya está activo
      if (i > 0) {
        const enterStartTime = centerTime - holdTime - transitionDuration;
        
        tl.to(clients[i], {
          color: "#ff6b00",
          opacity: 1,
          paddingLeft: "40px",
          x: 15,
          filter: "blur(0px)",
          duration: transitionDuration,
          ease: "power2.out"
        }, enterStartTime);

        tl.to(medias[i], {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: transitionDuration,
          ease: "power3.out"
        }, enterStartTime);

        const img = medias[i].querySelector('img');
        if (img) {
          // El último cliente no debe tener una animación que exceda el tiempo total del scroll (centerTime)
          const isLast = i === CLIENTS.length - 1;
          const imgDuration = isLast ? (transitionDuration + holdTime) : (transitionDuration * 2);

          tl.fromTo(img, 
            { y: "15%", scale: 1.2, rotation: i % 2 === 0 ? 1.5 : -1.5 },
            { y: "0%", scale: 1.05, rotation: 0, duration: imgDuration, ease: "none" },
            enterStartTime
          );
        }
      }

      // B. Saliendo del centro: Se vuelve blanco, borroso y la imagen desaparece
      // El último cliente no sale para que se quede visible al terminar el scroll
      if (i < CLIENTS.length - 1) {
        const exitStartTime = centerTime + holdTime;
        
        tl.to(clients[i], {
          color: "#ffffff",
          opacity: 0.25,
          paddingLeft: "0px",
          x: 0,
          filter: "blur(4px)",
          duration: transitionDuration,
          ease: "power2.in"
        }, exitStartTime);

        tl.to(medias[i], {
          clipPath: "inset(100% 0% 0% 0%)",
          opacity: 0,
          duration: transitionDuration,
          ease: "power3.in"
        }, exitStartTime);
      }
    });

  }, { scope: rootRef });

  return (
    <section 
      ref={rootRef} 
      className="clients-section w-full bg-[#0f0f11] overflow-hidden"
    >
      <div className="h-screen w-full flex items-center justify-center">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_320px] items-center gap-12 md:gap-16 relative">
            
            <div className="flex justify-start md:justify-end items-start h-full pt-[25vh]">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#ff6b00] opacity-60 font-bold whitespace-nowrap md:rotate-[-90deg] md:origin-right md:translate-y-12">
                Brands & Projects
              </span>
            </div>

            {/* Contenedor de la lista con overflow oculto para enmascarar */}
            <div className="relative h-[60vh] md:h-[70vh] overflow-hidden pointer-events-none z-10 w-full">
              <ul 
                ref={listRef} 
                className="clients-list relative w-full flex flex-col"
              >
                {CLIENTS.map((client, index) => (
                  <li 
                    key={index} 
                    className="client-name text-5xl md:text-[7.5rem] font-black leading-[0.9] tracking-tighter py-4 select-none w-full"
                  >
                    {client.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-[50vh] md:h-[70vh] flex items-center">
              <div className="w-full pointer-events-none">
                {CLIENTS.map((client, index) => (
                  <div 
                    key={index} 
                    className="client-media absolute inset-0 flex flex-col justify-center gap-6"
                  >
                    <div className="w-full aspect-[3/4] overflow-hidden rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all border border-white/5">
                      <img 
                        src={client.image} 
                        alt={client.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] text-white font-bold uppercase tracking-widest">
                        {client.name}
                      </p>
                      <p className="text-[10px] text-white/40 leading-relaxed max-w-[200px] font-medium uppercase tracking-wider">
                        {client.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
