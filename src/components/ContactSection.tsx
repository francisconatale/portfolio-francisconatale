'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending to Firestore:', formData);
    alert('Mensaje enviado con éxito. Me pondré en contacto pronto.');
  };

  return (
    <section id="contact" className="py-32 px-10 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-[var(--white)] tracking-tighter uppercase leading-[0.9]">
            ¿Tienes un <span className="text-[#ff6b00]">Proyecto?</span>
          </h2>
          <p className="text-[var(--white)]/60 text-lg md:text-xl max-w-md mb-12 leading-relaxed">
            Hablemos sobre cómo puedo ayudar a que tu negocio crezca con tecnología adaptable y segura.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-[var(--white)]/10 flex items-center justify-center group-hover:bg-[#ff6b00] transition-colors">
                <span className="text-[var(--white)] text-xs font-bold uppercase tracking-tighter group-hover:text-black">EM</span>
              </div>
              <span className="text-[var(--white)]/40 uppercase tracking-widest text-xs font-bold group-hover:text-[var(--white)] transition-colors">hola@francisconatale.com</span>
            </div>
            {/* Add more contact info as needed */}
          </div>
        </div>

        <div className="bg-[var(--card-bg)] p-10 md:p-20 rounded-[3rem] border border-[var(--white)]/5 shadow-2xl transition-colors duration-700">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-[var(--white)]/30 font-black">Nombre completo</label>
              <input 
                type="text" 
                required
                className="w-full bg-transparent border-b border-[var(--white)]/10 py-4 text-[var(--white)] focus:outline-none focus:border-[#ff6b00] transition-colors placeholder:text-[var(--white)]/10 text-lg"
                placeholder="Escribe tu nombre..."
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-[var(--white)]/30 font-black">Email corporativo</label>
              <input 
                type="email" 
                required
                className="w-full bg-transparent border-b border-[var(--white)]/10 py-4 text-[var(--white)] focus:outline-none focus:border-[#ff6b00] transition-colors placeholder:text-[var(--white)]/10 text-lg"
                placeholder="email@empresa.com"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-[var(--white)]/30 font-black">Tu mensaje</label>
              <textarea 
                rows={4}
                required
                className="w-full bg-[var(--white)]/[0.02] border border-[var(--white)]/10 rounded-2xl p-6 text-[var(--white)] focus:outline-none focus:border-[#ff6b00] transition-colors resize-none placeholder:text-[var(--white)]/10"
                placeholder="Cuéntame sobre tu proyecto o desafío técnico..."
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-8 bg-[#ff6b00] text-black font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white transition-all duration-500 rounded-2xl shadow-lg shadow-[#ff6b00]/10"
            >
              Iniciar Conversación
            </button>
            <p className="text-center text-[9px] uppercase tracking-widest text-[var(--white)]/20 font-bold">
              Respondo en menos de 24 horas
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
