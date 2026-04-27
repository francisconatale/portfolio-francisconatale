'use client';

import Link from 'next/link';

const Navbar = () => {
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
        className="font-black tracking-tighter text-[var(--nav-text)] opacity-0 uppercase leading-[0.8] block transition-opacity duration-300" 
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}
      >
        FRANCISCO <br/> NATALE
      </Link>
      
      <div className="flex items-center space-x-8">
        <div className="hidden md:flex space-x-6">
          <Link href="#projects" className="text-[11px] font-bold uppercase tracking-widest text-[var(--nav-text)] opacity-50 hover:text-[#ff6b00] transition-colors">
            Proyectos
          </Link>
          <Link href="#skills" className="text-[11px] font-bold uppercase tracking-widest text-[var(--nav-text)] opacity-50 hover:text-[#ff6b00] transition-colors">
            Skills
          </Link>
          <Link href="#contact" className="text-[11px] font-bold uppercase tracking-widest text-[var(--nav-text)] opacity-50 hover:text-[#ff6b00] transition-colors">
            Contacto
          </Link>
        </div>
        <a 
          href="/cv-francisco-natale.pdf" 
          download
          className="px-6 py-2 border border-[#ff6b00] text-[#ff6b00] font-bold text-[10px] tracking-widest uppercase hover:bg-[#ff6b00] hover:text-black transition-all duration-300 rounded-full"
        >
          CV
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
