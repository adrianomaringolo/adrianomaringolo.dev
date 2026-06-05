'use client'

import { AboutCareer, AboutHero, AboutHistory, AboutPrinciples, AboutTechnologies } from './_components'

export default function SobrePage() {
  return (
    <div>
      <AboutHero />
      <AboutHistory />
      <AboutCareer />
      <AboutTechnologies />
      <AboutPrinciples />
    </div>
  )
}
