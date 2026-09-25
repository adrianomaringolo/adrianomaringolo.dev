import type { Project } from '@/types/project'
import { asmMarketingDigital } from './asm-marketing-digital'
import { buildgridUI } from './buildgrid-ui'
import { golaserBaraoGeraldo } from './golaser-barao-geraldo'
import { gotaDeCura } from './gota-de-cura'
import { portalDaMorada } from './portal-da-morada'
import { reactHtmlContentEditor } from './react-html-content-editor'
import { symproLanding } from './sympro-landing'
import { taskmate } from './taskmate'
import { yaneLeitao } from './yane-leitao'

const allProjects: Project[] = [
  asmMarketingDigital,
  buildgridUI,
  gotaDeCura,
  portalDaMorada,
  symproLanding,
  yaneLeitao,
  golaserBaraoGeraldo,
  reactHtmlContentEditor,
  taskmate,
]

// Most recent first, by start date
export const projects: Project[] = [...allProjects].sort((a, b) =>
  b.startDate.localeCompare(a.startDate),
)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter((project) => project.category === category)
}

// Export individual projects
export {
  asmMarketingDigital,
  buildgridUI,
  golaserBaraoGeraldo,
  gotaDeCura,
  portalDaMorada,
  reactHtmlContentEditor,
  symproLanding,
  taskmate,
  yaneLeitao,
}
