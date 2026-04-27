import HeroABCS from "@/components/HeroABCS";
import GiantTextScroll from "@/components/GiantTextScroll";
import Clients from "@/components/Clients";
import RotatingText from "@/components/RotatingText";

export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroABCS />
      <GiantTextScroll />
      <Clients />
      <RotatingText />
    </main>
  );
}
