'use client'

import { OptimizedImage } from './optimized-image'

interface ProjectImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function ProjectImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: ProjectImageProps) {
  // Determinar fallback baseado no tipo de projeto
  const getFallbackImage = (originalSrc: string) => {
    if (originalSrc.includes('ecommerce') || originalSrc.includes('shop')) {
      return '/projects/placeholder-ecommerce.svg'
    }
    if (originalSrc.includes('task') || originalSrc.includes('management')) {
      return '/projects/placeholder-taskapp.svg'
    }
    if (originalSrc.includes('design') || originalSrc.includes('system')) {
      return '/projects/placeholder-designsystem.svg'
    }
    return '/projects/placeholder-ecommerce.svg' // fallback padrão
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      fallbackSrc={getFallbackImage(src)}
      priority={priority}
    />
  )
}
