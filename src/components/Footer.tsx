'use client';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 px-6 md:px-12 bg-[#0f0f11] text-center">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h3 className="text-[#ff6b00] font-black tracking-tighter text-xl">NATALE</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2">
              Building digital experiences that matter.
            </p>
          </div>
          
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">
            <a href="#" className="hover:text-[#ff6b00] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[#ff6b00] transition-colors">GitHub</a>
            <a href="#" className="hover:text-[#ff6b00] transition-colors">Instagram</a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-[9px] uppercase tracking-[0.1em] text-white/20">
          <p>&copy; {new Date().getFullYear()} Francisco Natale. All rights reserved.</p>
          <p>Designed with passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
