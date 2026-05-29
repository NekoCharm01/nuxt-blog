import type { PublicUser } from '#shared/types/user'
import type { UserRow } from '~~/server/utils/database'

export default defineEventHandler(async (event): Promise<PublicUser[]> => {
  await requirePermission(event, 'users:read')

  const rows = await useDatabase()<UserRow[]>`
    SELECT id, name, email, role, password_hash, created_at AS "createdAt"
    FROM users
    ORDER BY created_at ASC
  `

  return rows.map((row) => {
    const { passwordHash: _passwordHash, ...user } = mapUser(row)

    return user
  })
})
