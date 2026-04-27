"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type LoaderDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'random';

interface PremiumLoaderProps {
  direction?: LoaderDirection;
  color?: string;
}

export default function PremiumLoader({ 
  direction = 'random', 
  color = "#ff6b00" 
}: PremiumLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaderRef.current) {
      const tl = gsap.timeline();

      let vars: gsap.TweenVars = {
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.1,
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
        },
      };

      // Si es random, elegimos una dirección al azar (solo en el cliente para evitar hidratación errónea)
      let finalDirection = direction;
      if (finalDirection === 'random') {
        const directions: ('up'|'down'|'left'|'right'|'fade')[] = ['up', 'down', 'left', 'right', 'fade'];
        finalDirection = directions[Math.floor(Math.random() * directions.length)];
      }

      // Parametrización de la salida
      switch (finalDirection) {
        case 'down':
          vars.yPercent = 100;
          break;
        case 'left':
          vars.xPercent = -100;
          break;
        case 'right':
          vars.xPercent = 100;
          break;
        case 'fade':
          vars.autoAlpha = 0;
          vars.scale = 1.1;
          break;
        case 'up':
        default:
          vars.yPercent = -100;
          break;
      }

      tl.to(loaderRef.current, vars);
    }
  }, [direction]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: color,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform, opacity",
      }}
    >
      {/* Aquí podrías poner un logo que también reaccione a la dirección */}
    </div>
  );
}
