import HeroABCS from "@/components/HeroABCS";
import GiantTextScroll from "@/components/GiantTextScroll";
import Clients from "@/components/Clients";
import RotatingText from "@/components/RotatingText";
import MeshBackground from "@/components/MeshBackground";
import PerspectiveProjectGrid from "@/components/PerspectiveProjectGrid";

export default function Page() {
  return (
    <main className="min-h-screen">
      <MeshBackground />
      <HeroABCS />
      <PerspectiveProjectGrid />
      <GiantTextScroll />
      <Clients />
      <RotatingText />
    </main>
  );
}
