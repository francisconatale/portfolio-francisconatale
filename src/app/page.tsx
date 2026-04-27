import Hero from "@/components/Hero/Hero";
import Strategy from "@/components/Strategy/Strategy";
import Clarity from "@/components/Clarity/Clarity";
import MeshBackground from "@/components/MeshBackground";
import ContactSection from "@/components/ContactSection";
import Clients from "@/components/Clients";

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
      
      {/* Contact Section - CTAs + Form */}
      <ContactSection />
    </main>
  );
}
