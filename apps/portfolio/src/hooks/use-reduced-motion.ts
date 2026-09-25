import { useEffect, useState } from 'react'

/**
 * Hook para detectar preferência de movimento reduzido e dispositivos mobile
 * Retorna true se deve usar animações reduzidas
 */
export function useReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    // Verifica preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setShouldReduceMotion(mediaQuery.matches)

    const handleChange = () => {
      setShouldReduceMotion(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return shouldReduceMotion
}

/**
 * Hook para detectar se é mobile e aplicar otimizações
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

/**
 * Hook combinado que retorna se deve desabilitar animações pesadas
 */
export function useShouldReduceAnimations() {
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  return reducedMotion || isMobile
}
