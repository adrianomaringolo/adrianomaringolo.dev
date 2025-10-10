import type { Project } from '@/types/project'
import { asmMarketingDigital } from './asm-marketing-digital'
import { designSystem } from './design-system'
import { ecommercePlatform } from './ecommerce-platform'
import { gotaDeCura } from './gota-de-cura'
import { taskManagementApp } from './task-management-app'

export const projects: Project[] = [
  asmMarketingDigital,
  gotaDeCura,
  ecommercePlatform,
  taskManagementApp,
  designSystem,
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
export {
  asmMarketingDigital,
  designSystem,
  ecommercePlatform,
  gotaDeCura,
  taskManagementApp,
}
