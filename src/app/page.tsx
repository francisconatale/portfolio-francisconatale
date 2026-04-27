import HeroABCS from "@/components/HeroABCS";
import GiantTextScroll from "@/components/GiantTextScroll";
import Clients from "@/components/Clients";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <HeroABCS />
      <GiantTextScroll />
      <Clients />
    </main>
  );
}
