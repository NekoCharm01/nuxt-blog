import { defineRelations } from 'drizzle-orm'
import { timestamp, pgTable, integer, text, index, uniqueIndex, pgEnum } from 'drizzle-orm/pg-core'

export const posts = pgTable(
  'posts',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    authorId: integer()
      .references(() => users.id)
      .notNull(),
    slug: text().notNull().unique(),
    title: text().notNull(),
    excerpt: text().notNull(),
    category: text().notNull(),
    content: text().notNull(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),
  },
  (table) => [
    uniqueIndex('slug_idx').on(table.slug),
    index('author_idx').on(table.authorId),
    index('title_idx').on(table.title),
  ]
)

export const userRole = pgEnum('user_roles', ['admin', 'editor', 'viewer'])

export const users = pgTable(
  'users',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    email: text().notNull().unique(),
    passwordHash: text().notNull(),
    createdAt: timestamp().notNull(),
    role: userRole().notNull(),
  },
  (table) => [uniqueIndex('email_idx').on(table.email), index('name_idx').on(table.name)]
)

export const relations = defineRelations({ users, posts }, (r) => ({
  posts: {
    author: r.one.users({ from: r.posts.authorId, to: r.users.id }),
  },
  users: {
    posts: r.many.posts({ from: r.users.id, to: r.posts.authorId }),
  },
}))
