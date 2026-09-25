'use client'

import {
  AboutCareer,
  AboutFaq,
  AboutHero,
  AboutHistory,
  AboutPrinciples,
  AboutTechnologies,
} from './_components'

export default function SobrePage() {
  return (
    <div>
      <AboutHero />
      <AboutHistory />
      <AboutCareer />
      <AboutTechnologies />
      <AboutPrinciples />
      <AboutFaq />
    </div>
  )
}
