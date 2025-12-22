'use client'

import {
  AboutContent,
  AboutHero,
  AboutHistory,
  AboutPrinciples,
  AboutTechnologies,
} from './_components'

export default function SobrePage() {
  return (
    <div className="relative overflow-hidden">
      <AboutHero />
      <AboutContent />
      <AboutHistory />
      <AboutTechnologies />
      <AboutPrinciples />
    </div>
  )
}
