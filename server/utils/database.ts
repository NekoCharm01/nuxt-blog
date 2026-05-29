import { db } from '../db'

export * from '../db/schema'

export function useDatabase() {
  return db
}
