import { BlogListClient } from '@/app/blog/_components/blog-list-client'
import { getBlogPosts } from '@/lib/blog'

export default function BlogPage() {
  const posts = getBlogPosts()
  return <BlogListClient posts={posts} />
}
