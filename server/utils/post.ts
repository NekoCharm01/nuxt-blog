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
