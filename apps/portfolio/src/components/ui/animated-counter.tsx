'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  decimals?: number
  delay?: number
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2.5,
  className = '',
  decimals = 0,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationId: number

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp + delay * 1000
      }

      if (timestamp < startTime) {
        animationId = requestAnimationFrame(animate)
        return
      }

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      // Easing function (easeOutExpo)
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const currentValue = easedProgress * value

      setDisplayValue(currentValue)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isInView, value, duration, delay])

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    return Math.floor(num).toLocaleString()
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {
              opacity: 0,
              y: 20,
              scale: 0.8,
            }
      }
      transition={{
        duration: 0.6,
        delay: delay + 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </motion.span>
  )
}
