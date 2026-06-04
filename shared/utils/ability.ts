import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { UserRole, UserPermission } from '#shared/types/user'

export function defineAbilityFor(user: { id?: number; role: UserRole }) {
  const { can, build } = new AbilityBuilder(createMongoAbility)

  switch (user.role) {
    case 'admin':
      can('manage', 'all')
      break
    case 'editor':
      can('read', 'Post')
      can('create', 'Post')
      can('update', 'Post', { authorId: user.id })
      can('delete', 'Post', { authorId: user.id })
      break
    case 'viewer':
      can('read', 'Post')
      break
    default:
      break
  }

  return build()
}

export function getPermissionsForRole(role: UserRole): UserPermission[] {
  switch (role) {
    case 'admin':
      return ['posts:read', 'posts:create', 'posts:update', 'posts:delete', 'users:read']
    case 'editor':
      return ['posts:read', 'posts:create', 'posts:update', 'posts:delete']
    case 'viewer':
      return ['posts:read']
    default:
      return []
  }
}
