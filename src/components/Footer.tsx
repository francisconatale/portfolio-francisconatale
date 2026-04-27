'use client';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 px-6 md:px-12 bg-[#0f0f11] text-center">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h3 className="text-[#ff6b00] font-black tracking-tighter text-2xl uppercase">Natale</h3>
            <p className="text-white/20 text-[9px] uppercase tracking-[0.4em] mt-4 font-medium leading-loose">
              Construyendo soluciones <br/> digitales de alto impacto.
            </p>
          </div>
          
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em] font-black text-white/30">
            <a href="#" className="hover:text-[#ff6b00] transition-colors hover:translate-y-[-2px] inline-block duration-300">LinkedIn</a>
            <a href="#" className="hover:text-[#ff6b00] transition-colors hover:translate-y-[-2px] inline-block duration-300">GitHub</a>
            <a href="#" className="hover:text-[#ff6b00] transition-colors hover:translate-y-[-2px] inline-block duration-300">Twitter</a>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] uppercase tracking-[0.2em] text-white/10 font-bold">
          <p>&copy; {new Date().getFullYear()} Francisco Natale — Portfolio Estratégico.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
