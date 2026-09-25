'use client'

import { useTheme } from '@/hooks/use-theme'
import Giscus from '@giscus/react'

export function GiscusComments() {
  const { resolvedTheme } = useTheme()

  return (
    <Giscus
      repo="adrianomaringolo/adrianomaringolo.dev"
      repoId="R_kgDOM9kVVQ"
      category="Announcements"
      categoryId="DIC_kwDOM9kVVc4C-qm2"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={resolvedTheme === 'dark' ? 'dark_dimmed' : 'light'}
      lang="en"
      loading="lazy"
    />
  )
}
