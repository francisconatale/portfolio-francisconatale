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
  { id: 'HITSHOP', name: 'HITSHOP', image: '/hitshop.jpg', url: 'https://hitshop.vercel.app/', statement: 'A specialized platform for buying and selling hardware components.' },
  { id: 'HITLABS', name: 'HITLABS', image: '/hitlabs.png', url: 'https://hitlabs.vercel.app/', statement: 'Official website for my startup dedicated to software development.' },
  { id: 'KIOSKITO', name: 'KIOSKITO', image: '/kioskito.jpg', url: 'https://kioskito-web.vercel.app/', statement: 'A comprehensive management application designed for retail businesses.' },
  { id: 'FEDERICO KAENEL', name: 'FEDERICO KAENEL', image: '/fkstudio.png', url: 'https://federicokaenel.vercel.app/', statement: 'Professional engineering portfolio showcasing technical expertise.' },
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
        <p className="clients__heading">Technology at the</p>
        <div className="clients__trusted-row">
          <p className="clients__heading">Service of your</p>
          <span className="clients__referrals-word">Business</span>
        </div>
      </div>

      <div className="clients__desc-grid">
        <p className="clients__desc-large">
          "I don't just write code — I architect digital products where security, usability, and business goals converge."
        </p>
        <p className="clients__desc-sub">
          Strategic engineering and full-stack adaptability at the service of your results.
        </p>
      </div>

      <div className="clients__list-wrap">
        <div className="clients__label">Companies and projects that trust my work</div>

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