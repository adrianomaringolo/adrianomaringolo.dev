import { AboutSection } from '@/app/_parts/about-section'
import { CTASection } from '@/app/_parts/cta-section'
import { HeroSection } from '@/app/_parts/hero-section'
import { ServicesSection } from '@/app/_parts/services-section'
import { FeaturedProjects } from '@/components/featured-projects'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturedProjects />
      <CTASection />
    </>
  )
}
