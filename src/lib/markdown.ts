import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "posts")

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  image: string
  content: string
}

export function getAllPosts(locale = "pt-BR"): BlogPost[] {
  try {
    console.log("[v0] Getting all posts for locale:", locale)
    console.log("[v0] Posts directory:", postsDirectory)

    // Verifica se o diretório existe
    if (!fs.existsSync(postsDirectory)) {
      console.log("[v0] Posts directory does not exist")
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    console.log("[v0] Found files:", fileNames)

    // Filtra arquivos por locale
    const localeFiles = fileNames.filter((name) => name.endsWith(`.${locale}.md`))
    console.log("[v0] Locale files:", localeFiles)

    const allPostsData = localeFiles.map((fileName) => {
      // Remove a extensão do arquivo para obter o slug
      const slug = fileName.replace(`.${locale}.md`, "")

      // Lê o arquivo markdown
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Usa gray-matter para parsear o frontmatter
      const matterResult = matter(fileContents)

      return {
        slug,
        content: matterResult.content,
        ...matterResult.data,
      } as BlogPost
    })

    // Ordena os posts por data (mais recente primeiro)
    const sortedPosts = allPostsData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    console.log("[v0] Processed posts:", sortedPosts.length)
    return sortedPosts
  } catch (error) {
    console.error("[v0] Error getting all posts:", error)
    return []
  }
}

export function getPostBySlug(slug: string, locale = "pt-BR"): BlogPost | null {
  try {
    console.log("[v0] Getting post by slug:", slug, "locale:", locale)

    const fileName = `${slug}.${locale}.md`
    const fullPath = path.join(postsDirectory, fileName)

    console.log("[v0] Looking for file:", fullPath)

    if (!fs.existsSync(fullPath)) {
      console.log("[v0] Post file does not exist")
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    const post = {
      slug,
      content: matterResult.content,
      ...matterResult.data,
    } as BlogPost

    console.log("[v0] Found post:", post.title)
    return post
  } catch (error) {
    console.error("[v0] Error getting post by slug:", error)
    return null
  }
}

export function getAllPostSlugs(locale = "pt-BR"): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const localeFiles = fileNames.filter((name) => name.endsWith(`.${locale}.md`))

    return localeFiles.map((fileName) => fileName.replace(`.${locale}.md`, ""))
  } catch (error) {
    console.error("[v0] Error getting all post slugs:", error)
    return []
  }
}
