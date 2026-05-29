import { AbilityBuilder, createMongoAbility } from '@casl/ability'

export function defineAbilityFor(user: { role: string }) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility)

  switch (user.role) {
    case 'admin':
      can('manage', 'all')
      break
    case 'editor':
      can('read', 'Post')
      can('create', 'Post')
      can('update', 'Post')
      break
    case 'viewer':
      can('read', 'Post')
      break
    default:
      break
  }

  return build()
}
