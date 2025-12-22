'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function GradientMesh() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
        }}
        animate={{
          x: mousePosition.x * 4,
          y: mousePosition.y * 4,
          scale: [1, 1.2, 1],
        }}
        transition={{
          x: { type: 'spring', stiffness: 50, damping: 30 },
          y: { type: 'spring', stiffness: 50, damping: 30 },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)',
          right: 0,
          bottom: 0,
        }}
        animate={{
          x: -mousePosition.x * 2,
          y: -mousePosition.y * 2,
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          x: { type: 'spring', stiffness: 30, damping: 30 },
          y: { type: 'spring', stiffness: 30, damping: 30 },
          scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-25 blur-2xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--muted)) 0%, transparent 70%)',
          top: '20%',
          right: '20%',
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.3, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Mesh overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, hsl(var(--muted)) 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, hsl(var(--primary)) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  )
}
