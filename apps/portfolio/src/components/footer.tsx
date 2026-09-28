'use client'

import { useLocale } from '@/hooks/use-locale'

export const Footer = () => {
  const { t } = useLocale()

  return (
    <footer className="absolute bottom-0 w-full text-center py-6 text-sm text-muted-foreground ">
      &copy; {new Date().getFullYear()} Adriano Maringolo Desenvolvimento de Software.{' '}
      {t('footer.rights')}
    </footer>
  )
}
