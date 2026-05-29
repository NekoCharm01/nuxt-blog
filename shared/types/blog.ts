export type Post = {
  id: number
  authorId: number
  slug: string
  title: string
  excerpt: string
  category: string
  content: string[]
  createdAt: Date
  updatedAt: Date
}
