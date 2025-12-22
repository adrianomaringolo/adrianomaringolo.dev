'use client'

import { useLocale } from '@/hooks/use-locale'
import { Button } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import { useRef, useState } from 'react'

interface DownloadCVButtonProps {
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

export function DownloadCVButton({
  variant = 'outline',
  size = 'default',
  className = '',
}: DownloadCVButtonProps) {
  const { t } = useLocale()
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleDownload = () => {
    // Criar um link temporário para download
    const link = document.createElement('a')
    link.href = '/documents/CV_Adriano_Maringolo_Senior_Software_Engineer.pdf'
    link.download = 'CV_Adriano_Maringolo_Senior_Software_Engineer.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        ref={ref}
        variant={variant}
        size={size}
        onClick={handleDownload}
        className={`group relative overflow-hidden ${className}`}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
        <FileText className="w-4 h-4 mr-2 relative z-10 group-hover:animate-pulse" />
        <span className="relative z-10">{t('common.downloadCV')}</span>
        <Download className="w-4 h-4 ml-2 relative z-10 transition-transform group-hover:translate-y-0.5" />
      </Button>
    </motion.div>
  )
}
