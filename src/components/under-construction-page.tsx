'use client'

import { useLocale } from '@/hooks/use-locale'
import { buttonVariants, Card, cn } from 'buildgrid-ui'
import { ArrowLeft, Clock, Wrench } from 'lucide-react'
import Link from 'next/link'

interface UnderConstructionPageProps {
  title: string
  underConstruction?: string
  description?: string
  icon?: string
}

export const UnderConstructionPage = ({
  title,
  underConstruction,
  description,
  icon,
}: UnderConstructionPageProps) => {
  const { t } = useLocale()
  const tUnderConstruction = (tag: string) => t(`underConstruction.${tag}`)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/10 dark:to-muted  flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Main Icon with Animation */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse-slow">
            <div className="text-6xl animate-bounce-slow">{icon || '🚧'}</div>
          </div>
          {/* <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
          </div> */}
        </div>

        {/* Title with Staggered Animation */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground animate-fade-in-up">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-2 animate-slide-in-left">
            <Wrench className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold text-primary">
              {underConstruction ?? tUnderConstruction('title')}
            </h2>
          </div>
        </div>

        {/* Description Card */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in-up">
          <div className="space-y-4">
            <p className="text-xl text-muted-foreground">
              {tUnderConstruction('subtitle')}
            </p>
            <p className="text-foreground leading-relaxed">
              {description || tUnderConstruction('description')}
            </p>
          </div>
        </Card>

        {/* Progress Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up">
          <Card className="p-4 bg-card/30 border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                {tUnderConstruction('design')}
              </span>
            </div>
          </Card>
          <Card className="p-4 bg-card/30 border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                {tUnderConstruction('development')}
              </span>
            </div>
          </Card>
          <Card className="p-4 bg-card/30 border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                {tUnderConstruction('test')}
              </span>
            </div>
          </Card>
        </div>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full border border-accent/20 animate-pulse-slow">
          <Clock className="w-4 h-4" />
          <span className="font-medium">{tUnderConstruction('comingSoon')}</span>
        </div>

        {/* Back Button */}
        <div className="pt-4">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 animate-fade-in-up bg-transparent',
              buttonVariants({ variant: 'outline' }),
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            {tUnderConstruction('backHome')}
          </Link>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-bounce"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/40 rounded-full animate-bounce"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-secondary/20 rounded-full animate-bounce"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute top-1/4 right-1/5 w-5 h-5 bg-primary/20 rounded-full animate-bounce"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>
      </div>
    </div>
  )
}
