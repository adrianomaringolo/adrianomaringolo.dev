'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ProjectListSectionProps {
  title: string
  items: string[]
  icon?: LucideIcon
  bgColor?: 'default' | 'muted'
  itemColor?: 'primary' | 'orange' | 'green'
}

export function ProjectListSection({
  title,
  items,
  icon: Icon,
  bgColor = 'default',
  itemColor = 'primary',
}: ProjectListSectionProps) {
  const sectionBgClass = bgColor === 'muted' ? 'bg-muted/30' : ''

  const getItemStyles = () => {
    switch (itemColor) {
      case 'orange':
        return {
          container: 'bg-background/50 hover:bg-background/80 border',
          badge: 'bg-orange-500',
        }
      case 'green':
        return {
          container: 'bg-muted/30 hover:bg-muted/50',
          badge: 'bg-green-500',
        }
      default:
        return {
          container: 'bg-muted/30 hover:bg-muted/50',
          badge: 'bg-primary',
        }
    }
  }

  const itemStyles = getItemStyles()

  return (
    <section className={`py-16 ${sectionBgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-12">
              {Icon && (
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
              )}
              <h2 className="text-3xl font-bold text-center">{title}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-start gap-3 p-4 rounded-lg transition-colors ${itemStyles.container}`}
                >
                  <div
                    className={`flex-shrink-0 w-6 h-6 ${itemStyles.badge} rounded-full flex items-center justify-center text-white text-sm font-semibold mt-0.5`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
