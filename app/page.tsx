import FaqSection from "@/components/Home/Sections/FAQ/faqSection";
import FooterSection from "@/components/layouts/NavBar/footerSection";
import { HeroSection } from "@/components/Home/Sections/heroSection";
import { NavBar } from "@/components/layouts/NavBar/navBar";
import PricingSection from "@/components/Home/Sections/Pricing/pricingSection";

import { DottedGlowBackground } from "@/components/ui/backgrounds/dotted-glow-background";
import Footer from "@/components/layouts/NavBar/footer";
import Image from "next/image";
import Services from "@/components/Home/Sections/services";

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />

      {/* <Services/> */}
      {/* <Services/> */}
      <PricingSection />
      <FaqSection />
      <FooterSection />
    </div>
  );
}
