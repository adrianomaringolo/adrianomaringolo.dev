/**
 * Calcula os anos de experiência baseado no ano de início (2009)
 * @returns Número de anos de experiência
 */
export function getYearsOfExperience(): number {
  const startYear = 2009
  const currentYear = new Date().getFullYear()
  return currentYear - startYear
}

/**
 * Retorna os anos de experiência formatados com "+"
 * @returns String formatada (ex: "15+")
 */
export function getFormattedExperience(): string {
  return `${getYearsOfExperience()}+`
}
