import type { H3Event } from 'h3'
import type { PublicUser, UserPermission, UserRole } from '#shared/types/user'

const rolePermissions = {
  admin: ['account:read:self', 'posts:read', 'users:read'],
  reader: ['account:read:self', 'posts:read'],
} satisfies Record<UserRole, UserPermission[]>

export function getPermissionsForRole(role: UserRole): UserPermission[] {
  return [...rolePermissions[role]]
}

export function hasPermission(user: PublicUser | null, permission: UserPermission) {
  return Boolean(user?.permissions.includes(permission))
}

export async function requireCurrentUser(event: H3Event) {
  const user = await getCurrentUser(event)

  if (!user) {
    throw createError({ status: 401, message: 'Not authenticated.' })
  }

  return user
}

export async function requirePermission(event: H3Event, permission: UserPermission) {
  const user = await requireCurrentUser(event)

  if (!hasPermission(user, permission)) {
    throw createError({ status: 403, message: 'Forbidden.' })
  }

  return user
}
