
import { HeroSection } from "@/components/heroSection";
import { NavBar } from "@/components/navBar";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import Image from "next/image";

export default function Home() {
  return (
    <div>
       

      <NavBar />
      <HeroSection />
      <HeroSection />
    </div>
  );
}
