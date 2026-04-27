'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  useGSAP(() => {
    if (isHome) {
      // En la Home: Ocultar al inicio y mostrar solo al llegar a Clarity
      gsap.fromTo("#nav-logo", 
        { autoAlpha: 0, y: -10 },
        { 
          autoAlpha: 1, 
          y: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: "#clarity",
            start: "top 80%", // Aparece cuando Clarity entra en pantalla
            toggleActions: "play none none reverse",
          }
        }
      );
    } else {
      // En otras páginas: Mostrar inmediatamente
      gsap.set("#nav-logo", { autoAlpha: 1, y: 0 });
    }
  }, [isHome]);

  return (
    <nav 
      className="py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md h-20 transition-colors duration-700"
      style={{ 
        backgroundColor: 'var(--nav-bg)', 
        borderBottom: '1px solid var(--border-color)' 
      }}
    >
      <Link 
        href="/" 
        id="nav-logo" 
        className={`font-black tracking-tighter text-[var(--nav-text)] uppercase leading-[0.8] block transition-all duration-300 hover:text-[#ff6b00] ${isHome ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}
      >
        FRANCISCO <br/> NATALE
      </Link>
      
      <div className="flex items-center space-x-8">
        <div className="hidden md:flex space-x-6">
          <Link href="/about" className="text-[11px] font-bold uppercase tracking-widest text-[var(--nav-text)] opacity-50 hover:text-[#ff6b00] transition-colors">
            Profile & Stack
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
