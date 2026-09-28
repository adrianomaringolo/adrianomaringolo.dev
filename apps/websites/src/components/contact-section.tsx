'use client'

import { useLocale } from '@/hooks/use-locale'
import { packageKeys, useDemo, type PackageKey } from '@/hooks/use-demo'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Check, MessageCircle, Plus, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

export function ContactSection() {
  const { t, raw } = useLocale()
  const { name, selectedPackage, setSelectedPackage, selectedAddons, toggleAddon } = useDemo()
  const addons = raw<{ key: string; title: string }[]>('packages.addons.items') ?? []
  const addonTitles = addons.filter((a) => selectedAddons.includes(a.key)).map((a) => a.title)
  const [status, setStatus] = useState<Status>('idle')

  const whatsappHref = buildWhatsappHref(whatsappNumber, t, selectedPackage, addonTitles)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      package: selectedPackage,
      addons: addonTitles,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement).value,
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

  const field =
    'w-full rounded-lg border border-stage-line bg-stage-raised px-3.5 py-3 text-[15px] text-stage-ink outline-none transition-colors placeholder:text-stage-soft/60 focus:border-volt'
  const label = 'mb-2 block text-sm text-stage-soft'
  const headline = name.trim()
    ? t('contact.headlineNamed').replace('{name}', name.trim())
    : t('contact.headline')

  return (
    <section
      id="contato"
      data-ground="stage"
      aria-labelledby="contact-heading"
      className="on-stage bg-stage px-4 py-24 text-stage-ink [caret-color:var(--volt)] sm:px-6 lg:px-10 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="flex flex-col">
          <h2
            id="contact-heading"
            className="max-w-[14ch] text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.0] font-semibold tracking-[-0.035em] break-words text-balance"
          >
            {headline}
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-stage-soft">{t('contact.subline')}</p>

          <div className="mt-10 border-t border-stage-line pt-8 lg:mt-auto">
            <p className="text-sm text-stage-soft">{t('contact.whatsappPrompt')}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 inline-flex items-center gap-2.5 text-xl font-medium tracking-tight underline decoration-stage-line underline-offset-[6px] hover:decoration-volt"
            >
              <MessageCircle className="h-5 w-5 text-volt" />
              {t('contact.whatsapp')}
              <ArrowUpRight className="h-5 w-5 text-stage-soft transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot: hidden from people and assistive tech; bots that fill it get dropped by /api/contact. */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={label}>
                {t('contact.form.name')}
              </label>
              <input id="name" name="name" required autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="email" className={label}>
                {t('contact.form.email')}
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={field} />
            </div>
          </div>

          <fieldset>
            <legend className={label}>{t('contact.form.package')}</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {packageKeys.map((key) => {
                const checked = selectedPackage === key
                return (
                  <label
                    key={key}
                    className={cn(
                      'flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-3 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-volt',
                      checked
                        ? 'border-volt bg-volt text-ink'
                        : 'border-stage-line bg-stage-raised text-stage-ink hover:border-stage-soft',
                    )}
                  >
                    <input
                      type="radio"
                      name="package"
                      value={key}
                      checked={checked}
                      onChange={() => setSelectedPackage(key)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                        checked ? 'border-ink bg-ink' : 'border-stage-soft',
                      )}
                    >
                      {checked && <span className="h-1.5 w-1.5 rounded-full bg-volt" />}
                    </span>
                    {t(`packages.${key}.name`)}
                  </label>
                )
              })}
            </div>
          </fieldset>

          {addons.length > 0 && (
            <fieldset>
              <legend className={label}>{t('contact.form.addons')}</legend>
              <div className="flex flex-wrap gap-2">
                {addons.map((addon) => {
                  const checked = selectedAddons.includes(addon.key)
                  return (
                    <label
                      key={addon.key}
                      className={cn(
                        'flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-volt',
                        checked
                          ? 'border-stage-ink bg-stage-ink text-stage'
                          : 'border-stage-line bg-stage-raised text-stage-ink hover:border-stage-soft',
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddon(addon.key)}
                        className="sr-only"
                      />
                      {checked ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      {addon.title}
                    </label>
                  )
                })}
              </div>
            </fieldset>
          )}

          <div>
            <label htmlFor="message" className={label}>
              {t('contact.form.message')}
            </label>
            <textarea id="message" name="message" rows={5} required className={cn(field, 'resize-y')} />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-volt px-6 py-3.5 text-[15px] font-medium text-ink transition-[background-color,transform,opacity] duration-200 ease-out-expo hover:bg-volt-deep active:scale-[0.98] disabled:opacity-60 sm:w-auto"
          >
            {status === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
            <Send className="h-4 w-4" />
          </button>

          {status === 'success' && (
            <p role="status" className="flex items-center gap-2 text-sm text-volt">
              <Check className="h-4 w-4" />
              {t('contact.form.success')}
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="text-sm text-[oklch(0.75_0.15_27)]">
              {t('contact.form.error')}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function buildWhatsappHref(
  number: string,
  t: (key: string) => string,
  selectedPackage: PackageKey | '',
  addonTitles: string[],
): string {
  let message = selectedPackage
    ? t('contact.whatsappMessage').replace('{package}', t(`packages.${selectedPackage}.name`))
    : t('contact.whatsappMessageGeneric')
  if (addonTitles.length) message += t('contact.whatsappAddons').replace('{addons}', addonTitles.join(', '))
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
