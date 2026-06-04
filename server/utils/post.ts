import { eq, ilike } from 'drizzle-orm'

export type PostInput = {
  slug: string
  title: string
  excerpt: string
  category: string
  content: string
}

export async function getPostBySlug(slug: string) {
  const db = useDatabase()
  const post = await db.query.posts.findFirst({ where: { slug } })
  return post
}

export async function getPostByTitle(title: string) {
  const db = useDatabase()
  const post = await db.query.posts.findFirst({ where: { title } })
  return post
}

export async function getPostById(id: number) {
  const db = useDatabase()
  const post = await db.query.posts.findFirst({ where: { id } })
  return post
}

export async function getPostsByAuthorId(authorId: number) {
  const db = useDatabase()
  const posts = await db.query.posts.findMany({ where: { authorId } })
  return posts
}

export async function searchPosts(options: {
  q: string
  category?: string
  limit: number
  offset: number
}) {
  const db = useDatabase()
  const q = options.q?.trim()
  const category = options.category?.trim()

  return await db.query.posts.findMany({
    where: {
      OR: [
        { title: { ilike: `%${q}%` } },
        { excerpt: { ilike: `%${q}%` } },
        { content: { ilike: `%${q}%` } },
      ],
      category,
    },
    limit: options.limit,
    offset: options.offset,
    orderBy: { updatedAt: 'desc' },
  })
}

export async function createPost(authorId: number, input: PostInput) {
  const db = useDatabase()
  const now = new Date()

  const createdPosts = await db
    .insert(posts)
    .values({ ...input, authorId, createdAt: now, updatedAt: now })
    .returning()

  return createdPosts[0]
}

export async function updatePost(id: number, input: PostInput) {
  const db = useDatabase()
  const updatedPosts = await db
    .update(posts)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning()

  return updatedPosts[0]
}

export async function deletePost(id: number) {
  const db = useDatabase()
  const deletedPosts = await db.delete(posts).where(eq(posts.id, id)).returning()
  return deletedPosts[0]
}

export async function isPostSlugTaken(slug: string) {
  const db = useDatabase()
  const count = await db.$count(posts, ilike(posts.slug, slug))

  return count > 0
}
