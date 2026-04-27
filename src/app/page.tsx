import HeroABCS from "@/components/HeroABCS";
import GiantTextScroll from "@/components/GiantTextScroll";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <HeroABCS />
      <GiantTextScroll />
      <Projects />
      <Clients />
    </main>
  );
}
