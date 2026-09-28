'use client'

import { useLocale } from '@/hooks/use-locale'
import { ArrowUpRight } from 'lucide-react'

const INSTAGRAM_URL = 'https://www.instagram.com/adrianomaringolo.dev/'

export function InstagramSection() {
  const { t, tList } = useLocale()

  return (
    <section
      id="instagram"
      data-ground="stage"
      aria-labelledby="instagram-heading"
      className="on-stage relative isolate overflow-hidden bg-stage px-4 py-24 text-stage-ink sm:px-6 lg:px-10 lg:py-32"
    >
      {/* The feed itself is the backdrop; the ink wash keeps the copy on the left readable. */}
      <img
        src="/images/instagram-feed.webp"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-stage/90 lg:bg-transparent lg:bg-gradient-to-r lg:from-stage lg:from-35% lg:via-stage/80 lg:to-stage/30"
      />

      <div className="mx-auto max-w-7xl">
        <div className="max-w-[36rem]">
          <p className="font-mono text-sm text-volt">@adrianomaringolo.dev</p>
          <h2
            id="instagram-heading"
            className="mt-5 text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
          >
            {t('instagram.headline')}
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-stage-soft">{t('instagram.subline')}</p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {tList('instagram.topics').map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-stage-line bg-stage/60 px-3.5 py-1.5 text-sm text-stage-ink backdrop-blur-sm"
              >
                {topic}
              </li>
            ))}
          </ul>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-volt px-5 py-3 text-[15px] font-medium text-ink transition-[background-color,transform] duration-200 ease-out-expo hover:bg-volt-deep active:scale-[0.98]"
          >
            {t('instagram.cta')}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
