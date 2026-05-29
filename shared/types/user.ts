export const userRoles = ['admin', 'reader'] as const
export const userPermissions = ['account:read:self', 'posts:read', 'users:read'] as const

export type UserRole = (typeof userRoles)[number]
export type UserPermission = (typeof userPermissions)[number]

export type PublicUser = {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: UserPermission[]
  createdAt: string
}

export type AuthResponse = {
  user: PublicUser
}
