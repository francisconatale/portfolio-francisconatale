'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CLIENTS = [
  { name: 'Gilead', description: 'Launch moments that jumped off the timeline and into culture.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800' },
  { name: 'Hulu', description: 'A 100-year celebration turned into a cultural roar.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800' },
  { name: 'Warner', description: 'Playlists and fans pulled into one louder conversation.', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800' },
  { name: 'Spotify', description: 'Campaigns designed to move faster than the algo.', image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800' },
  { name: 'Sony', description: 'Stories that made players feel something real.', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800' },
  { name: 'Coachella', description: 'A desert reimagined as a brand curator\'s playground.', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800' },
  { name: 'Art Basel', description: 'Art and commerce blurred into one living moment.', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800' },
  { name: 'Fendi', description: 'Heritage reframed for a generation that moves fast.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800' },
  { name: 'Meta', description: 'Innovation translated into a story people could touch.', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' },
  { name: 'Google', description: 'Search made human, one campaign at a time.', image: 'https://images.unsplash.com/photo-1573806119972-0419046c4309?auto=format&fit=crop&q=80&w=800' },
];

export default function Clients() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const clients = gsap.utils.toArray<HTMLElement>('.client-name');
      const medias = gsap.utils.toArray<HTMLElement>('.client-media');
      
      const mm = gsap.matchMedia();

      mm.add("(min-width: 800px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${CLIENTS.length * 100}%`,
            pin: true,
            scrub: 0.1,
            snap: 1 / (CLIENTS.length - 1),
          }
        });

        CLIENTS.forEach((_, i) => {
          const label = `client-${i}`;
          tl.addLabel(label);

          // Animación de Nombres (Derecha)
          clients.forEach((el, index) => {
            tl.to(el, {
              color: index === i ? "#E03C1F" : "#1a1a1a",
              opacity: index === i ? 1 : 0.05, // Mucho más sutil los no activos
              duration: 0.5
            }, label);
          });

          // Animación de Media (Flotante)
          medias.forEach((el, index) => {
            tl.to(el, {
              opacity: index === i ? 1 : 0,
              scale: index === i ? 1 : 0.8,
              y: index === i ? 0 : 20,
              display: index === i ? 'flex' : 'none',
              duration: 0.5
            }, label);
          });

          // Centrado de la lista
          if (listRef.current) {
            const item = clients[i] as HTMLElement;
            const targetScroll = item.offsetTop - (listRef.current.offsetHeight / 2) + (item.offsetHeight / 2);
            tl.to(listRef.current, {
              scrollTop: targetScroll,
              duration: 0.5
            }, label);
          }

          tl.to({}, { duration: 0.2 }); 
        });
      });

      mm.add("(max-width: 799px)", () => {
        gsap.set('.client-name', { opacity: 1, color: "#1a1a1a" });
        gsap.set('.client-media', { display: 'none' });
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={rootRef} 
      className="clients-section w-full bg-white overflow-hidden"
    >
      <div ref={stickyRef} className="h-screen w-full flex items-center justify-center">
        <div className="container mx-auto px-6 md:px-24">
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center gap-12 md:gap-24 relative">
            
            {/* Columna Izquierda: Etiqueta Sutil */}
            <div className="flex justify-start md:justify-end">
              <span className="text-[11px] uppercase tracking-[0.5em] text-gray-400 font-bold whitespace-nowrap opacity-60">
                The brands that bet on us
              </span>
            </div>

            {/* Columna Derecha: Lista de Marcas (Peso Visual) */}
            <div className="relative">
              <ul 
                ref={listRef} 
                className="clients-list h-[50vh] md:h-[70vh] overflow-hidden pointer-events-none py-[30vh] relative z-10"
              >
                {CLIENTS.map((client, index) => (
                  <li 
                    key={index} 
                    className="client-name text-6xl md:text-[10rem] font-black leading-[0.9] tracking-tighter py-4 select-none"
                  >
                    {client.name}
                  </li>
                ))}
              </ul>

              {/* Media Flotante (Se muestra junto a la lista) */}
              <div className="absolute top-1/2 -right-12 md:-right-24 -translate-y-1/2 w-48 md:w-72 pointer-events-none z-0">
                {CLIENTS.map((client, index) => (
                  <div 
                    key={index} 
                    className="client-media absolute inset-0 flex flex-col gap-4"
                  >
                    <div className="w-full aspect-[3/4] overflow-hidden rounded-sm shadow-xl grayscale hover:grayscale-0 transition-all">
                      <img 
                        src={client.image} 
                        alt={client.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed max-w-[180px] font-medium uppercase tracking-wider">
                      {client.description}
                    </p>
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
