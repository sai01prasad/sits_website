
import FaqSection from "@/components/faqSection";
import FooterSection from "@/components/footerSection";
import { HeroSection } from "@/components/heroSection";
import { NavBar } from "@/components/navBar";
import PricingSection from "@/components/pricingSection";
import Services from "@/components/services";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import Footer from "@/components/ui/footer";
import Image from "next/image";

export default function Home() {
  return (
    <div>
       

      <NavBar />
      <HeroSection />
     
      {/* <Services/> */}
      <PricingSection/>
      <FaqSection />
      <FooterSection/>
    </div>
  );
}
