'use client'

import { useScrollDirection } from '@/hooks/use-scroll-direction'
import { motion, useScroll } from 'framer-motion'
import { type RefObject } from 'react'

interface ReadingProgressBarProps {
  targetRef: RefObject<HTMLElement | null>
}

// Progress tracks targetRef (the article body), not the whole document —
// scrolling through comments/related posts shouldn't count as "reading
// progress". 0 when the target's top reaches the viewport top, 1 when its
// bottom reaches the viewport bottom.
export function ReadingProgressBar({ targetRef }: ReadingProgressBarProps) {
  const { scrollDirection, isAtTop } = useScrollDirection()
  const headerVisible = isAtTop || scrollDirection === 'up'

  const { scrollYProgress } = useScroll({
    target: targetRef as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      className="fixed left-0 right-0 z-40 h-[3px] bg-transparent transition-[top] duration-300 ease-in-out"
      style={{ top: headerVisible ? 64 : 0 }}
      aria-hidden="true"
    >
      <motion.div className="h-full bg-primary origin-left" style={{ scaleX: scrollYProgress }} />
    </div>
  )
}
