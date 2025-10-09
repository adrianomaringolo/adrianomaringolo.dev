'use client'

import { Badge } from 'buildgrid-ui'
import { CheckCircle } from 'lucide-react'

interface RealProjectBadgeProps {
  locale: 'pt-BR' | 'en-US'
  className?: string
}

export function RealProjectBadge({ locale, className }: RealProjectBadgeProps) {
  return (
    <Badge
      className={`bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 ${className}`}
    >
      <CheckCircle className="w-3 h-3 mr-1" />
      {locale === 'pt-BR' ? 'Projeto Real' : 'Real Project'}
    </Badge>
  )
}
