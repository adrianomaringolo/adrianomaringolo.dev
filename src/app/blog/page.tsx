'use client'

import { UnderConstructionPage } from '@/components/under-construction-page'
import { useLocale } from '@/hooks/use-locale'

export default function ProjetosPage() {
  const { t } = useLocale()
  const tBlog = (tag: string) => t(`blog.${tag}`)

  return (
    <UnderConstructionPage
      title={tBlog('title')}
      underConstruction={tBlog('underConstruction')}
      description={tBlog('underConstructionDescription')}
      icon="💡"
    />
  )
}
