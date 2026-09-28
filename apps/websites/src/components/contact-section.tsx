'use client'

import { useLocale } from '@/hooks/use-locale'
import { MessageCircle, Send } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'

const packageKeys = ['site', 'landing', 'webapp'] as const
type PackageKey = (typeof packageKeys)[number]
type Status = 'idle' | 'submitting' | 'success' | 'error'

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

export function ContactSection() {
  const { t } = useLocale()
  const searchParams = useSearchParams()
  const preselected = searchParams.get('pacote')
  const initialPackage = packageKeys.includes(preselected as PackageKey)
    ? (preselected as PackageKey)
    : ''

  const [status, setStatus] = useState<Status>('idle')
  const [selectedPackage, setSelectedPackage] = useState<PackageKey | ''>(initialPackage)

  const whatsappHref = buildWhatsappHref(whatsappNumber, t, selectedPackage)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      package: selectedPackage,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contato" className="border-t border-border/60 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {t('contact.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('contact.headline')}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{t('contact.subline')}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-start">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                {t('contact.form.name')}
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                {t('contact.form.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="package" className="mb-1.5 block text-sm font-medium text-foreground">
                {t('contact.form.package')}
              </label>
              <select
                id="package"
                name="package"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value as PackageKey | '')}
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
              >
                <option value="">{t('contact.form.packagePlaceholder')}</option>
                {packageKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(`packages.${key}.name`)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {status === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
            </button>

            {status === 'success' && (
              <p role="status" className="text-sm text-emerald-600 dark:text-emerald-400">
                {t('contact.form.success')}
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                {t('contact.form.error')}
              </p>
            )}
          </form>

          <div aria-hidden className="hidden h-full w-px bg-border md:block" />

          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-muted/40 p-8 text-center">
            <MessageCircle className="h-8 w-8 text-primary" />
            <p className="text-sm text-muted-foreground">{t('contact.whatsappPrompt')}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              {t('contact.whatsapp')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function buildWhatsappHref(
  number: string,
  t: (key: string) => string,
  selectedPackage: PackageKey | '',
): string {
  const packageName = selectedPackage ? t(`packages.${selectedPackage}.name`) : ''
  const template = t('contact.whatsappMessage')
  const message = packageName ? template.replace('{package}', packageName) : template.replace(' {package}', '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
