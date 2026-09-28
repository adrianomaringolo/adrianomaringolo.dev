import { AudienceSection } from '@/components/audience-section'
import { BuildStage } from '@/components/build-stage'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { FaqSection } from '@/components/faq-section'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { InstagramSection } from '@/components/instagram-section'
import { PackagesSection } from '@/components/packages-section'
import { ProofSection } from '@/components/proof-section'

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="conteudo">
        <HeroSection />
        <BuildStage />
        <AudienceSection />
        <PackagesSection />
        <ProofSection />
        <InstagramSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
