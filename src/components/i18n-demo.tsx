'use client'

import { useLocale } from '@/hooks/use-locale'
import { useTranslation } from '@/hooks/use-translation'
import { useFormatters } from '@/lib/formatters'

export function I18nDemo() {
  const { locale } = useLocale()
  const { t, tp, tc } = useTranslation()
  const { formatDate, formatCurrency, formatPercentage } = useFormatters(locale)

  const now = new Date()
  const itemCount = 5
  const price = 1299.99
  const percentage = 0.85

  return (
    <div className="p-6 bg-card rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Demonstração de Internacionalização</h3>

      <div className="space-y-3 text-sm">
        <div>
          <strong>Tradução simples:</strong> {t('common.loading')}
        </div>

        <div>
          <strong>Interpolação:</strong> {t('common.welcome', { name: 'Adriano' })}
        </div>

        <div>
          <strong>Pluralização:</strong> {tp('common.itemCount', itemCount)}
        </div>

        <div>
          <strong>Condicional:</strong>{' '}
          {tc(locale === 'pt-BR', 'common.save', 'common.cancel')}
        </div>

        <div>
          <strong>Data formatada:</strong> {formatDate(now)}
        </div>

        <div>
          <strong>Moeda:</strong> {formatCurrency(price)}
        </div>

        <div>
          <strong>Porcentagem:</strong> {formatPercentage(percentage)}
        </div>

        <div>
          <strong>Locale atual:</strong> {locale}
        </div>
      </div>
    </div>
  )
}
