'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav 
      className="py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md h-20"
      style={{ 
        backgroundColor: '#0f0f11', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)' 
      }}
    >
      <Link 
        href="/" 
        id="nav-logo" 
        className="font-black tracking-tighter text-white opacity-0 uppercase leading-[0.8] block transition-opacity duration-300" 
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}
      >
        FRANCISCO <br/> NATALE
      </Link>
      
      <div className="space-x-6">
        <Link href="/projects" className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-[#ff6b00] transition-colors">
          Projects
        </Link>
        <Link href="/blog" className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-[#ff6b00] transition-colors">
          Blog
        </Link>
        <Link href="/contact" className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-[#ff6b00] transition-colors">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
