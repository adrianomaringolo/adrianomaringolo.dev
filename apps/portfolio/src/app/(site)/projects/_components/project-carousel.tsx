'use client'

import { useTranslation } from '@/hooks/use-translation'
import { Button } from 'buildgrid-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ProjectCarouselProps {
  images: string[]
  title: string
  thumbnail: string
}

export function ProjectCarousel({ images, title, thumbnail }: ProjectCarouselProps) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Combine thumbnail with images, ensuring no duplicates
  const allImages = [thumbnail, ...images.filter((img) => img !== thumbnail)]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevImage()
      } else if (event.key === 'ArrowRight') {
        nextImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Don't show carousel if there's only one image
  if (allImages.length <= 1) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl mb-16"
      >
        <Image
          src={allImages[0]}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-auto"
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative rounded-2xl overflow-hidden shadow-2xl mb-16"
    >
      {/* Main Image Container */}
      <div className="relative aspect-[2/1] bg-muted">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={allImages[currentIndex]}
              alt={`${title} - Imagem ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={prevImage}
            className="bg-background/80 hover:bg-background/90 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={nextImage}
            className="bg-background/80 hover:bg-background/90 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
          {currentIndex + 1} / {allImages.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="bg-background/95 backdrop-blur-sm p-4">
        <div className="flex gap-2 justify-center overflow-x-auto">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
