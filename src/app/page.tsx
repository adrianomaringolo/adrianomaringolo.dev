import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/app/_parts/hero-section";
import { AboutSection } from "@/app/_parts/about-section";
import { ServicesSection } from "@/app/_parts/services-section";
import { CTASection } from "@/app/_parts/cta-section";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CTASection />
    </main>
  );
}
