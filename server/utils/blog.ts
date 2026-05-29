import type { BlogPost } from '#shared/types/blog'

type BlogPostRow = Omit<BlogPost, 'content' | 'readingTime'> & {
  readingTime: string
  content: string
}

export async function getBlogPosts() {
  const rows = await useDatabase()<BlogPostRow[]>`
    SELECT
      slug,
      title,
      excerpt,
      date,
      reading_time AS "readingTime",
      category,
      content
    FROM blog_posts
    ORDER BY sort_order ASC, date DESC
  `

  return rows.map(mapBlogPost)
}

export async function getBlogPostBySlug(slug: string) {
  const [row] = await useDatabase()<BlogPostRow[]>`
    SELECT
      slug,
      title,
      excerpt,
      date,
      reading_time AS "readingTime",
      category,
      content
    FROM blog_posts
    WHERE slug = ${slug}
  `

  return row ? mapBlogPost(row) : null
}
