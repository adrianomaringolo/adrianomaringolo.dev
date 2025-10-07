import type { Locale } from './i18n'

// Date formatting utilities
export function formatDate(date: Date, locale: Locale, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date)
}

export function formatRelativeTime(date: Date, locale: Locale): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const now = new Date()
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000)
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ] as const

  for (const interval of intervals) {
    const count = Math.floor(Math.abs(diffInSeconds) / interval.seconds)
    if (count >= 1) {
      return rtf.format(diffInSeconds < 0 ? -count : count, interval.label)
    }
  }

  return rtf.format(0, 'second')
}

// Number formatting utilities
export function formatNumber(number: number, locale: Locale, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale, options).format(number)
}

export function formatCurrency(amount: number, locale: Locale, currency = 'BRL'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatPercentage(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value)
}

// Utility hook for formatters
export function useFormatters(locale: Locale) {
  return {
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => 
      formatDate(date, locale, options),
    formatRelativeTime: (date: Date) => 
      formatRelativeTime(date, locale),
    formatNumber: (number: number, options?: Intl.NumberFormatOptions) => 
      formatNumber(number, locale, options),
    formatCurrency: (amount: number, currency?: string) => 
      formatCurrency(amount, locale, currency),
    formatPercentage: (value: number) => 
      formatPercentage(value, locale),
  }
}