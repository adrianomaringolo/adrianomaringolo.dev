import React from 'react'

/**
 * Utility function to safely unwrap Next.js 15 params
 * @param params - The params Promise from Next.js
 * @returns The unwrapped params object
 */
export function useParams<T>(params: Promise<T>): T {
  return React.use(params)
}

/**
 * Type helper for Next.js 15 page props with async params
 */
export interface PageProps<T = Record<string, string>> {
  params: Promise<T>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

/**
 * Type helper for Next.js 15 layout props with async params
 */
export interface LayoutProps<T = Record<string, string>> {
  children: React.ReactNode
  params: Promise<T>
}

/**
 * Example usage in a page component:
 *
 * interface MyPageProps extends PageProps<{ slug: string }> {}
 *
 * export default function MyPage({ params }: MyPageProps) {
 *   const { slug } = useParams(params)
 *   // Use slug safely
 * }
 */
