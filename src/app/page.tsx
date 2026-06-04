import { AboutSection } from '@/app/_parts/about-section'
import { CTASection } from '@/app/_parts/cta-section'
import { FeaturedProjects } from '@/app/_parts/featured-projects'
import { HeroSection } from '@/app/_parts/hero-section'
import { ServicePickerSection } from '@/app/_parts/service-picker-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicePickerSection />
      <FeaturedProjects />
      <CTASection />
    </>
  )
}
