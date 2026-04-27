'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Colores premium (puedes ajustarlos a tu marca)
    const colors = [
      { r: 10, g: 10, b: 20 },   // Negro azulado
      { r: 30, g: 10, b: 40 },   // Púrpura muy oscuro
      { r: 15, g: 25, b: 35 },   // Azul petróleo
    ];

    const draw = () => {
      time += 0.005;
      const { width, height } = canvas;
      
      // Limpiar con un fade suave para efecto estela
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Crear gradiente radial dinámico
      const x = width / 2 + Math.cos(time) * (width * 0.3);
      const y = height / 2 + Math.sin(time * 0.8) * (height * 0.3);
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, width * 0.8);
      gradient.addColorStop(0, `rgba(${colors[1].r}, ${colors[1].g}, ${colors[1].b}, 0.15)`);
      gradient.addColorStop(0.5, `rgba(${colors[2].r}, ${colors[2].g}, ${colors[2].b}, 0.05)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-60"
    />
  );
}
