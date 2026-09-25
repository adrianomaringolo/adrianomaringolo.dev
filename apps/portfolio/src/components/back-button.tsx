'use client'

import { useLocale } from '@/hooks/use-locale'
import { Button } from 'buildgrid-ui'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()
  const { t } = useLocale()

  return (
    <Button variant="ghost" onClick={() => router.back()} className="group">
      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
      {t('blog.backToBlog')}
    </Button>
  )
}
