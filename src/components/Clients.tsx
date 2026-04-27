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
  { id: 'HITSHOP', name: 'HITSHOP', image: '/hitshop.jpg', url: 'https://hitshop.vercel.app/', statement: 'Campaigns that made healthcare human again.' },
  { id: 'HITLABS', name: 'HITLABS', image: '/hitlabs.png', url: 'https://hitlabs.vercel.app/', statement: 'Launch moments that jumped off the timeline and into culture.' },
  { id: 'KIOSKITO', name: 'KIOSKITO', image: '/kioskito.jpg', url: 'https://kioskito-web.vercel.app/', statement: 'A 100-year celebration turned into a cultural roar.' },
  { id: 'FEDERICO KAENEL', name: 'FEDERICO KAENEL', image: '/fkstudio.png', url: 'https://federicokaenel.vercel.app/', statement: 'Stories that made players feel something real.' },
];

export default function Clients() {
  const [activeClient, setActiveClient] = useState(CLIENTS[0].id);
  const containerRef = useRef<HTMLElement>(null);

const handleActivate = (clientId: string, openUrl: boolean = false) => {
    setActiveClient(clientId);
    
    const client = CLIENTS.find(c => c.id === clientId);
    if (client?.url && openUrl) {
      window.open(client.url, '_blank');
    }
    
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

useGSAP(() => {
    // Show first client
    handleActivate(CLIENTS[0].id);
  }, { scope: containerRef });

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
              onClick={() => handleActivate(client.id, true)}
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