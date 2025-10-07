'use client'

import { useLocale } from '@/hooks/use-locale'
import { LoadingSpinner } from './loading-spinner'

interface LocaleLoadingProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function LocaleLoading({ children, fallback }: LocaleLoadingProps) {
  const { isLoading } = useLocale()

  if (isLoading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}