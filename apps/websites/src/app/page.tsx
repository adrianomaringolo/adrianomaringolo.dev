import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { PackagesSection } from '@/components/packages-section'
import { ProcessSection } from '@/components/process-section'
import { ProofSection } from '@/components/proof-section'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PackagesSection />
        <ProcessSection />
        <ProofSection />
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
