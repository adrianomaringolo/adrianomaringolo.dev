'use client'

import { RevealAnimation } from '@/components/ui/reveal-animation'
import { useLocale } from '@/hooks/use-locale'
import { Card, CardContent } from 'buildgrid-ui'
import { Lightbulb } from 'lucide-react'

export function AboutHistory() {
  const { t } = useLocale()

  const tAbout = (tag: string) => t(`about.${tag}`)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <RevealAnimation direction="up" delay={0.6}>
          <Card className="pt-0 mb-20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {tAbout('historyTitle')}
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p className="text-pretty whitespace-pre-line">{tAbout('history')}</p>
              </div>
            </CardContent>
          </Card>
        </RevealAnimation>
      </div>
    </section>
  )
}
