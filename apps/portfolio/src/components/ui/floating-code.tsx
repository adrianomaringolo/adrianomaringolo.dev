'use client'

import { codeSnippets } from '@/data/code-snippets'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingCodeProps {
  count?: number
}

export function FloatingCode({ count = 8 }: FloatingCodeProps) {
  const [codes, setCodes] = useState<
    Array<{
      id: number
      text: string
      x: number
      y: number
      delay: number
      duration: number
    }>
  >([])

  useEffect(() => {
    const newCodes = Array.from({ length: count }, (_, i) => ({
      id: i,
      text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 15 + Math.random() * 10,
    }))
    setCodes(newCodes)
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codes.map((code) => (
        <motion.div
          key={code.id}
          className="absolute text-xs font-mono text-muted-foreground/30 bg-background/5 px-2 py-1 rounded border border-border/20 backdrop-blur-sm"
          style={{
            left: `${code.x}%`,
            top: `${code.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -5, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: code.duration,
            delay: code.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {code.text}
        </motion.div>
      ))}
    </div>
  )
}
