import { getFormattedExperience, getYearsOfExperience } from '@/lib/experience'

/**
 * Hook para obter informações sobre anos de experiência
 */
export function useExperience() {
  const years = getYearsOfExperience()
  const formatted = getFormattedExperience()

  return {
    years,
    formatted,
  }
}
