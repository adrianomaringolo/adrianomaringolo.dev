'use client'

import { Card } from 'buildgrid-ui'
import { ImageIcon } from 'lucide-react'

interface ProjectPlaceholderProps {
  width?: number
  height?: number
  className?: string
  title?: string
}

export function ProjectPlaceholder({
  width = 400,
  height = 240,
  className = '',
  title = 'Project Image',
}: ProjectPlaceholderProps) {
  return (
    <Card
      className={`flex items-center justify-center bg-muted/50 ${className}`}
      style={{ width, height }}
    >
      <div className="text-center text-muted-foreground">
        <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p className="text-sm">{title}</p>
      </div>
    </Card>
  )
}
