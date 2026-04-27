'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Clients.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CLIENTS = [
  { id: 'HITSHOP', name: 'HITSHOP', image: 'https://cdn.prod.website-files.com/69aaebc8b2af8386b44dc29a/69b217360f470f1e6b16b233_1.%20Gilead_Law%20Roach_Ball_Ashley%20Brooke%20Creative.png', statement: 'Campaigns that made healthcare human again.' },
  { id: 'HITLABS', name: 'HITLABS', image: 'https://cdn.prod.website-files.com/69aaebc8b2af8386b44dc29a/69b2172b1f812a288cc9c9dc_2.%20Hulu_Trixie%20Mattel_Golden%20Girls_Ashley%20Brooke%20Creative%20Studio.png', statement: 'Launch moments that jumped off the timeline and into culture.' },
  { id: 'KIOSKITO', name: 'KIOSKITO', image: 'https://cdn.prod.website-files.com/69aaebc8b2af8386b44dc29a/69b2174185cd293af636688c_3.%20WARNER_URIAS_RAUL_WILLY%20WONKA_.jpg', statement: 'A 100-year celebration turned into a cultural roar.' },
  { id: 'FEDERICO KAENEL', name: 'FEDERICO KAENEL', image: 'https://cdn.prod.website-files.com/69aaebc8b2af8386b44dc29a/69b20f1903725ad68784e5d6_4.%20Spotify_Maggie%20Rogers_Ashley%20Brooke%20Creative%20Studio.jpg', statement: 'Stories that made players feel something real.' },
];

export default function Clients() {
  const [activeClient, setActiveClient] = useState(CLIENTS[0].id);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Heading animation
    gsap.fromTo(
      ".clients__heading-wrap",
      { scale: 0.92, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".clients__heading-wrap",
          start: "top 80%",
        },
      }
    );

    // Initial activation
    handleActivate(CLIENTS[0].id);
  }, { scope: containerRef });

  const handleActivate = (clientId: string) => {
    setActiveClient(clientId);
    
    const images = gsap.utils.toArray<HTMLElement>('.client-img-item');
    images.forEach((img) => {
      const isTarget = img.getAttribute('data-for') === clientId;
      gsap.to(img, {
        opacity: isTarget ? 1 : 0,
        scale: isTarget ? 1 : 0.95,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  };

  return (
    <section className="clients" id="work" ref={containerRef}>
      <div className="clients__heading-wrap">
        <p className="clients__heading">Most of my client work comes from</p>
        <div className="clients__trusted-row">
          <p className="clients__heading">Trusted</p>
          <span className="clients__referrals-word">Referrals</span>
        </div>
      </div>

      <div className="clients__desc-grid">
        <p className="clients__desc">
          That's how I found success: through trust, consistency, and a shared ethos.<br/><br/>
          I'm a partner who is curious, transparent, ambitious, and passionate.
        </p>
        <p className="clients__desc">
          Project to project, referral after referral, I meet people where they are.<br/><br/>
          …collaborating at the right time, for the right reasons. Do good work. Let the work sell itself.
        </p>
      </div>

      <div className="clients__list-wrap">
        <div className="clients__label">The brands that bet on me</div>

        <div className="clients__names">
          {CLIENTS.map((client) => (
            <div 
              key={client.id}
              className={`client-name-item js-client ${activeClient === client.id ? 'is-active' : ''}`}
              onMouseEnter={() => handleActivate(client.id)}
              data-client={client.id}
            >
              <span>{client.name}</span>
            </div>
          ))}
        </div>

        <div className="clients__image-panel">
          {CLIENTS.map((client) => (
            <div 
              key={client.id} 
              className="client-img-item" 
              data-for={client.id}
              style={{ opacity: activeClient === client.id ? 1 : 0 }}
            >
              <img src={client.image} alt={client.name} />
            </div>
          ))}
        </div>

        <div className="clients__statements">
          {CLIENTS.map((client) => (
            <div 
              key={client.id}
              className={`client-statement ${activeClient === client.id ? 'is-active' : ''}`}
              data-for={client.id}
            >
              {client.statement}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
