import type { Project } from '@/types/project'
import { asmMarketingDigital } from './asm-marketing-digital'
import { buildgridUI } from './buildgrid-ui'
import { gotaDeCura } from './gota-de-cura'
import { portalDaMorada } from './portal-da-morada'

export const projects: Project[] = [
  asmMarketingDigital,
  buildgridUI,
  gotaDeCura,
  portalDaMorada,
]

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
export { asmMarketingDigital, buildgridUI, gotaDeCura, portalDaMorada }
