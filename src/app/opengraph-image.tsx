import { readFileSync } from 'fs'
import { ImageResponse } from 'next/og'
import path from 'path'

export const alt = 'Adriano Maringolo — Desenvolvedor Web'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  const logoBuffer = readFileSync(path.join(process.cwd(), 'public/logo.png'))
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090b',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Subtle grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          display: 'flex',
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 400,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, transparent 70%)',
          display: 'flex',
        }}
      />

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
          zIndex: 1,
        }}
      >
        {/* Logo card */}
        <div
          style={{
            width: 140,
            height: 140,
            background: '#ffffff',
            borderRadius: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 60px rgba(6,182,212,0.25)',
          }}
        >
          <img src={logoSrc} width={96} height={96} style={{ objectFit: 'contain' }} />
        </div>

        {/* Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            Adriano Maringolo
          </span>
          <span
            style={{
              fontSize: 26,
              color: '#06b6d4',
              letterSpacing: '0.05em',
              fontWeight: 400,
            }}
          >
            adrianomaringolo.dev
          </span>
        </div>
      </div>
    </div>,
    { ...size },
  )
}
