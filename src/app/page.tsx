import { AboutSection } from '@/app/_parts/about-section'
import { CTASection } from '@/app/_parts/cta-section'
import { FeaturedBlog } from '@/app/_parts/featured-blog'
import { FeaturedProjects } from '@/app/_parts/featured-projects'
import { HeroSection } from '@/app/_parts/hero-section'
import { ServicePickerSection } from '@/app/_parts/service-picker-section'
import { TestimonialsSection } from '@/app/_parts/testimonials-section'
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
      <CTASection posts={posts} />
    </>
  )
}
