export type UserRole = 'admin' | 'editor' | 'viewer'

export type UserPermission =
  | 'posts:read'
  | 'posts:create'
  | 'posts:update'
  | 'posts:delete'
  | 'users:read'

export type User = {
  id: number
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  role: UserRole
}

export type PublicUser = Omit<User, 'passwordHash'> & {
  permissions: UserPermission[]
}

export type AuthResponse = {
  user: PublicUser
}
