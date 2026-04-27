import Hero from "@/components/Hero/Hero";
import Strategy from "@/components/Strategy/Strategy";
import Clarity from "@/components/Clarity/Clarity";
import MeshBackground from "@/components/MeshBackground";
import Clients from "@/components/Clients";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen">
      <MeshBackground />
      
      {/* Hero Section - Headline + CV Immediate Action */}
      <Hero />

      {/* Strategy Section - How I approach projects */}
      <Strategy />

      {/* Clarity Section - Identity Statement */}
      <Clarity />
      
      {/* Social Proof - Clients & Brands */}
      <Clients />

      {/* Final Invitation to About Page */}
      <section className="py-32 px-6 text-center border-t border-white/5">
        <p className="text-white/20 uppercase tracking-[0.3em] text-[10px] mb-8 font-black">Curious about the engineering?</p>
        <Link 
          href="/about" 
          className="group inline-flex flex-col items-center"
        >
          <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:text-[#ff6b00] transition-colors duration-500">
            View my Profile & Stack →
          </span>
          <div className="h-px w-0 bg-[#ff6b00] group-hover:w-full transition-all duration-700 mt-4" />
        </Link>
      </section>
    </main>
  );
}
