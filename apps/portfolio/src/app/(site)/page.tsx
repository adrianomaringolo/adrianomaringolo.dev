import { AboutSection } from '@/app/(site)/_parts/about-section'
import { CTASection } from '@/app/(site)/_parts/cta-section'
import { FeaturedBlog } from '@/app/(site)/_parts/featured-blog'
import { FeaturedProjects } from '@/app/(site)/_parts/featured-projects'
import { HeroSection } from '@/app/(site)/_parts/hero-section'
import { ServicePickerSection } from '@/app/(site)/_parts/service-picker-section'
import { TestimonialsSection } from '@/app/(site)/_parts/testimonials-section'
import { getBlogPosts } from '@/lib/blog'

export default function HomePage() {
  const posts = getBlogPosts()

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicePickerSection />
      <TestimonialsSection />
      <FeaturedProjects />
      <FeaturedBlog posts={posts} />
      <CTASection />
    </>
  )
}
