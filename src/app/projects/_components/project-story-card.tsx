'use client'

import { Card } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ProjectStoryCardProps {
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  title: string
  content: string
  index?: number
}

export function ProjectStoryCard({
  icon: Icon,
  iconColor,
  iconBgColor,
  title,
  content,
  index = 0,
}: ProjectStoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 h-full">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${iconBgColor} rounded-lg`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">{content}</p>
      </Card>
    </motion.div>
  )
}
