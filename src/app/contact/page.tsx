'use client'

import type React from 'react'
import { useLocale } from '@/hooks/use-locale'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Button, Input, Label, Textarea, toast, Toaster } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowRight, Check, LayoutDashboard, Lightbulb, Mail, Monitor, Send } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

type ServiceKey = 'website' | 'webapp' | 'consulting'

const serviceIcons: Record<ServiceKey, React.ComponentType<{ className?: string }>> = {
  website: Monitor,
  webapp: LayoutDashboard,
  consulting: Lightbulb,
}

const serviceKeys: ServiceKey[] = ['website', 'webapp', 'consulting']
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function ContactContent() {
  const { t } = useLocale()
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get('service') as ServiceKey | null

  const [selectedService, setSelectedService] = useState<ServiceKey | null>(
    serviceKeys.includes(serviceParam as ServiceKey) ? serviceParam : null,
  )
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ ...formData, projectType: selectedService }),
      })
      const result = await response.json()
      if (result.status === 'success') {
        toast.success(t('contact.successMessage'))
        setFormData({ nome: '', email: '', mensagem: '' })
        setSelectedService(null)
      } else {
        toast.error(t('contact.errorMessage'))
      }
    } catch {
      toast.error(t('contact.errorMessage'))
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contacts = [
    {
      icon: Mail,
      label: 'E-mail',
      value: 'adrianomaringolo@gmail.com',
      href: 'mailto:adrianomaringolo@gmail.com',
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: '/in/adrianomaringolo',
      href: 'https://linkedin.com/in/adrianomaringolo',
    },
    {
      icon: SiGithub,
      label: 'GitHub',
      value: '/adrianomaringolo',
      href: 'https://github.com/adrianomaringolo',
    },
  ]

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-4">
            {t('contact.eyebrow')}
          </p>
          <h1
            className="font-bold tracking-tight text-foreground [font-family:var(--font-geist-sans)] text-wrap-balance"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            {t('contact.title')}
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-lg">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_440px] gap-16 lg:gap-20 items-start">

          {/* Left: project type picker + contact links */}
          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground/50 uppercase font-mono mb-6">
              {t('contact.projectType')}
            </p>

            <div className="divide-y divide-border/40 border-y border-border/40">
              {serviceKeys.map((key, i) => {
                const Icon = serviceIcons[key]
                const isSelected = selectedService === key
                return (
                  <motion.button
                    key={key}
                    type="button"
                    onClick={() => setSelectedService(isSelected ? null : key)}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease }}
                    viewport={{ once: true, amount: 0.2 }}
                    aria-pressed={isSelected}
                    className="group w-full text-left py-6 flex items-center gap-5 cursor-pointer"
                  >
                    <span className="text-xs font-mono text-muted-foreground/25 w-5 shrink-0 tabular-nums select-none">
                      0{i + 1}
                    </span>

                    <div
                      className={[
                        'w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 shrink-0',
                        isSelected
                          ? 'border-primary/50 bg-primary/10 text-primary'
                          : 'border-border/50 text-muted-foreground/50 group-hover:border-primary/50 group-hover:text-primary',
                      ].join(' ')}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={[
                          'text-base font-semibold transition-colors duration-200',
                          isSelected
                            ? 'text-primary'
                            : 'text-foreground group-hover:text-primary',
                        ].join(' ')}
                      >
                        {t(`home.servicePicker.${key}.label`)}
                      </p>
                      <p className="text-sm text-muted-foreground/50 mt-0.5 hidden sm:block">
                        {t(`home.servicePicker.${key}.tagline`)}
                      </p>
                    </div>

                    <div
                      className={[
                        'w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300',
                        isSelected ? 'border-primary bg-primary' : 'border-border/40',
                      ].join(' ')}
                      aria-hidden
                    >
                      {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Contact links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <p className="text-xs tracking-[0.2em] text-muted-foreground/50 uppercase font-mono mb-5">
                {t('contact.connect')}
              </p>
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 py-1.5 text-sm"
                  >
                    <contact.icon
                      className="w-4 h-4 shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors"
                      aria-hidden
                    />
                    <span className="font-medium text-muted-foreground/60 group-hover:text-foreground transition-colors">
                      {contact.label}
                    </span>
                    <span className="text-muted-foreground/35 group-hover:text-muted-foreground/55 transition-colors">
                      {contact.value}
                    </span>
                    <ArrowRight
                      className="w-3 h-3 ml-auto shrink-0 text-muted-foreground/20 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      aria-hidden
                    />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="nome" className="text-sm font-medium text-foreground">
                  {t('contact.name')}
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t('contact.email')}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="mensagem" className="text-sm font-medium text-foreground">
                  {t('contact.message')}
                </Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={7}
                  className="mt-2"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:opacity-90"
                isLoading={loading}
              >
                <Send className="h-4 w-4 mr-2" aria-hidden />
                {t('contact.send')}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function ContatoPage() {
  return (
    <>
      <Toaster expand />
      <Suspense>
        <ContactContent />
      </Suspense>
    </>
  )
}
