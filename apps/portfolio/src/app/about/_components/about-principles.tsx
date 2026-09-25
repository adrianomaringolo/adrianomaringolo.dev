'use client'

import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'
import {
  BookOpen,
  MessageCircle,
  RefreshCw,
  Settings,
  Smartphone,
  TrendingDown,
  Users,
  Zap,
} from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const principles = [
  { key: 'responsiveness',     Icon: Smartphone     },
  { key: 'userExperience',     Icon: Users          },
  { key: 'performance',        Icon: Zap            },
  { key: 'communication',      Icon: MessageCircle  },
  { key: 'feedback',           Icon: RefreshCw      },
  { key: 'maintenance',        Icon: Settings       },
  { key: 'continuousLearning', Icon: BookOpen       },
  { key: 'costReduction',      Icon: TrendingDown   },
] as const

export function AboutPrinciples() {
  const { t } = useLocale()

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0 }}
          className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-14"
        >
          {t('about.howIWork')}
        </motion.p>

        <ul className="divide-y divide-border/40 border-y border-border/40">
          {principles.map(({ key, Icon }, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-[32px_1fr] md:grid-cols-[48px_220px_1fr] gap-4 md:gap-8 py-7 items-start"
            >
              <span className="text-xs font-mono text-muted-foreground/25 pt-1 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md border border-border/50 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5 text-primary/70" />
                </div>
                <p className="text-base font-semibold text-foreground leading-snug pt-0.5">
                  {t(`about.principles.${key}`)}
                </p>
              </div>

              <p className="text-sm text-muted-foreground/60 leading-relaxed col-start-2 md:col-start-3">
                {t(`about.principles.${key}Description`)}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
