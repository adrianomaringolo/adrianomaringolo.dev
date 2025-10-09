'use client'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Card } from 'buildgrid-ui'
import { ArrowLeft } from 'lucide-react'

export default function ProjectLoading() {
  return (
    <div className="min-h-screen pt-20">
      {/* Back Button Skeleton */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* Badges */}
            <div className="flex justify-center gap-2 mb-4">
              <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
              <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
            </div>

            {/* Title */}
            <div className="h-12 w-96 bg-muted animate-pulse rounded mx-auto mb-6" />

            {/* Description */}
            <div className="space-y-2 mb-8">
              <div className="h-4 w-full max-w-3xl bg-muted animate-pulse rounded mx-auto" />
              <div className="h-4 w-2/3 bg-muted animate-pulse rounded mx-auto" />
            </div>

            {/* Meta info */}
            <div className="flex justify-center gap-6 mb-8">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <div className="h-10 w-24 bg-muted animate-pulse rounded" />
              <div className="h-10 w-28 bg-muted animate-pulse rounded" />
            </div>
          </div>

          {/* Hero Image Skeleton */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-16">
            <div className="w-full h-96 bg-muted animate-pulse" />
          </div>
        </div>
      </section>

      {/* Story Section Skeleton */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-8 w-64 bg-muted animate-pulse rounded mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-muted animate-pulse rounded-lg" />
                    <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                    <div className="h-4 w-4/5 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Loading Spinner */}
      <div className="flex justify-center py-16">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando projeto...</p>
        </div>
      </div>
    </div>
  )
}
