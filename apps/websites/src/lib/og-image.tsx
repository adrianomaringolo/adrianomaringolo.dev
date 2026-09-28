import { createTranslator, type Locale } from '@/lib/i18n'
import { ogSize } from '@/lib/seo'
import { ImageResponse } from 'next/og'

// Same world as the page: paper, ink, a single volt accent (hex, since the
// OG renderer doesn't parse oklch).
export function renderOgImage(locale: Locale) {
  const { t } = createTranslator(locale)

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#f5f6f8',
        color: '#0e1016',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26 }}>
        <div style={{ width: 14, height: 14, borderRadius: 7, background: '#c6f02e', display: 'flex' }} />
        {t('hero.availability')}
      </div>
      <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: '-2.5px', maxWidth: 1000 }}>
        {t('hero.headline')}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #d5d8de',
          paddingTop: 28,
          fontSize: 28,
        }}
      >
        <span style={{ fontWeight: 600 }}>Adriano Maringolo</span>
        <span style={{ fontFamily: 'monospace', color: '#4a4f5c' }}>websites.adrianomaringolo.dev</span>
      </div>
    </div>,
    { ...ogSize },
  )
}
