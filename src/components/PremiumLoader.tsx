"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PremiumLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaderRef.current) {
      const tl = gsap.timeline();

      // Animación premium: Desliza hacia arriba con un easing elegante
      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power4.inOut",
        delay: 0.2, // Reducido para mayor agilidad
        onComplete: () => {
          // Opcional: Eliminar del DOM o esconder para que no interfiera con clics
          if (loaderRef.current) loaderRef.current.style.display = "none";
        },
      });
    }
  }, []);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#ff6b00", // Naranja premium vibrante
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Podrías añadir un logo o texto aquí en el futuro */}
    </div>
  );
}
