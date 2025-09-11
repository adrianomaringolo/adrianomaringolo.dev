import { AboutSection } from '@/app/_parts/about-section'
import { CTASection } from '@/app/_parts/cta-section'
import { HeroSection } from '@/app/_parts/hero-section'
import { ServicesSection } from '@/app/_parts/services-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CTASection />
    </>
  )
}
