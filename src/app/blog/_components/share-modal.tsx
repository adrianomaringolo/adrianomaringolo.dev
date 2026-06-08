'use client'

import { useLocale } from '@/hooks/use-locale'
import type { BlogPost } from '@/types/blog'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Share2, X } from 'lucide-react'
import { useEffect, useState } from 'react'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function TwitterXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

interface ShareOption {
  id: string
  label: string
  icon: React.ReactNode
  action: () => void
  color: string
}

interface ShareModalProps {
  post: BlogPost
}

export function ShareModal({ post }: ShareModalProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { locale, t } = useLocale()

  const getUrl = () => {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://adrianomaringolo.dev'
    const langParam = locale === 'en-US' ? '?lang=en-US' : ''
    return `${base}/blog/${post.slug}${langParam}`
  }

  const title = post.title[locale] ?? post.title['pt-BR']

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const el = document.createElement('input')
      el.value = getUrl()
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareOptions: ShareOption[] = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <WhatsAppIcon />,
      color: 'hover:text-[#25D366] hover:border-[#25D366]/30 hover:bg-[#25D366]/5',
      action: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(`${title}\n${getUrl()}`)}`
        window.open(url, '_blank', 'noopener,noreferrer')
      },
    },
    {
      id: 'twitter',
      label: 'Twitter / X',
      icon: <TwitterXIcon />,
      color: 'hover:text-foreground hover:border-border hover:bg-muted/40',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getUrl())}`
        window.open(url, '_blank', 'noopener,noreferrer')
      },
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: <LinkedInIcon />,
      color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/5',
      action: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`
        window.open(url, '_blank', 'noopener,noreferrer')
      },
    },
    {
      id: 'email',
      label: 'Email',
      icon: <EmailIcon />,
      color: 'hover:text-primary hover:border-primary/30 hover:bg-primary/5',
      action: () => {
        const subject = encodeURIComponent(title)
        const body = encodeURIComponent(`${title}\n\n${getUrl()}`)
        window.location.href = `mailto:?subject=${subject}&body=${body}`
      },
    },
  ]

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground/50 hover:text-foreground transition-colors"
        aria-label={t('blog.share.trigger')}
      >
        <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden />
        {t('blog.share.trigger')}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            {/* Modal */}
            <motion.div
              key="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="share-modal-title"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 px-4"
            >
              <div className="relative rounded-xl border border-border/60 bg-background p-6 shadow-xl shadow-black/10">
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 text-muted-foreground/40 hover:text-foreground transition-colors"
                  aria-label={t('blog.share.close')}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Title */}
                <p
                  id="share-modal-title"
                  className="text-xs font-mono tracking-[0.2em] text-primary uppercase mb-1"
                >
                  {t('blog.share.title')}
                </p>
                <p className="text-sm text-muted-foreground/60 mb-6 line-clamp-2 pr-6">
                  {title}
                </p>

                {/* Social grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {shareOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { opt.action(); setOpen(false) }}
                      className={`flex items-center gap-2.5 rounded-lg border border-border/40 px-4 py-3 text-sm text-muted-foreground transition-all ${opt.color}`}
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>

                {/* Native share (mobile) */}
                {hasNativeShare && (
                  <button
                    onClick={() => {
                      navigator.share({ title, url: getUrl() }).catch(() => {})
                      setOpen(false)
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-border/40 px-4 py-3 text-sm text-muted-foreground transition-all hover:text-foreground hover:border-border hover:bg-muted/40 mb-3"
                  >
                    <Share2 className="w-4 h-4" aria-hidden />
                    {t('blog.share.moreOptions')}
                  </button>
                )}

                {/* Copy link */}
                <button
                  onClick={copyLink}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-border/40 px-4 py-3 text-sm text-muted-foreground transition-all hover:text-foreground hover:border-border hover:bg-muted/40"
                >
                  <motion.span
                    key={copied ? 'check' : 'copy'}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-primary" aria-hidden />
                        <span className="text-primary">{t('blog.share.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden />
                        {t('blog.share.copyLink')}
                      </>
                    )}
                  </motion.span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
