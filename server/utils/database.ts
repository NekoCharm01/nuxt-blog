import { neon } from '@netlify/neon'
import type { BlogPost } from '#shared/types/blog'
import type { PublicUser } from '#shared/types/user'

export type StoredUser = PublicUser & {
  passwordHash: string
}

export type BlogPostRow = Omit<BlogPost, 'content' | 'readingTime'> & {
  readingTime: string
  content: string
}

export type UserRow = Omit<PublicUser, 'permissions'> & {
  password_hash: string
}

let database: ReturnType<typeof neon> | null = null

export function useDatabase() {
  database ??= neon()

  return database
}

export function mapBlogPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    readingTime: row.readingTime,
    category: row.category,
    content: JSON.parse(row.content) as string[],
  }
}

export function mapUser(row: UserRow): StoredUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    permissions: getPermissionsForRole(row.role),
    passwordHash: row.password_hash,
    createdAt: row.createdAt,
  }
}
