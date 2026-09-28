// Configuração centralizada para URLs de imagens
export const IMAGE_DOMAINS = {
  UNSPLASH: 'images.unsplash.com',
  PLACEHOLDER: 'via.placeholder.com',
  PICSUM: 'picsum.photos',
} as const

// URLs de fallback para diferentes tipos de projeto
export const FALLBACK_IMAGES = {
  ecommerce: '/projects/placeholder-ecommerce.svg',
  taskapp: '/projects/placeholder-taskapp.svg',
  designsystem: '/projects/placeholder-designsystem.svg',
  default: '/projects/placeholder-ecommerce.svg',
} as const

// Função para gerar URLs otimizadas do Unsplash
export function getUnsplashUrl(
  imageId: string,
  width: number,
  height: number,
  quality = 80,
) {
  return `https://images.unsplash.com/${imageId}?w=${width}&h=${height}&fit=crop&crop=center&q=${quality}`
}

// Função para detectar o tipo de projeto baseado na URL ou slug
export function getProjectFallback(src: string): string {
  if (src.includes('ecommerce') || src.includes('shop') || src.includes('store')) {
    return FALLBACK_IMAGES.ecommerce
  }
  if (
    src.includes('task') ||
    src.includes('management') ||
    src.includes('productivity')
  ) {
    return FALLBACK_IMAGES.taskapp
  }
  if (src.includes('design') || src.includes('system') || src.includes('component')) {
    return FALLBACK_IMAGES.designsystem
  }
  return FALLBACK_IMAGES.default
}

// Configuração de tamanhos responsivos
export const IMAGE_SIZES = {
  thumbnail: { width: 400, height: 240 },
  hero: { width: 1200, height: 600 },
  screenshot: { width: 1200, height: 800 },
  avatar: { width: 48, height: 48 },
} as const
