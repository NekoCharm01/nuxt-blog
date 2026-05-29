import { drizzle } from 'drizzle-orm/netlify-db'
import { relations } from './schema'

export const db = drizzle({ relations, casing: 'snake_case' })
